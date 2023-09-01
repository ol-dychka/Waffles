import { Box, Divider, Link, Typography, useTheme } from "@mui/material";
import {
  FavoriteBorderOutlined,
  Favorite,
  InsertCommentOutlined,
  ArrowRightOutlined,
  VolumeMuteOutlined,
} from "@mui/icons-material";
import React from "react";
import { Post } from "../../models/Post";
import FlexBetween from "../../components/FlexBetween";
import { Link as RouterLink } from "react-router-dom";
import { formatDistance } from "date-fns";
import { router } from "../../layout/Routes";
import { useStore } from "../../store/store";
import { observer } from "mobx-react-lite";
import ProfileCard from "../common/ProfileCard";
import StyledBox from "../../components/StyledBox";

type Props = {
  post: Post;
};

const PostCard = ({ post }: Props) => {
  const theme = useTheme();
  const {
    postStore: { updateLike },
    userStore: { user },
  } = useStore();

  return (
    <StyledBox mb="2rem">
      <FlexBetween>
        <ProfileCard
          profile={post.creator!}
          isCurrent={post.creator!.username === user?.username}
        />
        <Typography>
          {formatDistance(new Date(post.date + "Z"), new Date(), {
            addSuffix: true,
          })}
        </Typography>
      </FlexBetween>
      <FlexBetween>
        <Typography variant="h4">
          <Link
            component={RouterLink}
            to={`/posts/${post.id}`}
            underline="hover"
            color="secondary.dark"
          >
            {post.title}
          </Link>
        </Typography>
        {post.category && (
          <Box bgcolor="secondary.main" padding="0.5em" borderRadius="1rem">
            <Typography>{post.category}</Typography>
          </Box>
        )}
      </FlexBetween>
      <Typography mb="0.5rem">{post.description}</Typography>
      {post.image && (
        <img
          src={post.image}
          alt="mock"
          style={{ borderRadius: "2rem", width: "100%" }}
        />
      )}
      <FlexBetween m="1rem 0">
        <FlexBetween>
          {post.isLiked ? (
            <Favorite
              onClick={() => updateLike(post.id)}
              color="primary"
              sx={{
                fontSize: "2rem",
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            />
          ) : (
            <FavoriteBorderOutlined
              onClick={() => updateLike(post.id)}
              sx={{
                fontSize: "2rem",
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            />
          )}
          <Typography ml="0.5rem" fontSize="1rem">
            {post.likes.length}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography fontSize="1rem">3</Typography>
          <VolumeMuteOutlined sx={{ fontSize: "2rem" }} />
        </FlexBetween>
      </FlexBetween>
      <Divider />
      <FlexBetween
        onClick={() => router.navigate(`/posts/${post.id}`)}
        borderRadius="0.5rem"
        padding="0.5rem"
        mt="0.5rem"
        sx={{
          "&:hover": {
            cursor: "pointer",
            bgcolor: theme.palette.secondary.main,
            ".MuiTypography-root": {
              fontWeight: "500",
            },
          },
        }}
      >
        <FlexBetween alignItems="center">
          <InsertCommentOutlined sx={{ fontSize: "1.5rem" }} />
          <Typography fontSize="1rem" ml="0.5rem">
            Comments
          </Typography>
        </FlexBetween>
        <ArrowRightOutlined sx={{ fontSize: "1.5rem" }} />
      </FlexBetween>
    </StyledBox>
  );
};

export default observer(PostCard);
