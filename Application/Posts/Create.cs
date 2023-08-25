using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Application.Photos;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Posts
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public IFormFile File { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IPhotoAccessor _photoAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor, IPhotoAccessor photoAccessor)
            {
                _photoAccessor = photoAccessor;
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var post = new Post
                {
                    Id = request.Id,
                    Title = request.Title,
                    Description = request.Description ?? "",
                    Category = request.Category,
                };

                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());
                post.Creator = user;
                post.Date = DateTime.UtcNow;

                if (request.File != null)
                {
                    var photoResult = await _photoAccessor.AddPhoto(request.File);
                    if (photoResult == null) return Result<Unit>.Failure("Poblem attaching photo");
                    var photo = new Photo
                    {
                        Url = photoResult.Url,
                        Id = photoResult.PublicId
                    };
                    post.Photos.Add(photo);
                    post.Image = photo.Url;
                }

                _context.Posts.Add(post);

                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("failed to create post");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}