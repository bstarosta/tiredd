using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api")]
    [ApiController]
    public class UserController : TireddController
    {
        public UserController(TireddDbContext tireddDbContext) : base(tireddDbContext)
        {
        }

        [Authorize]
        [HttpGet]
        [Route("current-user")]
        public async Task<IActionResult> CurrentUser()
        {
            var user = await tireddDbContext.Users
                .Include(user => user.Subtiredds)
                .Include(user => user.ManagedSubtiredds)
                .SingleAsync(user => user.Id == UserId);
            return Ok(ToCurrentUserJson(user));
        }

        private static object ToCurrentUserJson(User user)
        {
            return new
            {
                Id = user.Id,
                UserName = user.UserName,
                Subtiredds = user.Subtiredds.Select(ToSubtireddJson),
                ManagedSubtiredds = user.ManagedSubtiredds.Select(ToSubtireddJson),
            };
        }

        private static object ToSubtireddJson(Subtiredd subtiredd)
        {
            return new
            {
                Id = subtiredd.Id,
                Name = subtiredd.Name
            };
        }
    }
}