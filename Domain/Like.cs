using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    // class to define a relationship between user liking a post
    public class Like
    {
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public Guid PostId { get; set; }
        public Post Post { get; set; }
    }
}