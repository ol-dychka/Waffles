using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Posts
{
    public class Single
    {
        public class Query : IRequest<Result<PostDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PostDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<PostDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var post = await _context.Posts
                    .ProjectTo<PostDto>(_mapper.ConfigurationProvider, new { currentUsername = _userAccessor.GetUsername() })
                    .FirstOrDefaultAsync(x => x.Id == request.Id);

                return Result<PostDto>.Success(post);
            }
        }
    }
}