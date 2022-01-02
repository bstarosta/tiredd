using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    public abstract class TireddController : ControllerBase
    {
        protected readonly TireddDbContext tireddDbContext;

        protected TireddController(TireddDbContext tireddDbContext)
        {
            this.tireddDbContext = tireddDbContext;
        }

        public string UserId => User.FindFirstValue(ClaimTypes.NameIdentifier);
    }
}
