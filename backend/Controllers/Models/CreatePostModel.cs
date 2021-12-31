using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Controllers.Models
{
    public class CreatePostModel
    {
        public string Title { get; set; }
        public string Text { get; set; }
        [Url]
        public string ImageUrl { get; set; }
        public int SubtireddId { get; set; }
    }
}
