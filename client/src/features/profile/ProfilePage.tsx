import { useMediaQuery, Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import Sticky from "react-sticky-el";
import GoToTop from "../common/GoToTop";
import Advertisement from "../common/Advertisement";
import PostCard from "../posts/PostCard";
import ProfileList from "../posts/ProfileList";
import UserInfo from "../common/UserInfo";
import { useStore } from "../../store/store";
import { useParams } from "react-router";
import { observer } from "mobx-react-lite";
import UserInfoPlaceholder from "../placeholders/UserInfoPlaceholder";
import PostCardPlaceholder from "../placeholders/PostCardPlaceholder";
import InfiniteScroll from "react-infinite-scroller";
import { PagingParams } from "../../models/Pagination";
import ProfileListPlaceholder from "../placeholders/ProfileListPlaceholder";

const ProfilePage = () => {
  const isMobile = useMediaQuery("(max-width:750px)");

  const { username } = useParams<{ username: string }>();

  const {
    profileStore: {
      profile,
      loadingProfile,
      loadingPosts,
      loadProfile,
      loadPosts,
      posts,
      clearPosts,
      loadFollowings,
      loadingFollowings,
      followings,
      setPagingParams,
      pagination,
      userPostRegistry,
    },
    userStore: { user },
  } = useStore();

  const [loadingNext, setLoadingNext] = useState(false);

  const handleGetNext = () => {
    setLoadingNext(true);
    setPagingParams(new PagingParams(pagination!.currentPage + 1));
    console.log(username);
    loadPosts(username!).then(() => setLoadingNext(false));
  };

  useEffect(() => {
    clearPosts(); //when username changes
    if (username) {
      if (userPostRegistry.size === 0) loadPosts(username);
      loadProfile(username);
      loadFollowings(username, "friends");
    }
    return () => clearPosts();
  }, [loadProfile, username, loadFollowings, clearPosts]); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box
      mt="5rem"
      width="100%"
      display={isMobile ? "block" : "flex"}
      gap="0.5rem"
      justifyContent="space-between"
    >
      <Box flexBasis={isMobile ? undefined : "26%"}>
        {loadingProfile || !profile ? (
          <UserInfoPlaceholder isMe={user?.username === username} />
        ) : isMobile ? (
          <UserInfo profile={profile} isMe={user?.username === username} />
        ) : (
          <Sticky
            stickyStyle={{
              marginTop: "6rem",
            }}
            topOffset={-97}
          >
            <UserInfo profile={profile} isMe={user?.username === username} />
          </Sticky>
        )}
      </Box>
      <Box flexBasis={isMobile ? undefined : "42%"}>
        {loadingPosts && !loadingNext && userPostRegistry.size === 0 ? (
          <>
            <PostCardPlaceholder />
            <PostCardPlaceholder />
          </>
        ) : (
          <InfiniteScroll
            pageStart={0}
            loadMore={handleGetNext}
            hasMore={
              !loadingNext &&
              !!pagination &&
              pagination.currentPage < pagination.totalPages
            }
            initialLoad={false}
          >
            {posts?.map((post) => {
              return <PostCard key={post.id} post={post} />;
            })}
          </InfiniteScroll>
        )}
        {loadingNext && (
          <Box display="flex" justifyContent="center">
            <CircularProgress
              size="2rem"
              sx={{
                color: "secondary.dark",
              }}
            />
          </Box>
        )}
      </Box>
      {!isMobile && (
        <Box flexBasis="26%">
          {loadingFollowings ? (
            <ProfileListPlaceholder />
          ) : (
            <ProfileList text="Your Friend List" profiles={followings} />
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
