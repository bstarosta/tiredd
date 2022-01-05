using System;
using System.Linq;
using System.Threading.Tasks;
using backend.Controllers.Models;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
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
        [Route("post")]
        [HttpPost]
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

        [HttpGet]
        [Route("posts/{sorting}")]
        public async Task<IActionResult> GetPostList(PostSorting sorting, [FromQuery]int pageNumber, [FromQuery]int? subtireddId)
        {
            int pageSize = 10;
            var postsWithRelatedObjects = tireddDbContext.Posts
                .Include(p => p.Author)
                .Include(p => p.Subtiredd)
                .Include(p => p.Votes);
            var filteredBySubtiredd = subtireddId.HasValue ?
                postsWithRelatedObjects.Where(p => p.SubtireddId == subtireddId) : postsWithRelatedObjects;
            var sortedPosts = GetSortedQuery(filteredBySubtiredd, sorting).Select(post => ToPostJson(post, UserId));
            var postPage = await sortedPosts.Skip(pageSize * (pageNumber - 1)).Take(pageSize).ToListAsync();

            return new ObjectResult(postPage) {StatusCode = StatusCodes.Status200OK};
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
                authorId = post.AuthorId,
                subtireddName = post.Subtiredd.Name,
                authorName = post.Author.UserName,
                userVote = userId == null ? null : post.Votes.FirstOrDefault(v => v.UserId == userId)?.Type
                
            };
        }

        private static IQueryable<Post> GetSortedQuery(IQueryable<Post> filteredPosts, PostSorting sorting)
        {
            var now = DateTime.Now;

            return sorting switch
            {
                PostSorting.New => filteredPosts.OrderByDescending(p => p.CreatedAt),
                PostSorting.Top => filteredPosts.OrderByDescending(p => p.Score),
                PostSorting.Hot => filteredPosts.OrderByDescending(p => (double)p.Score/EF.Functions.DateDiffSecond(p.CreatedAt, DateTime.Now))
            };
        }
    }
}