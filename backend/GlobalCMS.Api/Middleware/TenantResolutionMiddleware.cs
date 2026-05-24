using GlobalCMS.Api.Infrastructure;

namespace GlobalCMS.Api.Middleware;

public class TenantResolutionMiddleware
{
    private readonly RequestDelegate _next;

    public TenantResolutionMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context, ITenantService tenantService)
    {
        // Resolve tenant from header or subdomain
        // For simplicity, we'll check 'X-Tenant-Id' header or subdomain
        var tenantId = context.Request.Headers["X-Tenant-Id"].FirstOrDefault();

        if (string.IsNullOrEmpty(tenantId))
        {
            var host = context.Request.Host.Host;
            var parts = host.Split('.');
            if (parts.Length > 2)
            {
                tenantId = parts[0];
            }
        }

        if (!string.IsNullOrEmpty(tenantId))
        {
            tenantService.SetTenant(tenantId);
        }

        await _next(context);
    }
}
