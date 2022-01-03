using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/subtiredd")]
    [ApiController]
    public class SubtireddController : TireddController
    {
        public SubtireddController(TireddDbContext tireddDbContext) : base(tireddDbContext)
        {
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateSubtireddModel model)
        {
            await using (tireddDbContext)
            {
                var existingSubtiredd = await tireddDbContext.Subtiredds.FirstOrDefaultAsync(s => s.Name == model.Name);
                if (existingSubtiredd != null)
                    return StatusCode(StatusCodes.Status409Conflict);
                var createdSubtiredd = await tireddDbContext.AddAsync(model.ToSubtiredd(UserId));
                await tireddDbContext.SaveChangesAsync();
                return new ObjectResult(createdSubtiredd.Entity) {StatusCode = StatusCodes.Status201Created};
            }
        }

        [Authorize]
        [HttpPost]
        [Route("{subtireddId}/join")]
        public async Task<IActionResult> Join(int subtireddId)
        {
            await using (tireddDbContext)
            {
                var user = await GetUserWithSubtiredds();
                var subtiredd = await tireddDbContext.Subtiredds.SingleAsync(subtiredd => subtiredd.Id == subtireddId);
                if (subtiredd == null)
                    return NotFound();
                user.Subtiredds.Add(subtiredd);
                await tireddDbContext.SaveChangesAsync();
                return NoContent();
            }
        }

        private Task<User> GetUserWithSubtiredds()
        {
            return tireddDbContext.Users
                .Include(user => user.Subtiredds)
                .SingleAsync(user => user.Id == UserId);
        }

        [Authorize]
        [HttpPost]
        [Route("{subtireddId}/leave")]
        public async Task<IActionResult> Leave(int subtireddId)
        {
            await using (tireddDbContext)
            {
                var user = await GetUserWithSubtiredds();
                user.Subtiredds.RemoveAll(subtiredd => subtiredd.Id == subtireddId);
                await tireddDbContext.SaveChangesAsync();
                return NoContent();
            }
        }

        [HttpGet]
        [Route("{subtireddName}/post/{postId}")]
        public async Task<IActionResult> Get(string subtireddName, int postId)
        {
            await using (tireddDbContext)
            {
                var subtiredd = await tireddDbContext.Subtiredds
                    .Include(s => s.Posts).ThenInclude(p => p.Author)
                    .Include(s => s.Posts).ThenInclude(p => p.Votes)
                    .FirstOrDefaultAsync(subtiredd => subtiredd.Name == subtireddName);
                if (subtiredd == null)
                    return new NotFoundObjectResult("No such subtiredd");
                var post = subtiredd.Posts?.FirstOrDefault(post => post.Id == postId);
                if (post == null)
                    return new NotFoundObjectResult("No such post in this subtiredd");
                return new ObjectResult(ToPostJson(subtiredd, post, UserId)) {StatusCode = StatusCodes.Status200OK};
            }
        }

        private static object ToPostJson(Subtiredd subtiredd, Post post, string userId)
        {
            return new
            {
                id = post.Id,
                title = post.Title,
                text = post.Text,
                imageUrl = post.ImageUrl,
                score = post.Score,
                createdAt = post.CreatedAt,
                subtireddId = subtiredd.Id,
                authorId = post.AuthorId,
                subtireddName = subtiredd.Name,
                authorName = post.Author.UserName,
                userVote = userId == null ? null : post.Votes.FirstOrDefault(v => v.UserId == userId)?.Type
            };
        }
    }
}