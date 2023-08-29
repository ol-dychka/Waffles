using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Comments
{
    public class Create
    {
        public class Command : IRequest<Result<CommentDto>>
        {
            public string Body { get; set; }
            public Guid PostId { get; set; }
            public int? CommentId { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Body).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, Result<CommentDto>>
        {
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;
            private readonly DataContext _context;
            public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper)
            {
                _context = context;
                _userAccessor = userAccessor;
                _mapper = mapper;
            }

            public async Task<Result<CommentDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var post = await _context.Posts.FindAsync(request.PostId);
                if (post == null) return null;
                var user = await _context.Users.Include(p => p.Photo)
                    .SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                var comment = new Comment
                {
                    Author = user,
                    Post = post,
                    Body = request.Body,
                };


                // in case of reply
                if (request.CommentId != null)
                {
                    var parentComment = await _context.Comments.FindAsync(request.CommentId);
                    parentComment.Replies.Add(comment);
                    var responseSuccess = await _context.SaveChangesAsync() > 0;
                    return responseSuccess
                        ? Result<CommentDto>.Success(_mapper.Map<CommentDto>(comment))
                        : Result<CommentDto>.Failure("Failed to create a comment");
                }
                else
                {
                    post.Comments.Add(comment);
                }
                var success = await _context.SaveChangesAsync() > 0;
                return success
                    ? Result<CommentDto>.Success(_mapper.Map<CommentDto>(comment))
                    : Result<CommentDto>.Failure("Failed to create a comment");
            }
        }
    }
}