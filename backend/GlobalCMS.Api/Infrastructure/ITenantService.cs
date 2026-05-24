namespace GlobalCMS.Api.Infrastructure;

public interface ITenantService
{
    string? TenantId { get; }
    void SetTenant(string tenantId);
}

public class TenantService : ITenantService
{
    public string? TenantId { get; private set; }

    public void SetTenant(string tenantId)
    {
        TenantId = tenantId;
    }
}
