using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
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
            var existingSubtiredd = await tireddDbContext.Subtiredds.FirstOrDefaultAsync(s => s.Name == model.Name);
            if (existingSubtiredd != null)
            {
                return StatusCode(StatusCodes.Status409Conflict);
            }

            var subtiredd = new Subtiredd()
            {
                AdminId = UserId,
                Name = model.Name,
                ImageUrl = model.ImageUrl,
                Description = model.Description,
                CreatedAt = DateTime.Now
            };
            var createdSubtiredd = await tireddDbContext.AddAsync(subtiredd);
            await tireddDbContext.SaveChangesAsync();

            return new ObjectResult(createdSubtiredd.Entity) {StatusCode = StatusCodes.Status201Created};
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
    }
}