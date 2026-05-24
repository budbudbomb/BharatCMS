using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GlobalCMS.Api.Data;
using GlobalCMS.Api.Models;

namespace GlobalCMS.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContentController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ContentController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<DynamicContent>>> GetContents()
    {
        return await _context.Contents.ToListAsync();
    }

    [HttpGet("{slug}")]
    public async Task<ActionResult<DynamicContent>> GetContent(string slug)
    {
        var content = await _context.Contents.FirstOrDefaultAsync(c => c.Slug == slug);

        if (content == null)
        {
            return NotFound();
        }

        return content;
    }

    [HttpPost]
    public async Task<ActionResult<DynamicContent>> PostContent(DynamicContent content)
    {
        _context.Contents.Add(content);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetContent), new { slug = content.Slug }, content);
    }
}
