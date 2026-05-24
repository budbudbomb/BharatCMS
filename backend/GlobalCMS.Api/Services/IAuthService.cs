using GlobalCMS.Api.Models;

namespace GlobalCMS.Api.Services;

public interface IAuthService
{
    string HashPassword(string password);
    bool VerifyPassword(string password, string hash);
    string GenerateToken(User user);
}
