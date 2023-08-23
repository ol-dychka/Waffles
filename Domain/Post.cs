using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Post
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string Image { get; set; }
        public AppUser Creator { get; set; }
        public ICollection<Like> Likes { get; set; } = new List<Like>();
        public ICollection<Photo> Photos { get; set; }
        // likes + comments
    }
}