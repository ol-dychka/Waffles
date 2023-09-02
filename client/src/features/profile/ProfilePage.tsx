import { useMediaQuery, Box } from "@mui/material";
import { useEffect } from "react";
import Sticky from "react-sticky-el";
import GoToTop from "../common/GoToTop";
import Advertisement from "../common/Advertisement";
import PostCard from "../posts/PostCard";
import ProfileList from "../posts/ProfileList";
import UserInfo from "../common/UserInfo";
import { useStore } from "../../store/store";
import { useParams } from "react-router";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../common/LoadingComponent";

const ProfilePage = () => {
  const isMobile = useMediaQuery("(max-width:750px)");

  const { username } = useParams<{ username: string }>();

  const {
    profileStore: {
      profile,
      loading,
      loadProfile,
      loadPosts,
      posts,
      clearPosts,
      loadFollowings,
      loadingFollowings,
      followings,
    },
    userStore: { user },
  } = useStore();

  useEffect(() => {
    if (username) {
      loadProfile(username);
      loadPosts(username);
      loadFollowings(username, "friends");
    }
    return () => clearPosts();
  }, [loadProfile, username, loadPosts, loadFollowings, clearPosts]);

  if (loading || profile === null)
    return <LoadingComponent text="Loading Profile" />;

  return (
    <Box
      mt="5rem"
      width="100%"
      display={isMobile ? "block" : "flex"}
      gap="0.5rem"
      justifyContent="space-between"
    >
      <Box flexBasis={isMobile ? undefined : "26%"}>
        <Sticky
          stickyStyle={{
            marginTop: "6rem",
          }}
          topOffset={-97}
        >
          <UserInfo profile={profile!} isMe={user?.username === username} />
        </Sticky>
      </Box>
      <Box flexBasis={isMobile ? undefined : "42%"}>
        {posts?.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </Box>
      {!isMobile && (
        <Box flexBasis="26%">
          {loadingFollowings ? (
            <div>Placeholder</div>
          ) : (
            <ProfileList
              text={`${profile.displayName}'s Friend List`}
              profiles={followings}
            />
          )}
          <Sticky
            stickyStyle={{
              marginTop: "4rem",
            }}
            topOffset={-96}
          >
            <Advertisement />
          </Sticky>
          <GoToTop />
        </Box>
      )}
    </Box>
  );
};

export default observer(ProfilePage);
