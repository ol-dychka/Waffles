import { Box, Typography } from "@mui/material";
import { chatComment } from "../../models/Comment";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

type Props = {
  comment: chatComment;
  setReply: () => void;
};

const CommentCard = ({ comment, setReply }: Props) => {
  const replies = comment.replies ? comment.replies.length : 0;

  return (
    <Box mt="0.5rem" ml={`${comment.indent * 1.5}rem`}>
      <Box display="flex" alignItems="flex-start">
        <img
          src={comment.image || "/user.png"}
          alt="comm"
          style={{
            width: "2rem",
            borderRadius: "50%",
          }}
        />
        <Box>
          <Box display="flex" gap="0.5rem">
            <Typography
              ml="1rem"
              component={Link}
              to={`/profiles/${comment.username}`}
              sx={{
                textDecoration: "none",
              }}
              color="primary"
              fontWeight="700"
            >
              {comment.displayName}
            </Typography>
            {/* <Typography>{formatDistanceToNow(comment.createdAt)}</Typography> */}
            <Typography>
              {formatDistanceToNow(new Date(comment.createdAt))} ago
            </Typography>
            {replies > 0 && (
              <Typography color="primary">
                {replies} {replies > 1 ? "Replies" : "Reply"}
              </Typography>
            )}
          </Box>
          <Box>
            <Typography ml="1rem" sx={{ wordBreak: "break-word" }}>
              {comment.body}
            </Typography>
          </Box>
        </Box>
      </Box>
      {comment.indent === 0 && (
        <Box display="flex" justifyContent="right">
          <Typography
            mt="-0.5rem"
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
            color="primary"
            onClick={setReply}
          >
            Reply
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default CommentCard;
