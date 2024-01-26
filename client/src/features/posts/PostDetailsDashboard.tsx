import { useEffect } from "react";
import { useParams } from "react-router";
import { useStore } from "../../store/store";
import { observer } from "mobx-react-lite";
import { Box, useMediaQuery } from "@mui/material";
import LoadingComponent from "../common/LoadingComponent";
import ExtendedPostCard from "./ExtendedPostCard";
import ProfileList from "./ProfileList";
import Advertisement from "../common/Advertisement";
import Sticky from "react-sticky-el";

const PostDetails = () => {
  const isMobile = useMediaQuery("(max-width:750px)");

  const { id } = useParams();

  const {
    postStore: { loadPost, clearSelectedPost, selectedPost: post },
  } = useStore();

  useEffect(() => {
    if (id) loadPost(id);
    return () => {
      clearSelectedPost();
    };
  }, [id, clearSelectedPost, loadPost]);

  if (!post) return <LoadingComponent text="Loading Post" />;

  return (
    <Box
      mt="4rem"
      width="100%"
      display={isMobile ? "block" : "flex"}
      gap="0.5rem"
      justifyContent="space-between"
    >
      <Box flexBasis={isMobile ? undefined : "71%"}>
        <ExtendedPostCard post={post} />
      </Box>
      {!isMobile && (
        <Box flexBasis="26%">
          <ProfileList text="Likes" profiles={post.likes} />
          <Sticky
            stickyStyle={{
              marginTop: "4.5rem",
            }}
            topOffset={-72}
          >
            <Advertisement />
          </Sticky>
        </Box>
      )}
    </Box>
  );
};

export default observer(PostDetails);
