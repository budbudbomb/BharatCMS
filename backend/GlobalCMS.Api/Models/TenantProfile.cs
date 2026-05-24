namespace GlobalCMS.Api.Models;

public class TenantProfile : BaseEntity, ITenantEntity
{
    public string TenantId { get; set; } = null!;
    public string Name { get; set; } = null!;
    
    // Dynamic JSON column for flexible schema support
    public string DynamicData { get; set; } = "{}";
}
