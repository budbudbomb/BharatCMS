namespace GlobalCMS.Api.Models;

public class User : TenantEntity
{
    public string Username { get; set; } = null!;
    public string PasswordHash { get; set; } = null!;
    public string Role { get; set; } = null!; // SuperAdmin or DeptAdmin
}
