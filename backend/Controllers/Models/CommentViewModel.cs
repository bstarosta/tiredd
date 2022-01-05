using System;
using System.Collections.Generic;

namespace backend.Controllers.Models
{
    public class CommentViewModel
    {
        public CommentViewModel(int id, string text, string authorName, DateTime createdAt, int? parentCommentId,
            List<CommentViewModel> replies)
        {
            Id = id;
            Text = text;
            AuthorName = authorName;
            CreatedAt = createdAt;
            ParentCommentId = parentCommentId;
            Replies = replies;
        }

        public int Id { get; set; }
        public string Text { get; set; }
        public string AuthorName { get; set; }
        public DateTime CreatedAt { get; set; }
        public int? ParentCommentId { get; set; }
        public List<CommentViewModel> Replies { get; set; }
    }
}