using Application.Comments;
using Application.Posts;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            string currentUsername = null;

            CreateMap<Post, Post>();
            CreateMap<Post, PostDto>();
            //.ForMember(d => d.Creator, o => o.MapFrom(s => s.Creator));
            // for likes on posts so thay can display as icons with username,
            // displayname & image. don't really need bio, but whatever
            CreateMap<Like, Profiles.Profile>()
                .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.AppUser.Photo.Url));
            CreateMap<AppUser, Profiles.Profile>()
                .ForMember(d => d.Username, o => o.MapFrom(s => s.UserName))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.Photo.Url))
                .ForMember(d => d.FollowersCount, o => o.MapFrom(s => s.Followers.Count))
                .ForMember(d => d.SubscriptionsCount, o => o.MapFrom(s => s.Subscriptions.Count))
                .ForMember(d => d.Following, o => o.MapFrom(s => s.Followers.Any(x => x.Observer.UserName == currentUsername)));
            CreateMap<Comment, CommentDto>().PreserveReferences()
                .ForMember(d => d.Username, o => o.MapFrom(s => s.Author.UserName))
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.Author.DisplayName))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.Author.Photo.Url));
        }
    }
}