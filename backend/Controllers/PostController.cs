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

        [HttpGet]
        [Route("{postId}/detailed")]
        public async Task<IActionResult> Get(int postId)
        {
            await using (tireddDbContext)
            {
                var post = await tireddDbContext.Posts
                    .Include(p => p.Subtiredd)
                    .Include(p => p.Author)
                    .Include(p => p.Votes)
                    .FirstOrDefaultAsync(post => post.Id == postId);
                if (post == null)
                    return NotFound();
                return new ObjectResult(ToPostJson(post, UserId)) {StatusCode = StatusCodes.Status200OK};
            }
        }

        private static object ToPostJson(Post post, string userId)
        {
            return new
            {
                id = post.Id,
                title = post.Title,
                text = post.Text,
                imageUrl = post.ImageUrl,
                score = post.Score,
                createdAt = post.CreatedAt,
                subtireddId = post.SubtireddId,
                authorId = post.AuthorId,
                subtiredd = post.Subtiredd.Name,
                author = post.Author.UserName,
                userVote = userId == null ? null : post.Votes.FirstOrDefault(v => v.UserId == userId)?.Type
            };
        }
    }
}