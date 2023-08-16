using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.Posts;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    public class PostsController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Post>>> GetPosts()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Post>> GetPost(Guid id)
        {
            return HandleResult(await Mediator.Send(new Application.Posts.Single.Query { Id = id }));
        }

        [HttpPost]
        public async Task<IActionResult> CreatePost(Post post)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Post = post }));
        }

        [Authorize(Policy = "IsPostCreator")]
        [HttpPut("{id}")]
        public async Task<IActionResult> EditPost(Guid id, Post post)
        {
            post.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Post = post }));
        }

        [Authorize(Policy = "IsPostCreator")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePost(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }

        [HttpPost("{id}/like")]
        public async Task<IActionResult> Like(Guid id)
        {
            return HandleResult(await Mediator.Send(new UpdateLike.Command { Id = id }));
        }
    }
}