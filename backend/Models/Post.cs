using System;
using System.Collections.Generic;

namespace backend.Models
{
    public class Post
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
        public int Score { get; set; }
        public DateTime CreatedAt { get; set; }

        public int SubtireddId { get; set; }
        public Subtiredd Subtiredd { get; set; }

        public Guid AuthorId { get; set; }
        public User Author { get; set; }

        public List<Comment> Comments { get; set; }
        public List<Vote> Votes { get; set; }
    }
}