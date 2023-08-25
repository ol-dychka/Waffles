using Application.Core;
using Domain;
using MediatR;

namespace Application.Photos
{
    public class PostDelete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly IPhotoAccessor _photoAccessor;
            public Handler(IPhotoAccessor photoAccessor)
            {
                _photoAccessor = photoAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                // adding photo to cloudinary service and to db
                var result = await _photoAccessor.DeletePhoto(request.Id);

                return result != null ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem de-attaching photo");
            }
        }
    }
}