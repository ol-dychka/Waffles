import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useStore } from "../../store/store";
import { observer } from "mobx-react-lite";
import {
  Box,
  Button,
  Divider,
  Link,
  Typography,
  useTheme,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";
import { Post } from "../../models/Post";
import { CampaignOutlined, FavoriteBorderOutlined } from "@mui/icons-material";
import { formatDistance } from "date-fns";
import { router } from "../../layout/Routes";
import LoadingComponent from "../../components/LoadingComponent";

const PostDetails = () => {
  const { id } = useParams();

  const theme = useTheme();

  const {
    postStore: { loadPost, clearSelectedPost, selectedPost: post, deletePost },
  } = useStore();

  useEffect(() => {
    if (id) loadPost(id);
    return () => {
      clearSelectedPost();
    };
  }, [id, clearSelectedPost, loadPost]);

  if (!post) return <LoadingComponent text="Loading Post" />;

  return (
    <Box bgcolor="secondary.light" borderRadius="1rem" padding="1rem" mt="3rem">
      <FlexBetween>
        <FlexBetween>
          <img
            src="/mock-photo.jpg"
            alt="mock"
            style={{ borderRadius: "50%", height: "4rem" }}
          />
          <Typography>UserName</Typography>
        </FlexBetween>
        <Typography>
          {formatDistance(new Date(post.date + "Z"), new Date(), {
            addSuffix: true,
          })}
        </Typography>
      </FlexBetween>
      <FlexBetween>
        <Typography variant="h2">
          <Link
            component={RouterLink}
            to={`/posts/${post.id}`}
            underline="hover"
            color="secondary.dark"
          >
            {post.title}
          </Link>
        </Typography>
        <Box bgcolor="secondary.main" padding="0.5em" borderRadius="1rem">
          <Typography>{post.category}</Typography>
        </Box>
      </FlexBetween>
      <img
        src="/mock-photo.jpg"
        alt="mock"
        style={{ borderRadius: "2rem", width: "40rem" }}
      />
      <FlexBetween>
        <FlexBetween>
          <FavoriteBorderOutlined sx={{ fontSize: "2rem" }} />
          <Typography>12</Typography>
        </FlexBetween>
        <FlexBetween>
          <CampaignOutlined sx={{ fontSize: "2rem" }} />
          <Typography>3</Typography>
        </FlexBetween>
      </FlexBetween>
      <Divider />
      <Box
        onClick={() => router.navigate(`/posts/${post.id}`)}
        sx={{
          "&:hover": {
            cursor: "pointer",
            bgcolor: theme.palette.primary.light,
          },
        }}
      >
        <Typography>Comments...</Typography>
      </Box>
    </Box>
  );
};

export default observer(PostDetails);
