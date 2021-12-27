using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;


namespace backend.Authentication.Controllers
{
    [Route("auth")]
    [ApiController]
    public class LogoutController : ControllerBase
    {
        [HttpPost]
        [Route("logout")]
        public async Task<IActionResult> Logout()
        { 
            Response.Cookies.Delete("access_token");
            return Ok();
        }
    }
}
