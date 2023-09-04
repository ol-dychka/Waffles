using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Persistence;

namespace Application.Posts
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<PostDto>>>
        {
            public PostParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<PostDto>>>
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

            public async Task<Result<PagedList<PostDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.Posts
                    .OrderByDescending(d => d.Date)
                    .ProjectTo<PostDto>(_mapper.ConfigurationProvider, new { currentUsername = _userAccessor.GetUsername() })
                    .AsQueryable();

                if (request.Params.IsFollowed)
                {
                    query = query.Where(x => x.Creator.Following);
                }

                if (request.Params.IsLiked)
                {
                    query = query.Where(x => x.Likes.Any(l => l.Username == _userAccessor.GetUsername()));
                }

                if (request.Params.Category != null)
                {
                    query = query.Where(x => x.Category == request.Params.Category);
                }

                return Result<PagedList<PostDto>>.Success(await PagedList<PostDto>
                    .CreateAsync(query, request.Params.PageNumber, request.Params.PageSize));
            }
        }
    }
}