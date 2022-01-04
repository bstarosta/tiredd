using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Controllers.Models
{
    public class CreateOrUpdateVoteModel
    {
        [Required(ErrorMessage = "Post id is required")]
        public int PostId { get; set; }

        [Required(ErrorMessage = "Vote type is required")]
        public VoteType Type { get; set; }

        public Vote ToVote(string userId)
        {
            return new Vote
            {
                Type = Type,
                UserId = userId,
                PostId = PostId
            };
        }
    }
}