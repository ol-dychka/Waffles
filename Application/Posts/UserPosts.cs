using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Posts
{
    public class UserPosts
    {
        public class Query : IRequest<Result<List<PostDto>>>
        {
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<PostDto>>>
        {
            private readonly IMapper _mapper;
            private readonly DataContext _context;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<List<PostDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var posts = await _context.Posts
                .Where(p => p.Creator.UserName == request.Username)
                    .ProjectTo<PostDto>(_mapper.ConfigurationProvider)
                    .ToListAsync();

                return Result<List<PostDto>>.Success(posts);
            }
        }
    }
}