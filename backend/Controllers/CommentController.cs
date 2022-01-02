using System.Threading.Tasks;
using backend.Controllers.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/comment")]
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
    }
}