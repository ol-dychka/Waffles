import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { Category, PostFormValues } from "../../models/Post";
import { useStore } from "../../store/store";
import FlexBetween from "../../components/FlexBetween";
import StyledBox from "../../components/StyledBox";

type Props = {};

const CreatePost = (props: Props) => {
  const {
    postStore: { createPost },
  } = useStore();

  const validationSchema = Yup.object({
    title: Yup.string().required(),
    // description: Yup.string().when("image", (image, schema) => {
    //   if (image === null) return schema.required("Must have description");
    //   return schema;
    // }),
    // image: Yup.string().when("description", (description, schema) => {
    //   if (description === null) return schema.required("Must have photo");
    //   return schema;
    // }),
    category: Yup.string(),
  });

  const initialValues = new PostFormValues();

  const handleFormSubmit = (values: PostFormValues, onSubmitProps: any) => {
    console.log(values);
    createPost(values);
    onSubmitProps.resetForm();
    setIsOpen(false);
  };

  const [isOpen, setIsOpen] = useState(false);

  const theme = useTheme();
  return (
    <StyledBox mb="2rem">
      <Typography variant="h4">Post your own ideas</Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({
          handleSubmit,
          isValid,
          isSubmitting,
          dirty,
          values,
          handleChange,
        }) => (
          <Form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              fullWidth
              label="Title"
              name="title"
              onChange={handleChange}
              value={values.title}
              onClick={() => setIsOpen(true)}
            />
            {isOpen && (
              <Box>
                <TextField
                  margin="normal"
                  fullWidth
                  label="Description"
                  name="description"
                  onChange={handleChange}
                  value={values.description}
                />
                <FormControl fullWidth>
                  <InputLabel id="select-label">Category</InputLabel>
                  <Select
                    labelId="select-label"
                    id="select"
                    margin="dense"
                    fullWidth
                    label="Category"
                    name="category"
                    value={values.category}
                    onChange={handleChange}
                  >
                    <MenuItem value={Category.Animals}>Animals</MenuItem>
                    <MenuItem value={Category.Food}>Food</MenuItem>
                    <MenuItem value={Category.Humor}>Humor</MenuItem>
                    <MenuItem value={Category.News}>News</MenuItem>
                    <MenuItem value={Category.Sports}>Sports</MenuItem>
                  </Select>
                </FormControl>
                <FlexBetween mt="2rem">
                  <Button
                    onClick={() => setIsOpen(false)}
                    sx={{
                      borderRadius: "1rem",
                      bgcolor: theme.palette.secondary.main,
                      color: theme.palette.secondary.contrastText,
                      "&:hover": {
                        bgcolor: theme.palette.secondary.light,
                      },
                    }}
                  >
                    Cancel
                  </Button>
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
                  >
                    Post
                  </Button>
                </FlexBetween>
              </Box>
            )}
          </Form>
        )}
      </Formik>
    </StyledBox>
  );
};

export default CreatePost;
