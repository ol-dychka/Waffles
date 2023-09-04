import { useEffect, useState } from "react";
import { useStore } from "../../store/store";
import { Box, CircularProgress, useMediaQuery } from "@mui/material";
import { observer } from "mobx-react-lite";
import CreatePost from "./CreatePost";
import PostCard from "./PostCard";
import UserInfo from "../common/UserInfo";
import Advertisement from "../common/Advertisement";
import GoToTop from "../common/GoToTop";
import ProfileList from "./ProfileList";
import Sticky from "react-sticky-el";
import { PagingParams } from "../../models/Pagination";
import InfiniteScroll from "react-infinite-scroller";
import FilterOptions from "./FilterOptions";
import PostCardPlaceholder from "../placeholders/PostCardPlaceholder";
import ProfileListPlaceholder from "../placeholders/ProfileListPlaceholder";
import UserInfoPlaceholder from "../placeholders/UserInfoPlaceholder";

const PostsDashboard = () => {
  const isMobile = useMediaQuery("(max-width:750px)");

  const {
    postStore: {
      loadPosts,
      loading: loadingPosts,
      posts,
      postRegistry,
      setPagingParams,
      pagination,
    },
    userStore: { user },
    profileStore: {
      profile,
      loadingProfile,
      loadProfile,
      loadFollowings,
      loadingFollowings,
      followings,
    },
  } = useStore();

  const [loadingNext, setLoadingNext] = useState(false);

  const handleGetNext = () => {
    setLoadingNext(true);
    setPagingParams(new PagingParams(pagination!.currentPage + 1));
    loadPosts().then(() => setLoadingNext(false));
  };

  useEffect(() => {
    if (postRegistry.size <= 1) loadPosts();
    loadProfile(user!.username);
    loadFollowings(user!.username, "friends");
  }, [loadPosts, user, loadProfile, loadFollowings]); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box
      mt="5rem"
      width="100%"
      display={isMobile ? "block" : "flex"}
      gap="0.5rem"
      justifyContent="space-between"
    >
      <Box flexBasis={isMobile ? undefined : "26%"}>
        {isMobile ? (
          loadingProfile || !profile ? (
            <UserInfoPlaceholder isMe />
          ) : (
            <UserInfo profile={profile} isMe />
          )
        ) : (
          <Sticky
            stickyStyle={{
              marginTop: "6rem",
            }}
            topOffset={-97}
          >
            {loadingProfile || !profile ? (
              <UserInfoPlaceholder isMe />
            ) : (
              <UserInfo profile={profile} isMe />
            )}
          </Sticky>
        )}
      </Box>
      <Box flexBasis={isMobile ? undefined : "42%"}>
        <CreatePost disabled={loadingPosts} />
        <FilterOptions disabled={loadingPosts} />
        {loadingPosts && !loadingNext && postRegistry.size === 0 ? (
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

export default observer(PostsDashboard);
