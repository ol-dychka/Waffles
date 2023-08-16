using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Persistence.Migrations;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Post> Posts { get; set; }
        public DbSet<Like> Likes { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Like>(x => x.HasKey(aup => new { aup.AppUserId, aup.PostId }));

            builder.Entity<Like>()
                .HasOne(p => p.Post)
                .WithMany(u => u.Likes)
                .HasForeignKey(aup => aup.PostId);
        }
    }
}