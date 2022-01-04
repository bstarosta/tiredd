using System;
using System.Collections.Generic;
using System.Diagnostics;
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
            var existingVote = await tireddDbContext.Votes
                .Include(vote => vote.Post)
                .SingleOrDefaultAsync(vote => vote.UserId == UserId && vote.PostId == model.PostId);
            if (existingVote == null)
            {
                var post = await tireddDbContext.Posts.SingleOrDefaultAsync(post => post.Id == model.PostId);
                if (post == null)
                    return NotFound();
                return await CreateVote(post, model);
            }

            return await UpdateExistingVote(existingVote.Post, existingVote, model.Type);
        }

        private async Task<IActionResult> CreateVote(Post post, CreateOrUpdateVoteModel model)
        {
            post.Score += CreateVoteScoreChange(model.Type);
            var vote = model.ToVote(UserId);
            var createdVote = await tireddDbContext.Votes.AddAsync(vote);
            await tireddDbContext.SaveChangesAsync();
            createdVote.Entity.Post = null; // Prevents json cycle on serialization
            return Ok(createdVote.Entity);
        }

        private static int CreateVoteScoreChange(VoteType type)
        {
            return type switch
            {
                VoteType.UpVote => 1,
                VoteType.DownVote => -1
            };
        }

        private async Task<IActionResult> UpdateExistingVote(Post post, Vote existingVote, VoteType type)
        {
            post.Score += UpdateExistingVoteScoreChange(existingVote, type);
            existingVote.Type = type;
            await tireddDbContext.SaveChangesAsync();
            existingVote.Post = null; // Prevents json cycle on serialization
            return Ok(existingVote);
        }

        private static int UpdateExistingVoteScoreChange(Vote existingVote, VoteType type)
        {
            return type switch
            {
                VoteType.UpVote when existingVote.Type == VoteType.DownVote => 2,
                VoteType.DownVote when existingVote.Type == VoteType.UpVote => -2,
                _ => 0
            };
        }

        [Authorize]
        [HttpDelete]
        public async Task<IActionResult> Delete(int postId)
        {
            var vote = await tireddDbContext.Votes
                .Include(vote => vote.Post)
                .SingleOrDefaultAsync(vote => vote.UserId == UserId && vote.PostId == postId);
            if (vote != null)
            {
                vote.Post.Score += DeleteScoreChange(vote.Type);
                tireddDbContext.Votes.Remove(vote);
                await tireddDbContext.SaveChangesAsync();
            }

            return NoContent();
        }

        private static int DeleteScoreChange(VoteType type)
        {
            return type switch
            {
                VoteType.UpVote => -1,
                VoteType.DownVote => 1
            };
        }
    }
}