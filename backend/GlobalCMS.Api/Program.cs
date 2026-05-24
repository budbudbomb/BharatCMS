using System.Text;
using GlobalCMS.Api.Data;
using GlobalCMS.Api.Infrastructure;
using GlobalCMS.Api.Middleware;
using GlobalCMS.Api.Services;
using GlobalCMS.Api.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddOpenApi();

// Register Core Services
builder.Services.AddScoped<ITenantService, TenantService>();
builder.Services.AddScoped<IBhashiniService, BhashiniService>();
builder.Services.AddScoped<IAIService, AIService>();
builder.Services.AddScoped<IAuthService, AuthService>();

// Configure JWT Authentication
var jwtSettings = builder.Configuration.GetSection("JwtSettings");
var key = Encoding.ASCII.GetBytes(jwtSettings["Secret"] ?? throw new InvalidOperationException("JWT Secret is missing."));

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false; // For development
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidIssuer = jwtSettings["Issuer"],
        ValidAudience = jwtSettings["Audience"],
        ClockSkew = TimeSpan.Zero
    };
});

// Configure DbContext
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins(
                    "http://localhost:5173",
                    "http://localhost:5174",
                    "http://localhost:5175",
                    "http://localhost:4173"
                ) // Vite defaults (5174/5175 used when 5173 is taken)
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseMiddleware<GlobalExceptionHandlerMiddleware>();
app.UseMiddleware<SecurityHeadersMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseCors();

app.UseMiddleware<TenantResolutionMiddleware>();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// Seed SuperAdmin Database Entity on Startup
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    var authService = scope.ServiceProvider.GetRequiredService<IAuthService>();
    
    // Check and seed default tenant
    var defaultTenant = context.TenantProfiles.IgnoreQueryFilters().FirstOrDefault(t => t.TenantId == "default");
    if (defaultTenant == null)
    {
        defaultTenant = new TenantProfile
        {
            TenantId = "default",
            Name = "System Master Controller",
            DynamicData = "{}",
            CreatedAt = DateTime.UtcNow
        };
        context.TenantProfiles.Add(defaultTenant);
        context.SaveChanges();
    }

    // Check and seed superadmin user
    var superUser = context.Users.IgnoreQueryFilters().FirstOrDefault(u => u.Username == "superadmin");
    if (superUser == null)
    {
        superUser = new User
        {
            Username = "superadmin",
            PasswordHash = authService.HashPassword("superadmin123"),
            Role = "SuperAdmin",
            TenantId = "default",
            CreatedAt = DateTime.UtcNow
        };
        context.Users.Add(superUser);
    }
    else
    {
        superUser.PasswordHash = authService.HashPassword("superadmin123");
        superUser.Role = "SuperAdmin";
        superUser.TenantId = "default";
        context.Users.Update(superUser);
    }
    context.SaveChanges();
}

app.Run();
