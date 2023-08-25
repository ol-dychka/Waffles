using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class PostAdd
    {
        public class Command : IRequest<Result<Photo>>
        {
            public IFormFile File { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Photo>>
        {
            private readonly IPhotoAccessor _photoAccessor;
            public Handler(IPhotoAccessor photoAccessor)
            {
                _photoAccessor = photoAccessor;
            }

            public async Task<Result<Photo>> Handle(Command request, CancellationToken cancellationToken)
            {
                // adding photo to cloudinary service and to db
                var result = await _photoAccessor.AddPhoto(request.File);

                var photo = new Photo
                {
                    Url = result.Url,
                    Id = result.PublicId
                };

                return result != null ? Result<Photo>.Success(photo) : Result<Photo>.Failure("Problem attaching photo");
            }
        }
    }
}