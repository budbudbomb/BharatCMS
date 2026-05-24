using System.Text.Json.Nodes;

namespace GlobalCMS.Api.Models;

public class DynamicContent : TenantEntity
{
    public string Type { get; set; } = null!; // e.g., "Page", "Post"
    public string Slug { get; set; } = null!;
    public string Title { get; set; } = null!;
    
    // This will be stored as JSON in MS SQL
    public string Data { get; set; } = "{}";
}
