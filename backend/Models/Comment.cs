using System;
using System.Collections.Generic;

namespace backend.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public DateTime CreatedAt { get; set; }

        public string AuthorId { get; set; }
        public User Author { get; set; }

        public int PostId { get; set; }
        public Post Post { get; set; }

        public int ParentCommentId { get; set; }
        public Comment ParentComment { get; set; }

        public List<Comment> ChildComments { get; set; }
    }
}