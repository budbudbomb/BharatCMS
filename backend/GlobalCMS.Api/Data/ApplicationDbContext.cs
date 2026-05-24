using Microsoft.EntityFrameworkCore;
using GlobalCMS.Api.Models;
using GlobalCMS.Api.Infrastructure;

namespace GlobalCMS.Api.Data;

public class ApplicationDbContext : DbContext
{
    private readonly ITenantService _tenantService;

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options, ITenantService tenantService)
        : base(options)
    {
        _tenantService = tenantService;
    }

    public DbSet<DynamicContent> Contents => Set<DynamicContent>();
    public DbSet<TenantProfile> TenantProfiles => Set<TenantProfile>();
    public DbSet<User> Users => Set<User>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Global Query Filter for Tenant Isolation
        modelBuilder.Entity<DynamicContent>()
            .HasQueryFilter(e => e.TenantId == _tenantService.TenantId);

        modelBuilder.Entity<TenantProfile>()
            .HasQueryFilter(e => e.TenantId == _tenantService.TenantId);

        modelBuilder.Entity<User>()
            .HasQueryFilter(e => e.TenantId == _tenantService.TenantId);

        // Configure JSON column for DynamicContent.Data
        // In EF Core 8/9, we can use .ToJson() if we have a typed object, 
        // but for raw JSON string we just ensure it's mapped correctly or use native support.
        modelBuilder.Entity<DynamicContent>(entity =>
        {
            entity.HasIndex(e => new { e.TenantId, e.Slug }).IsUnique();
        });
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        foreach (var entry in ChangeTracker.Entries<TenantEntity>())
        {
            switch (entry.State)
            {
                case EntityState.Added:
                    entry.Entity.TenantId = _tenantService.TenantId ?? throw new InvalidOperationException("TenantId is missing.");
                    entry.Entity.CreatedAt = DateTime.UtcNow;
                    break;
                case EntityState.Modified:
                    entry.Entity.UpdatedAt = DateTime.UtcNow;
                    break;
            }
        }
        return base.SaveChangesAsync(cancellationToken);
    }
}
