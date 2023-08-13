import React, { useEffect } from "react";
import { useStore } from "../../store/store";
import { Box, Button, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import FlexBetween from "../../components/FlexBetween";
import { Link } from "react-router-dom";
import CreatePost from "./CreatePost";
import {
  formatDistance,
  formatDistanceToNow,
  parseISO,
  subDays,
} from "date-fns";
import PostCard from "./PostCard";
import { router } from "../../layout/Routes";
import LoadingComponent from "../../components/LoadingComponent";

type Props = {};

const PostsDashboard = (props: Props) => {
  const {
    postStore: { loadPosts, loading, posts },
  } = useStore();

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  if (loading) return <LoadingComponent text="Loading Posts" />;

  return (
    <Box>
      <CreatePost />
      {posts?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </Box>
  );
};

export default observer(PostsDashboard);
