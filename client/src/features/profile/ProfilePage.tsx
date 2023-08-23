import { useMediaQuery, Box } from "@mui/material";
import React, { useEffect } from "react";
import Sticky from "react-sticky-el";
import GoToTop from "../common/GoToTop";
import Advertisement from "../common/Advertisement";
import CreatePost from "../posts/CreatePost";
import PostCard from "../posts/PostCard";
import ProfileList from "../posts/ProfileList";
import UserInfo from "../common/UserInfo";
import { useStore } from "../../store/store";
import { useParams } from "react-router";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../common/LoadingComponent";

type Props = {};

const ProfilePage = (props: Props) => {
  const isMobile = useMediaQuery("(max-width:750px)");

  const { username } = useParams<{ username: string }>();
  console.log(username);

  const {
    profileStore: {
      profile,
      loading,
      loadProfile,
      loadPosts,
      posts,
      clearPosts,
    },
  } = useStore();

  useEffect(() => {
    if (username) {
      loadProfile(username);
      loadPosts(username);
    }
    return () => clearPosts();
  }, [loadProfile, username]);

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
          <UserInfo profile={profile!} isCurrent={false} />
        </Sticky>
      </Box>
      <Box flexBasis={isMobile ? undefined : "42%"}>
        {posts?.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </Box>
      {!isMobile && (
        <Box flexBasis="26%">
          <ProfileList
            text={`${profile.displayName}'s Friend List`}
            profiles={[]}
          />
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
