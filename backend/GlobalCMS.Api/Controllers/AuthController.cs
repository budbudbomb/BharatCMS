using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GlobalCMS.Api.Data;
using GlobalCMS.Api.Models;
using GlobalCMS.Api.Services;
using GlobalCMS.Api.Infrastructure;

namespace GlobalCMS.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IAuthService _authService;

    public AuthController(ApplicationDbContext context, IAuthService authService)
    {
        _context = context;
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        // Global query filter is applied, but we might need to find user across tenants 
        // if it's a SuperAdmin. For now, we assume user belongs to the current resolved tenant.
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == request.Username);

        if (user == null || !_authService.VerifyPassword(request.Password, user.PasswordHash))
        {
            return Unauthorized("Invalid username or password.");
        }

        var token = _authService.GenerateToken(user);

        return Ok(new
        {
            token,
            user = new
            {
                user.Username,
                user.Role,
                user.TenantId
            }
        });
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        // Check if user exists across all tenants
        if (await _context.Users.IgnoreQueryFilters().AnyAsync(u => u.Username == request.Username))
        {
            return BadRequest("Username already exists.");
        }

        var tenantId = request.Slug.ToLower();

        // Check if tenant exists
        if (await _context.TenantProfiles.IgnoreQueryFilters().AnyAsync(t => t.TenantId == tenantId))
        {
            return BadRequest("Department slug already exists.");
        }

        // Temporarily set tenant ID for SaveChanges to pass validation
        // In TenantService, we need to be able to set it.
        // Actually, we can just manually set the fields if we want to bypass the loop, 
        // but it's better to use the service.
        var tenantService = HttpContext.RequestServices.GetRequiredService<ITenantService>();
        tenantService.SetTenant(tenantId);

        var tenant = new TenantProfile
        {
            TenantId = tenantId,
            Name = request.DepartmentName,
            DynamicData = "{ \"heroText\": \"Welcome to " + request.DepartmentName + "\", \"aboutText\": \"Official portal.\", \"announcements\": [], \"schemes\": [], \"videoUrl\": \"\" }"
        };

        var user = new User
        {
            Username = request.Username,
            PasswordHash = _authService.HashPassword(request.Password),
            Role = "DeptAdmin",
            TenantId = tenantId
        };

        _context.TenantProfiles.Add(tenant);
        _context.Users.Add(user);
        
        await _context.SaveChangesAsync();

        var token = _authService.GenerateToken(user);

        return Ok(new
        {
            token,
            user = new
            {
                user.Username,
                user.Role,
                user.TenantId
            }
        });
    }
}

public record LoginRequest(string Username, string Password);
public record RegisterRequest(string Username, string Password, string DepartmentName, string Slug);
