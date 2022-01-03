using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Controllers.Models;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/comments")]
    [ApiController]
    public class CommentController : TireddController
    {
        public CommentController(TireddDbContext tireddDbContext) : base(tireddDbContext)
        {
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateCommentModel model)
        {
            await using (tireddDbContext)
            {
                var createdComment = await tireddDbContext.Comments.AddAsync(model.ToComment(UserId));
                await tireddDbContext.SaveChangesAsync();
                return new ObjectResult(createdComment.Entity) {StatusCode = StatusCodes.Status201Created};
            }
        }

        [HttpGet]
        public async Task<IActionResult> Get(int postId)
        {
            await using (tireddDbContext)
            {
                var comments = await tireddDbContext.Comments
                    .Include(c => c.ChildComments)
                    .Include(c => c.Author)
                    .AsQueryable()
                    .Where(c => c.PostId == postId)
                    .ToListAsync();
                var commentViewModels = ListToCommentJson(comments)
                    .Where(c => c.ParentCommentId == null);
                return new ObjectResult(commentViewModels) {StatusCode = StatusCodes.Status200OK};
            }
        }

        private static List<CommentViewModel> ListToCommentJson(List<Comment> comments)
        {
            return comments.Select(comment =>
                    new CommentViewModel(
                        comment.Id,
                        comment.Text,
                        comment.Author.UserName,
                        comment.CreatedAt,
                        comment.ParentCommentId,
                        comment.ChildComments.Count == 0
                            ? new List<CommentViewModel>()
                            : ListToCommentJson(comment.ChildComments)))
                .ToList();
        } 
    }
}