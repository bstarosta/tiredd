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
    [Route("api")]
    [ApiController]
    public class PostController : TireddController
    {
        public PostController(TireddDbContext tireddDbContext) : base(tireddDbContext)
        {
        }

        [Authorize]
        [HttpPost]
        [Route("post")]
        public async Task<IActionResult> Create([FromBody] CreatePostModel model)
        {
            var isUserMemberOfSubtiredd = await IsUserMemberOfSubtiredd(model.SubtireddId);
            if (!isUserMemberOfSubtiredd)
                return BadRequest();
            var createdPost = await tireddDbContext.Posts.AddAsync(model.ToPost(UserId));
            await tireddDbContext.SaveChangesAsync();
            return new ObjectResult(createdPost.Entity) {StatusCode = StatusCodes.Status201Created};
        }

        private async Task<bool> IsUserMemberOfSubtiredd(int subtireddId)
        {
            return await tireddDbContext.Users
                .Include(user => user.Subtiredds)
                .Where(user => user.Id == UserId)
                .SelectMany(user => user.Subtiredds)
                .AnyAsync(subtiredd => subtiredd.Id == subtireddId);
        }

        [HttpGet]
        [Route("posts/trending-today")]
        public async Task<IActionResult> TrendingToday()
        {
            var trendingPosts = tireddDbContext.Posts
                .Include(post => post.Subtiredd)
                .Where(post => post.CreatedAt.Date == DateTime.Today)
                .OrderByDescending(post => post.Score)
                .Select(post => ToTrendingPostInfoJson(post))
                .Take(4);
            return Ok(trendingPosts);
        }

        private static object ToTrendingPostInfoJson(Post post)
        {
            return new
            {
                Id = post.Id,
                Title = post.Title,
                Text = post.Text,
                ImageUrl = post.ImageUrl,
                SubtireddName = post.Subtiredd.Name
            };
        }
    }
}