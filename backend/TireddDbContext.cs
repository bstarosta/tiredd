using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend
{
    public class TireddDbContext : DbContext
    {
        public TireddDbContext(DbContextOptions<TireddDbContext> options) : base(options)
        {
        }

        public DbSet<Subtiredd> Subtiredds { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasMany(u => u.ManagedSubtiredds)
                .WithOne(s => s.Admin);
        }
    }
}
