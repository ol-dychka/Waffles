using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Posts
{
    public class UserPosts
    {
        public class Query : IRequest<Result<PagedList<PostDto>>>
        {
            public string Username { get; set; }
            public PagingParams Params { get; set; }

        }

        public class Handler : IRequestHandler<Query, Result<PagedList<PostDto>>>
        {
            private readonly IMapper _mapper;
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<PagedList<PostDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.Posts
                    .OrderByDescending(d => d.Date)
                    .Where(p => p.Creator.UserName == request.Username)
                    .ProjectTo<PostDto>(_mapper.ConfigurationProvider, new { currentUsername = _userAccessor.GetUsername() })
                    .AsQueryable();

                return Result<PagedList<PostDto>>.Success(await PagedList<PostDto>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize));
            }
        }
    }
}