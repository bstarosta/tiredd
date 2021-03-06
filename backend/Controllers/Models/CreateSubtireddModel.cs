using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class CreateSubtireddModel
    {
        [Required(ErrorMessage = "Subtiredd name is required")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Subtiredd image url is required")]
        public string ImageUrl { get; set; }

        [Required(ErrorMessage = "Subtiredd description is required")]
        public string Description { get; set; }

        public Subtiredd ToSubtiredd(User admin)
        {
            return new Subtiredd()
            {
                Admin = admin,
                Users = new List<User> {admin},
                Name = Name,
                ImageUrl = ImageUrl,
                Description = Description,
                CreatedAt = DateTime.Now,
            };
        }
    }
}