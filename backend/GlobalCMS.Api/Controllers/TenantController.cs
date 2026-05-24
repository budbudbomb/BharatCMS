using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GlobalCMS.Api.Data;
using GlobalCMS.Api.Models;
using Microsoft.AspNetCore.Authorization;

namespace GlobalCMS.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class TenantController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public TenantController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet("status")]
    public IActionResult GetStatus()
    {
        return Ok(new { status = "API is running", timestamp = DateTime.UtcNow });
    }

    [HttpGet("profile")]
    public async Task<ActionResult<TenantProfile>> GetProfile()
    {
        var profile = await _context.TenantProfiles.FirstOrDefaultAsync();
        if (profile == null)
        {
            return NotFound("Tenant profile not found for the current context.");
        }
        return Ok(profile);
    }

    [HttpPut("profile")]
    public async Task<IActionResult> UpdateProfile([FromBody] TenantProfileUpdateDto updateDto)
    {
        var profile = await _context.TenantProfiles.FirstOrDefaultAsync();
        if (profile == null)
        {
            return NotFound("Tenant profile not found.");
        }

        profile.Name = updateDto.Name;
        profile.DynamicData = updateDto.DynamicData;

        await _context.SaveChangesAsync();
        return Ok(profile);
    }

    [Authorize(Roles = "SuperAdmin")]
    [HttpGet("all")]
    public async Task<ActionResult<IEnumerable<TenantProfile>>> GetAllTenants()
    {
        return await _context.TenantProfiles.IgnoreQueryFilters().ToListAsync();
    }
}

public record TenantProfileUpdateDto(string Name, string DynamicData);
