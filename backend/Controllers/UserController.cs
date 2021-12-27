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
    public class UserController : ControllerBase
    {
        private readonly TireddDbContext tireddDbContext;

        public UserController(TireddDbContext tireddDbContext)
        {
            this.tireddDbContext = tireddDbContext;
        }

        [Authorize]
        [HttpGet]
        [Route("currentUser")]
        public async Task<IActionResult> CurrentUser()
        {
            using (tireddDbContext)
            {
                var user = await tireddDbContext.Users
                    .Where(user => user.UserName == User.Identity.Name)
                    .Include(user => user.Subtiredds)
                    .Include(user => user.ManagedSubtiredds)
                    .FirstAsync();
                return Ok(toCurrentUserJson(user));
            }
        }

        private static object toCurrentUserJson(User user)
        {
            return new
            {
                id = user.Id,
                userName = user.UserName,
                subtiredds = user.Subtiredds.Select(toSubtireddJson),
                manangedSubtiredds = user.ManagedSubtiredds.Select(toSubtireddJson),
            };
        }

        private static object toSubtireddJson(Subtiredd subtiredd)
        {
            return new {id = subtiredd.Id, name = subtiredd.Name};
        }
    }
}