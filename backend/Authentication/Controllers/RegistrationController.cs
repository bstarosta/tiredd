using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace backend.Authentication.Controllers
{
    [Route("auth")]
    [ApiController]
    public class RegistrationController : ControllerBase
    {
        private readonly UserManager<User> userManager;

        public RegistrationController(UserManager<User> userManager)
        {
            this.userManager = userManager;
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            var existingUser = await userManager.FindByNameAsync(model.Username);
            if (existingUser != null)
                return StatusCode(StatusCodes.Status409Conflict);

            var user = new User()
            {
                Email = model.Email,
                UserName = model.Username
            };
            var result = await userManager.CreateAsync(user, model.Password);
            Console.WriteLine(result.ToString());
            if (!result.Succeeded)
                return StatusCode(StatusCodes.Status500InternalServerError, result.Errors);

            return StatusCode(StatusCodes.Status201Created);
        }
    }
}