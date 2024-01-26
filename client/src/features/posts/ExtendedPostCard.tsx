import { Favorite, FavoriteBorderOutlined } from "@mui/icons-material";
import { Typography, Box, Divider } from "@mui/material";
import { formatDistance } from "date-fns";
import FlexBetween from "../../components/FlexBetween";
import ProfileCard from "../common/ProfileCard";
import StyledBox from "../../components/StyledBox";
import { Post } from "../../models/Post";
import { useStore } from "../../store/store";
import PostChat from "./PostChat";

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
          profile={post.creator!}
          isCurrent={post.creator!.username === user?.username}
        />
        <Typography>
          {formatDistance(new Date(post.date), new Date(), {
            addSuffix: true,
          })}
        </Typography>
      </FlexBetween>
      <FlexBetween mt="-0.5rem">
        <Typography variant="h4">{post.title}</Typography>
        {post.category && (
          <Box bgcolor="secondary.main" padding="0.5em" borderRadius="1rem">
            <Typography>{post.category}</Typography>
          </Box>
        )}
      </FlexBetween>
      <Typography my="0.5rem">{post.description}</Typography>
      {/* use image + - loopa */}
      {post.image && (
        <img
          src={post.image}
          alt="mock"
          style={{ borderRadius: "2rem", width: "100%" }}
        />
      )}
      <Box display="flex" alignItems="center" mb="0.25rem">
        {post.isLiked ? (
          <Favorite
            onClick={() => updateLike(post.id)}
            color="primary"
            sx={{
              fontSize: "1.75rem",
              "&:hover": {
                cursor: "pointer",
              },
            }}
          />
        ) : (
          <FavoriteBorderOutlined
            onClick={() => updateLike(post.id)}
            sx={{
              fontSize: "1.75rem",
              "&:hover": {
                cursor: "pointer",
              },
            }}
          />
        )}
        <Typography ml="0.5rem" fontSize="1rem">
          {post.likes.length}
        </Typography>
      </Box>
      <Divider />
      <PostChat postId={post.id} />
    </StyledBox>
  );
};

export default ExtendedPostCard;
