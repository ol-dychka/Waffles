using Application.Core;
using Application.Posts;
using Application.Profiles;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProfilesController : BaseApiController
    {
        [HttpGet("{username}")]
        public async Task<ActionResult<Profile>> GetProfile(string username)
        {
            return HandleResult(await Mediator.Send(new Get.Query { Username = username }));
        }

        [HttpGet("{username}/posts")]
        public async Task<ActionResult<List<Post>>> GetUserPosts(string username, [FromQuery] PagingParams pagingParams)
        {
            return HandlePagedResult(await Mediator.Send(new UserPosts.Query { Username = username, Params = pagingParams }));
        }

        [HttpPut("edit")]
        public async Task<IActionResult> Edit(Application.Profiles.Edit.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }
    }
}