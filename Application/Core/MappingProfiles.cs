using Application.Posts;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Post, Post>();
            CreateMap<Post, PostDto>()
                .ForMember(d => d.CreatorUsername, o => o.MapFrom(s => s.Creator.UserName));
            // for likes on posts so thay can display as icons with username,
            // displayname & image. don't really need bio, but whatever
            CreateMap<Like, Profiles.Profile>()
                .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio));
        }
    }
}