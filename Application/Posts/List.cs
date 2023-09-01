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
    public class List
    {
        public class Query : IRequest<Result<List<PostDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<PostDto>>>
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

            public async Task<Result<List<PostDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var posts = await _context.Posts
                    .ProjectTo<PostDto>(_mapper.ConfigurationProvider, new { currentUsername = _userAccessor.GetUsername() })
                    .ToListAsync();

                return Result<List<PostDto>>.Success(posts);
            }
        }
    }
}