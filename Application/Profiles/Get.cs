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

namespace Application.Profiles
{
    public class Get
    {
        public class Query : IRequest<Result<Profile>>
        {
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Profile>>
        {
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;
            private readonly DataContext _context;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _context = context;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }

            public async Task<Result<Profile>> Handle(Query request, CancellationToken cancellationToken)
            {
                var profile = await _context.Users
                    .ProjectTo<Profile>(_mapper.ConfigurationProvider, new { currentUsername = _userAccessor.GetUsername() })
                    .SingleOrDefaultAsync(x => x.Username == request.Username);

                return Result<Profile>.Success(profile);
            }
        }
    }
}