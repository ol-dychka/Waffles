using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any() && !context.Posts.Any())
            {
                var users = new List<AppUser>{
                    new AppUser{DisplayName = "Bob", UserName = "bob", Email="bob@test.com"},
                    new AppUser{DisplayName = "Tom", UserName = "tom", Email="tom@test.com"},
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }

                var posts = new List<Post>
                {
                    new Post
                    {
                        Title = "Past Post 1",
                        Date = DateTime.UtcNow.AddMonths(-2),
                        Description = "Post 2 months ago",
                        Category = "drinks",
                        Image = null,
                        Creator = users[0],
                        Likes = new List<Like>{
                            new Like{ AppUser = users[0]},
                            new Like{ AppUser = users[1]},
                        }
                    },
                    new Post
                    {
                        Title = "Past Post 1",
                        Date = DateTime.UtcNow.AddMonths(-2),
                        Description = "Post 2 months ago",
                        Category = "drinks",
                        Image = null,
                        Creator = users[1],
                        Likes = new List<Like>{
                            new Like{ AppUser = users[0]},
                            new Like{ AppUser = users[1]},
                        }
                    },
                    new Post
                    {
                        Title = "Past Post 1",
                        Date = DateTime.UtcNow.AddMonths(-2),
                        Description = "Post 2 months ago",
                        Category = "drinks",
                        Image = null,
                        Creator = users[0],
                        Likes = new List<Like>{
                            new Like{ AppUser = users[1]},
                        }
                    },
                    new Post
                    {
                        Title = "Past Post 1",
                        Date = DateTime.UtcNow.AddMonths(-2),
                        Description = "Post 2 months ago",
                        Category = "drinks",
                        Image = null,
                        Creator = users[1],
                        Likes = new List<Like>{
                            new Like{ AppUser = users[1]},
                        }
                    },
                    new Post
                    {
                        Title = "Past Post 1",
                        Date = DateTime.UtcNow.AddMonths(-2),
                        Description = "Post 2 months ago",
                        Category = "drinks",
                        Image = null,
                        Creator = users[1],
                        Likes = new List<Like>(),
                    },
                };

                await context.Posts.AddRangeAsync(posts);
                await context.SaveChangesAsync();
            }
        }
    }
}