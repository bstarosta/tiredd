using System.Collections.Generic;

namespace backend.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }

        public List<Subtiredd> Subtiredds { get; set; }
        public List<Subtiredd> ManagedSubtiredds { get; set; }
        public List<Post> Posts { get; set; }
        public List<Comment> Comments { get; set; }
        public List<Vote> Votes { get; set; }
    }
}