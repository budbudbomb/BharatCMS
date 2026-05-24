using Microsoft.AspNetCore.Mvc;
using GlobalCMS.Api.Services;

namespace GlobalCMS.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AIController : ControllerBase
{
    private readonly IAIService _aiService;

    public AIController(IAIService aiService)
    {
        _aiService = aiService;
    }

    [HttpPost("query")]
    public async Task<ActionResult<string>> Query([FromBody] string prompt)
    {
        var response = await _aiService.QueryAsync(prompt);
        return Ok(new { response });
    }
}
