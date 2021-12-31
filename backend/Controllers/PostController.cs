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

namespace backend.Controllers
{
    [Route("api/post")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly TireddDbContext tireddDbContext;

        public PostController(TireddDbContext tireddDbContext)
        {
            this.tireddDbContext = tireddDbContext;
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreatePostModel model)
        {
            var authorId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var post = new Post
            {
                Title = model.Title,
                Text = model.Text,
                ImageUrl = model.ImageUrl,
                Score = 0,
                CreatedAt = DateTime.Now,
                SubtireddId = model.SubtireddId,
                AuthorId = authorId
            };
            await using (tireddDbContext)
            {
                var createdPost = await tireddDbContext.Posts.AddAsync(post);
                await tireddDbContext.SaveChangesAsync();
                return new ObjectResult(createdPost.Entity) {StatusCode = StatusCodes.Status201Created};
            }
        }
    }
}