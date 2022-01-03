using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
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
            var createdSubtiredd = await tireddDbContext.AddAsync(model.ToSubtiredd(UserId));
            await tireddDbContext.SaveChangesAsync();
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
                id = subtiredd.Id,
                name = subtiredd.Name,
                description = subtiredd.Description,
                imageUrl = subtiredd.ImageUrl,
                userCount = subtireddUserCount,
                createdAt = subtiredd.CreatedAt,
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

        private static object ToUserSubtireddInfoJson(Subtiredd subtiredd)
        {
            return new
            {
                id = subtiredd.Id,
                name = subtiredd.Name,
            };
        }

        private Task<User> GetUserWithSubtiredds()
        {
            return tireddDbContext.Users
                .Include(user => user.Subtiredds)
                .SingleAsync(user => user.Id == UserId);
        }

        [Authorize]
        [HttpPost]
        [Route("subtiredd/{subtireddId}/leave")]
        public async Task<IActionResult> Leave(int subtireddId)
        {
            var user = await GetUserWithSubtiredds();
            var subtiredd = user.Subtiredds.Find(subtiredd => subtiredd.Id == subtireddId);
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
                id = subtiredd.Id,
                name = subtiredd.Name,
            };
        }
    }
}