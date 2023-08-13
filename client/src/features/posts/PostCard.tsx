import { Box, Divider, Link, Typography, useTheme } from "@mui/material";
import {
  FavoriteBorderOutlined,
  CampaignOutlined,
  InsertCommentOutlined,
  ArrowRightOutlined,
} from "@mui/icons-material";
import React from "react";
import { Post } from "../../models/Post";
import FlexBetween from "../../components/FlexBetween";
import { Link as RouterLink } from "react-router-dom";
import { formatDistance } from "date-fns";
import { Image } from "@mui/icons-material";
import { router } from "../../layout/Routes";

type Props = {
  post: Post;
};

const PostCard = ({ post }: Props) => {
  const theme = useTheme();
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
        <Typography>
          <InsertCommentOutlined sx={{ fontSize: "2rem" }} />
          Comments
          <ArrowRightOutlined sx={{ fontSize: "2rem" }} />
        </Typography>
      </Box>
    </Box>
  );
};

export default PostCard;
