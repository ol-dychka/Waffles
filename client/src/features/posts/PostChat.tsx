import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CommentCard from "./CommentCard";
import { useStore } from "../../store/store";
import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { chatComment } from "../../models/Comment";
import * as Yup from "yup";

type Props = {
  postId: string;
};

const PostChat = ({ postId }: Props) => {
  const theme = useTheme();

  const {
    commentStore: {
      createHubConnection,
      clearComments,
      comments,
      addComment,
      formattedComments,
    },
  } = useStore();

  const [reply, setReply] = useState<chatComment | undefined>(undefined);

  useEffect(() => {
    if (postId) {
      createHubConnection(postId);
    }
    return () => clearComments();
  }, [postId, createHubConnection, clearComments, addComment]);

  console.log(JSON.stringify(comments));

  return (
    <Box>
      <Typography variant="h5" mt="1rem" mb="0.5rem">
        Comments
      </Typography>
      {reply && (
        <Box display="flex">
          <Typography>Replying to {reply.displayName}.</Typography>
          <Typography
            onClick={() => setReply(undefined)}
            sx={{ cursor: "pointer" }}
            color="primary"
            ml="0.5rem"
          >
            Cancel
          </Typography>
        </Box>
      )}
      <Formik
        onSubmit={(values, { resetForm }) =>
          addComment(values, reply!).then(() => resetForm())
        }
        initialValues={{ body: "" }}
        validationSchema={Yup.object({
          body: Yup.string().required(),
        })}
      >
        {({ isSubmitting, isValid, values, handleChange }) => (
          <Form>
            <Box
              display="flex"
              justifyContent="right"
              alignItems="flex-end"
              gap="1rem"
            >
              <TextField
                value={values.body}
                label="Add Comment"
                name="body"
                onChange={handleChange}
                variant="outlined"
                margin="none"
                size="small"
                fullWidth
                multiline
              />
              <Button
                type="submit"
                sx={{
                  borderRadius: "1rem",
                  bgcolor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  "&:hover": {
                    bgcolor: theme.palette.primary.dark,
                  },
                }}
                disabled={isSubmitting || !isValid}
              >
                {isSubmitting ? (
                  <CircularProgress color="secondary" size="1.2rem" />
                ) : (
                  "Reply"
                )}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>

      {formattedComments.map((comment) => (
        <CommentCard
          key={comment.id}
          comment={comment}
          setReply={() => setReply(comment)}
        />
      ))}
    </Box>
  );
};

export default observer(PostChat);
