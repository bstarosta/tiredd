﻿using System;
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

        public DbSet<Comment> Comments { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Subtiredd> Subtiredds { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Vote> Votes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasMany(u => u.ManagedSubtiredds)
                .WithOne(s => s.Admin);
        }
    }
}
