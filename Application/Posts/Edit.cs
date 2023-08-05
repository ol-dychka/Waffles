using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Posts
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Post Post { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var post = await _context.Posts.FindAsync(request.Post.Id);

                _mapper.Map(request.Post, post);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("failed to edit post");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}