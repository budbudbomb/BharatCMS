using GlobalCMS.Api.Infrastructure;

namespace GlobalCMS.Api.Services;

public interface IAIService
{
    Task<string> QueryAsync(string prompt);
}

public class AIService : IAIService
{
    private readonly ITenantService _tenantService;
    private const string FallbackResponse = "Information not available...";

    public AIService(ITenantService tenantService)
    {
        _tenantService = tenantService;
    }

    public async Task<string> QueryAsync(string prompt)
    {
        // STRICT ISOLATION GATEWAY: 
        // Ensure the tenant ID is always prepended or used to filter vector search
        var currentTenant = _tenantService.TenantId;
        
        if (string.IsNullOrEmpty(currentTenant))
        {
            return FallbackResponse;
        }

        // Logic to query LLM with tenant-scoped vector search would go here
        // If no relevant info is found for this specific tenant:
        // return FallbackResponse;

        await Task.Delay(500); // Simulate AI processing
        
        // Simulation: only answer if it mentions the tenant
        if (prompt.Contains(currentTenant, StringComparison.OrdinalIgnoreCase) || prompt.Contains("hello", StringComparison.OrdinalIgnoreCase))
        {
            return $"AI Response for tenant {currentTenant}: I am your secure government assistant.";
        }

        return FallbackResponse;
    }
}
