import { useEffect } from "react";
import { useStore } from "../../store/store";
import { Box, useMediaQuery } from "@mui/material";
import { observer } from "mobx-react-lite";
import CreatePost from "./CreatePost";
import PostCard from "./PostCard";
import LoadingComponent from "../common/LoadingComponent";
import UserInfo from "./UserInfo";
import Advertisement from "../common/Advertisement";
import GoToTop from "../../layout/GoToTop";
import ProfileList from "./ProfileList";
import Sticky from "react-sticky-el";
import { Profile } from "../../models/Profile";

type Props = {};

const PostsDashboard = (props: Props) => {
  const isMobile = useMediaQuery("(max-width:750px)");

  const {
    postStore: { loadPosts, loading, posts, postRegistry },
    userStore: { user },
  } = useStore();

  useEffect(() => {
    if (postRegistry.size <= 1) loadPosts();
  }, [loadPosts, postRegistry.size]);

  if (loading || postRegistry.size < 1)
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
          <UserInfo profile={new Profile(user!)} isCurrent />
        </Sticky>
      </Box>
      <Box flexBasis={isMobile ? undefined : "42%"}>
        <CreatePost />
        {posts?.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </Box>
      {!isMobile && (
        <Box flexBasis="26%">
          <ProfileList text="Your Friend List" profiles={[]} />
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
