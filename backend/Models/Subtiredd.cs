﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Subtiredd
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreateDateTime { get; set; }

        public Guid AdminId { get; set; }
        public User Admin { get; set; }

        public List<User> Users { get; set; }
        public List<Post> Posts { get; set; }
    }
}