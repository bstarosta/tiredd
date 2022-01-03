using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Controllers.Models;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/vote")]
    [ApiController]
    public class VoteController : TireddController
    {
        public VoteController(TireddDbContext tireddDbContext) : base(tireddDbContext)
        {
        }

        [Authorize]
        [HttpPut]
        public async Task<IActionResult> CreateOrUpdate([FromBody] CreateOrUpdateVoteModel model)
        {
            await using (tireddDbContext)
            {
                var postExists = await tireddDbContext.Posts.AnyAsync(post => post.Id == model.PostId);
                if (!postExists)
                    return NotFound();
                var existingVote = await tireddDbContext.Votes
                    .SingleOrDefaultAsync(vote => vote.UserId == UserId && vote.PostId == model.PostId);
                if (existingVote == null)
                    return await CreateVote(model);
                return await UpdateExistingVote(existingVote, model.Type);
            }
        }

        private async Task<IActionResult> CreateVote(CreateOrUpdateVoteModel model)
        {
            var vote = model.ToVote(UserId);
            var createdVote = await tireddDbContext.Votes.AddAsync(vote);
            await tireddDbContext.SaveChangesAsync();
            return Ok(createdVote.Entity);
        }

        private async Task<IActionResult> UpdateExistingVote(Vote existingVote, VoteType type)
        {
            existingVote.Type = type;
            await tireddDbContext.SaveChangesAsync();
            return Ok(existingVote);
        }
    }
}