using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Authentication
{
    public class RegisterModel
    {
        [Required(ErrorMessage = "Username is required"),
         MinLength(3, ErrorMessage = "Username too short"),
         MaxLength(30, ErrorMessage = "Username too long")]
        public string Username { get; set; }

        [EmailAddress]
        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required"),
         // minimum eight characters, at least one letter and one digit
         RegularExpression("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,50}$",
             ErrorMessage =
                 "Password has to be between 8 and 50 characters, contain at least one capital letter, one digit, and one special character")]
        public string Password { get; set; }
    }
}