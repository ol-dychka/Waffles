using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly IUserAccessor _userAccessor;
            private readonly IPhotoAccessor _photoAccessor;
            private readonly DataContext _context;
            public Handler(DataContext context, IPhotoAccessor photoAccessor, IUserAccessor userAccessor)
            {
                _context = context;
                _photoAccessor = photoAccessor;
                _userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                // getting user from database
                var user = await _context.Users.Include(p => p.Photo).FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());
                if (user == null) return null;
                //checking if user has a photo
                if (user.Photo == null) return null;

                // deleting photo from cloudinary service
                var result = await _photoAccessor.DeletePhoto(user.Photo.Id);
                if (result == null) return Result<Unit>.Failure("Problem deleting photo");

                // setting photo to null in database
                user.Photo = null;
                var dbResult = await _context.SaveChangesAsync() > 0;
                return dbResult ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Failed to update database");
            }
        }
    }
}