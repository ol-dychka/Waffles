import { useEffect } from "react";
import { useStore } from "../../store/store";
import { Box, useMediaQuery } from "@mui/material";
import { observer } from "mobx-react-lite";
import CreatePost from "./CreatePost";
import PostCard from "./PostCard";
import LoadingComponent from "../common/LoadingComponent";
import UserInfo from "../common/UserInfo";
import Advertisement from "../common/Advertisement";
import GoToTop from "../common/GoToTop";
import ProfileList from "./ProfileList";
import Sticky from "react-sticky-el";

const PostsDashboard = () => {
  const isMobile = useMediaQuery("(max-width:750px)");

  const {
    postStore: { loadPosts, loading, posts, postRegistry },
    userStore: { user },
    profileStore: {
      profile,
      loadProfile,
      loadFollowings,
      loadingFollowings,
      followings,
    },
  } = useStore();

  useEffect(() => {
    if (postRegistry.size <= 1) loadPosts();
    loadProfile(user!.username);
    loadFollowings(user!.username, "friends");
  }, [loadPosts, postRegistry.size, user, loadProfile, loadFollowings]);

  if (loading || postRegistry.size < 1 || profile === undefined)
    return <LoadingComponent text="Loading Posts" />;

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
          {profile && <UserInfo profile={profile} isMe />}
        </Sticky>
      </Box>
      <Box flexBasis={isMobile ? undefined : "42%"}>
        <CreatePost />
        {posts?.map((post) => {
          return <PostCard key={post.id} post={post} />;
        })}
      </Box>
      {!isMobile && (
        <Box flexBasis="26%">
          {!loadingFollowings ? (
            <ProfileList text="Your Friend List" profiles={followings} />
          ) : (
            <div>Placeholder</div>
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

export default observer(PostsDashboard);
