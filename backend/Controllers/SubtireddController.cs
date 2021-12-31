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
    public class SubtireddController : ControllerBase
    {

        private readonly TireddDbContext tireddDbContext;

        public SubtireddController(TireddDbContext tireddDbContext)
        {
            this.tireddDbContext = tireddDbContext;
        }

        [Authorize]
        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> Create([FromBody] CreateSubtireddModel model )
        {
            var existingSubtiredd = await tireddDbContext.Subtiredds.FirstOrDefaultAsync(s => s.Name == model.Name);
            if (existingSubtiredd != null)
            {
                return StatusCode(StatusCodes.Status409Conflict);
            }

            var subtiredd = new Subtiredd()
            {
                AdminId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value,
                Name = model.Name,
                ImageUrl = model.ImageUrl,
                Description = model.Description,
                CreatedAt = DateTime.Now
            };
            var createdSubtiredd =  await tireddDbContext.AddAsync(subtiredd);
            await tireddDbContext.SaveChangesAsync();

            return new ObjectResult(createdSubtiredd.Entity) {StatusCode = StatusCodes.Status201Created};
        }
    }
}
