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
    [Route("api/post")]
    [ApiController]
    public class PostController : TireddController
    {
        public PostController(TireddDbContext tireddDbContext) : base(tireddDbContext)
        {
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreatePostModel model)
        {
            await using (tireddDbContext)
            {
                var isUserMemberOfSubtiredd = await tireddDbContext.Users
                    .Include(user => user.Subtiredds)
                    .SelectMany(user => user.Subtiredds)
                    .AnyAsync(subtiredd => subtiredd.Id == model.SubtireddId);
                if (!isUserMemberOfSubtiredd)
                    return BadRequest();
                var createdPost = await tireddDbContext.Posts.AddAsync(model.ToPost(UserId));
                await tireddDbContext.SaveChangesAsync();
                return new ObjectResult(createdPost.Entity) {StatusCode = StatusCodes.Status201Created};
            }
        }
    }
}