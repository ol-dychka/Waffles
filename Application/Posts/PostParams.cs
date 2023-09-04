using Application.Core;

namespace Application.Posts
{
    public class PostParams : PagingParams
    {
        public bool IsFollowed { get; set; }
        public bool IsLiked { get; set; }
        public string Category { get; set; }
    }
}