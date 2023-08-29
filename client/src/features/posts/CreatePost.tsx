import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
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
import PhotoDropzone from "../common/PhotoDropzone";
import PhotoCropper from "../common/PhotoCropper";
import { observer } from "mobx-react-lite";

type Props = {};

const CreatePost = (props: Props) => {
  const {
    postStore: { createPost },
  } = useStore();

  const [isOpen, setIsOpen] = useState(false);
  const [files, setFiles] = useState<any>([]);
  const [cropper, setCropper] = useState<Cropper>();

  const validationSchema = (condition: boolean) =>
    Yup.object().shape({
      title: Yup.string().required("Insert Post Title"),
      description: Yup.string().when([], {
        is: () => condition === true,
        then: (schema) => schema.required(""),
      }),
      category: Yup.string().required("Choose Category"),
    });

  const initialValues = new PostFormValues();

  const handleFormSubmit = (values: PostFormValues, onSubmitProps: any) => {
    if (cropper) {
      cropper.getCroppedCanvas().toBlob((blob) =>
        createPost({ ...values, photo: blob! }).then(() => {
          //cleaning
          onSubmitProps.resetForm();
          setIsOpen(false);
          setCropper(undefined);
          files.forEach((file: any) => URL.revokeObjectURL(file.preview));
          setFiles([]);
        })
      );
    } else {
      createPost(values);
      onSubmitProps.resetForm();
      setIsOpen(false);
      setCropper(undefined);
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
      setFiles([]);
    }
  };

  const theme = useTheme();
  return (
    <StyledBox mb="2rem">
      <Typography variant="h4">Post your own ideas</Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={() => validationSchema(files.length === 0)}
        onSubmit={handleFormSubmit}
      >
        {({
          handleSubmit,
          isValid,
          isSubmitting,
          dirty,
          values,
          errors,
          touched,
          handleChange,
        }) => (
          <Form onSubmit={handleSubmit}>
            <TextField
              margin="dense"
              fullWidth
              label="Title"
              name="title"
              onChange={handleChange}
              value={values.title}
              onClick={() => setIsOpen(true)}
              error={Boolean(touched.title) && Boolean(errors.title)}
              helperText={touched.title && errors.title}
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
                  error={
                    Boolean(touched.description) && Boolean(errors.description)
                  }
                  helperText={touched.description && errors.description}
                />

                <Box height="15rem" mb="0.5rem">
                  {!(files && files.length > 0) ? (
                    <PhotoDropzone setFiles={setFiles} />
                  ) : (
                    <>
                      <PhotoCropper
                        setCropper={setCropper}
                        imagePreview={files[0].preview}
                      />
                    </>
                  )}
                </Box>

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
                    error={
                      Boolean(touched.category) && Boolean(errors.category)
                    }
                  >
                    <MenuItem value={Category.Animals}>Animals</MenuItem>
                    <MenuItem value={Category.Food}>Food</MenuItem>
                    <MenuItem value={Category.Humor}>Humor</MenuItem>
                    <MenuItem value={Category.News}>News</MenuItem>
                    <MenuItem value={Category.Sports}>Sports</MenuItem>
                  </Select>
                  {touched.category && (
                    <FormHelperText>{errors.category}</FormHelperText>
                  )}
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
                    disabled={!dirty || !isValid}
                  >
                    {isSubmitting ? (
                      <CircularProgress color="secondary" size="1.2rem" />
                    ) : (
                      "Post"
                    )}
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

export default observer(CreatePost);
