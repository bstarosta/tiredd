using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;
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
            var sortedSubtiredds = await GetSortedQuerry(filteredBySubtiredd, sorting).Select(post => new 
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
                userVote = GetUserVote(post, UserId)
            }).Skip(pageSize * (pageNumber-1)).Take(pageSize).ToListAsync();

            return new ObjectResult(sortedSubtiredds) {StatusCode = StatusCodes.Status200OK};
        }

        private static object GetUserVote(Post post, string userId)
        {
            return userId == null ? null : post.Votes.FirstOrDefault(v => v.UserId == userId)?.Type;
        }

        private IQueryable<Post> GetSortedQuerry(IQueryable<Post> filteredPosts, PostSorting sorting)
        {
            var now = DateTime.Now;

            return sorting switch
            {
                PostSorting.New => filteredPosts.OrderByDescending(p => p.CreatedAt),
                PostSorting.Top => filteredPosts.OrderByDescending(p => p.Score),
                PostSorting.Hot => filteredPosts.OrderByDescending(p => p.Score/EF.Functions.DateDiffSecond(p.CreatedAt, DateTime.Now))
            };
        }
    }
}