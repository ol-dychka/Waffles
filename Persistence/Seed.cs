using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Posts.Any()) return;

            var posts = new List<Post>
            {
                new Post
                {
                    Title = "Past Post 1",
                    Date = DateTime.UtcNow.AddMonths(-2),
                    Description = "Post 2 months ago",
                    Category = "drinks",
                    Image = "",
                },
                new Post
                {
                    Title = "Past Post 2",
                    Date = DateTime.UtcNow.AddMonths(-1),
                    Description = "Post 1 month ago",
                    Category = "culture",
                    Image = "",
                },
                new Post
                {
                    Title = "Future Post 1",
                    Date = DateTime.UtcNow.AddMonths(1),
                    Description = "Post 1 month in future",
                    Category = "culture",
                    Image = "",
                },
                new Post
                {
                    Title = "Future Post 2",
                    Date = DateTime.UtcNow.AddMonths(2),
                    Description = "Post 2 months in future",
                    Category = "music",
                    Image = "",
                },
                new Post
                {
                    Title = "Future Post 3",
                    Date = DateTime.UtcNow.AddMonths(3),
                    Description = "Post 3 months in future",
                    Category = "drinks",
                    Image = "",
                },
                new Post
                {
                    Title = "Future Post 4",
                    Date = DateTime.UtcNow.AddMonths(4),
                    Description = "Post 4 months in future",
                    Category = "drinks",
                    Image = "",
                },
                new Post
                {
                    Title = "Future Post 5",
                    Date = DateTime.UtcNow.AddMonths(5),
                    Description = "Post 5 months in future",
                    Category = "drinks",
                    Image = "",
                },
                new Post
                {
                    Title = "Future Post 6",
                    Date = DateTime.UtcNow.AddMonths(6),
                    Description = "Post 6 months in future",
                    Category = "music",
                    Image = "",
                },
                new Post
                {
                    Title = "Future Post 7",
                    Date = DateTime.UtcNow.AddMonths(7),
                    Description = "Post 2 months ago",
                    Category = "travel",
                    Image = "",
                },
                new Post
                {
                    Title = "Future Post 8",
                    Date = DateTime.UtcNow.AddMonths(8),
                    Description = "Post 8 months in future",
                    Category = "film",
                    Image = "",
                }
            };

            await context.Posts.AddRangeAsync(posts);
            await context.SaveChangesAsync();
        }
    }
}