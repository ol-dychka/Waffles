using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        public ICollection<Post> Posts { get; set; } = new List<Post>();
        public Photo Photo { get; set; }
        public ICollection<UserFollowing> Followers { get; set; }
        public ICollection<UserFollowing> Subscriptions { get; set; }
    }
}