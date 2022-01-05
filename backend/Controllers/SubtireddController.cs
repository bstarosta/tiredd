using System.Linq;
using System.Security.Claims;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api")]
    [ApiController]
    public class SubtireddController : TireddController
    {
        public SubtireddController(TireddDbContext tireddDbContext) : base(tireddDbContext)
        {
        }

        [Authorize]
        [HttpPost]
        [Route("subtiredd")]
        public async Task<IActionResult> Create([FromBody] CreateSubtireddModel model)
        {
            var existingSubtiredd = await tireddDbContext.Subtiredds.FirstOrDefaultAsync(s => s.Name == model.Name);
            if (existingSubtiredd != null)
                return StatusCode(StatusCodes.Status409Conflict);
            var user = await tireddDbContext.Users.SingleAsync(user => user.Id == UserId);
            var createdSubtiredd = await tireddDbContext.AddAsync(model.ToSubtiredd(user));
            await tireddDbContext.SaveChangesAsync();
            createdSubtiredd.Entity.Users = null;
            createdSubtiredd.Entity.Admin = null;
            return new ObjectResult(createdSubtiredd.Entity) {StatusCode = StatusCodes.Status201Created};
        }

        [HttpGet]
        [Route("subtiredd/{subtireddName}")]
        public async Task<IActionResult> GetSubtiredd(string subtireddName)
        {
            Regex subtireddNameRegex = new Regex("\\w");
            if (!subtireddNameRegex.IsMatch(subtireddName))
                return BadRequest();
            var subtiredd = await tireddDbContext.Subtiredds.FirstOrDefaultAsync(s => s.Name == subtireddName);
            if (subtiredd == null)
                return NotFound();
            var userCount = tireddDbContext.Entry(subtiredd)
                .Collection(s => s.Users)
                .Query()
                .Count();

            return new ObjectResult(ToSubtireddJson(subtiredd, userCount)) {StatusCode = StatusCodes.Status200OK};
        }

        private static object ToSubtireddJson(Subtiredd subtiredd, int subtireddUserCount)
        {
            return new
            {
                Id = subtiredd.Id,
                Name = subtiredd.Name,
                Description = subtiredd.Description,
                ImageUrl = subtiredd.ImageUrl,
                UserCount = subtireddUserCount,
                CreatedAt = subtiredd.CreatedAt,
            };
        }


        [Authorize]
        [HttpPost]
        [Route("subtiredd/{subtireddId}/join")]
        public async Task<IActionResult> Join(int subtireddId)
        {
            var user = await GetUserWithSubtiredds();
            var subtiredd = await tireddDbContext.Subtiredds.SingleAsync(subtiredd => subtiredd.Id == subtireddId);
            if (subtiredd == null)
                return NotFound();
            user.Subtiredds.Add(subtiredd);
            await tireddDbContext.SaveChangesAsync();
            return new ObjectResult(ToUserSubtireddInfoJson(subtiredd)) {StatusCode = StatusCodes.Status201Created};
        }

        private Task<User> GetUserWithSubtiredds()
        {
            return tireddDbContext.Users
                .Include(user => user.Subtiredds)
                .SingleAsync(user => user.Id == UserId);
        }

        private static object ToUserSubtireddInfoJson(Subtiredd subtiredd)
        {
            return new
            {
                Id = subtiredd.Id,
                Name = subtiredd.Name,
            };
        }

        [Authorize]
        [HttpPost]
        [Route("subtiredd/{subtireddId}/leave")]
        public async Task<IActionResult> Leave(int subtireddId)
        {
            var user = await GetUserWithSubtiredds();
            var subtiredd = user.Subtiredds.Find(subtiredd => subtiredd.Id == subtireddId);
            if (subtiredd?.AdminId == user.Id)
                return BadRequest();
            user.Subtiredds.Remove(subtiredd);
            await tireddDbContext.SaveChangesAsync();
            return new ObjectResult(ToUserSubtireddInfoJson(subtiredd)) {StatusCode = StatusCodes.Status201Created};
        }

        [HttpGet]
        [Route("subtiredds/popular")]
        public async Task<IActionResult> Popular()
        {
            var popularSubtiredds = tireddDbContext.Subtiredds
                .OrderByDescending(subtiredd => subtiredd.Users.Count)
                .Select(subtiredd => ToPopularSubtireddInfoJson(subtiredd))
                .Take(5);
            return Ok(popularSubtiredds);
        }

        private static object ToPopularSubtireddInfoJson(Subtiredd subtiredd)
        {
            return new
            {
                Id = subtiredd.Id,
                Name = subtiredd.Name,
                ImageUrl = subtiredd.ImageUrl
            };
        }

        [HttpGet]
        [Route("subtiredd/{subtireddName}/post/{postId}")]
        public async Task<IActionResult> Get(string subtireddName, int postId)
        {
            var subtiredd = await tireddDbContext.Subtiredds
                .Include(s => s.Posts).ThenInclude(p => p.Author)
                .Include(s => s.Posts).ThenInclude(p => p.Votes)
                .FirstOrDefaultAsync(subtiredd => subtiredd.Name == subtireddName);
            if (subtiredd == null)
                return new NotFoundObjectResult("error.subtireddNotFound");
            var post = subtiredd.Posts?.FirstOrDefault(post => post.Id == postId);
            if (post == null)
                return new NotFoundObjectResult("error.postNotFound");
            return new ObjectResult(ToPostJson(subtiredd, post, UserId)) {StatusCode = StatusCodes.Status200OK};
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