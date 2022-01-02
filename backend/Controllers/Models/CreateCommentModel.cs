using System;
using System.ComponentModel.DataAnnotations;
using backend.Models;

namespace backend.Controllers.Models
{
    public class CreateCommentModel
    {
        [Required(ErrorMessage = "Comment text is required")]
        public string Text { get; set; }

        [Required(ErrorMessage = "Post id is required")]
        public int PostId { get; set; }

        public int? ParentCommentId { get; set; }

        public Comment ToComment(string authorId)
        {
            return new Comment
            {
                Text = Text,
                CreatedAt = DateTime.Now,
                AuthorId = authorId,
                PostId = PostId,
                ParentCommentId = ParentCommentId
            };
        }
    }
}