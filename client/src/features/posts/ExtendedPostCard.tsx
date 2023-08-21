import {
  Favorite,
  FavoriteBorderOutlined,
  VolumeMuteOutlined,
} from "@mui/icons-material";
import { Typography, Box, Divider, useTheme } from "@mui/material";
import { formatDistance } from "date-fns";
import React from "react";
import FlexBetween from "../../components/FlexBetween";
import ProfileCard from "../common/ProfileCard";
import StyledBox from "../../components/StyledBox";
import { Post } from "../../models/Post";
import { useStore } from "../../store/store";
import CommentCard from "./CommentCard";

type Props = {
  post: Post;
};

const ExtendedPostCard = ({ post }: Props) => {
  const {
    postStore: { updateLike },
    userStore: { user },
  } = useStore();

  return (
    <StyledBox>
      <FlexBetween>
        <ProfileCard
          profile={post.creator}
          isCurrent={post.creator.username === user?.username}
        />
        <Typography>
          {formatDistance(new Date(post.date + "Z"), new Date(), {
            addSuffix: true,
          })}
        </Typography>
      </FlexBetween>
      <FlexBetween>
        <Typography variant="h4">{post.title}</Typography>
        {post.category && (
          <Box bgcolor="secondary.main" padding="0.5em" borderRadius="1rem">
            <Typography>{post.category}</Typography>
          </Box>
        )}
      </FlexBetween>
      <Typography mb="0.5rem">{post.description}</Typography>
      {/* use image + - loopa */}
      <img
        src={post.image || "/placeholder.png"}
        alt="mock"
        style={{ borderRadius: "2rem", width: "100%" }}
      />
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
      <Typography fontSize="1rem" m="0.5rem 0 1rem 0.5rem">
        Comments
      </Typography>
      <CommentCard />
      <CommentCard indent={1} />
      <CommentCard indent={2} />
      <CommentCard />
      <CommentCard indent={1} />
    </StyledBox>
  );
};

export default ExtendedPostCard;
