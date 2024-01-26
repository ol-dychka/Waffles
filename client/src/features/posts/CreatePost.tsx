import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { Category, PostFormValues } from "../../models/Post";
import { useStore } from "../../store/store";
import FlexBetween from "../../components/FlexBetween";
import StyledBox from "../../components/StyledBox";
import PhotoDropzone from "../common/PhotoDropzone";
import PhotoCropper from "../common/PhotoCropper";
import { observer } from "mobx-react-lite";
import StyledButton from "../common/StyledButton";

type Props = {
  disabled?: boolean;
};

const CreatePost = ({ disabled }: Props) => {
  const {
    postStore: { createPost },
  } = useStore();

  const [isOpen, setIsOpen] = useState(false);
  const [files, setFiles] = useState<object & { preview?: string }[]>([]);
  const [cropper, setCropper] = useState<Cropper>();

  const validationSchema = (condition: boolean) =>
    Yup.object().shape({
      title: Yup.string().required("Insert Post Title"),
      description: Yup.string().when([], {
        is: () => condition === true,
        then: (schema) => schema.required("Description or Image is Required"),
      }),
      category: Yup.string().required("Choose Category"),
    });

  const initialValues = new PostFormValues();

  const handleFormSubmit = (
    values: PostFormValues,
    onSubmitProps: FormikHelpers<PostFormValues>
  ) => {
    if (cropper) {
      cropper.getCroppedCanvas().toBlob((blob) =>
        createPost({ ...values, photo: blob! }).then(() => {
          //cleaning
          onSubmitProps.resetForm();
          setIsOpen(false);
          setCropper(undefined);
          files.forEach((file: object & { preview?: string }) =>
            URL.revokeObjectURL(file.preview!)
          );
          setFiles([]);
        })
      );
    } else {
      createPost(values);
      onSubmitProps.resetForm();
      setIsOpen(false);
      setCropper(undefined);
      files.forEach((file: object & { preview?: string }) =>
        URL.revokeObjectURL(file.preview!)
      );
      setFiles([]);
    }
  };

  return (
    <StyledBox mb="0.5rem" sx={disabled ? { pointerEvents: "none" } : {}}>
      <Typography variant="h4">Post your own ideas</Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={() => validationSchema(files.length === 0)}
        onSubmit={handleFormSubmit}
      >
        {({
          values,
          errors,
          isValid,
          touched,
          dirty,
          handleSubmit,
          handleChange,
          handleBlur,
          isSubmitting,
          validateForm,
          resetForm,
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
              helperText={errors.title && touched.title ? errors.title : null}
              error={errors.title && touched.title ? true : false}
              onBlur={handleBlur}
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
                  helperText={errors.description ? errors.description : null}
                  error={
                    errors.description && touched.description ? true : false
                  }
                  onBlur={handleBlur}
                />

                <Box height="15rem" mb="0.5rem">
                  {!(files && files.length > 0) ? (
                    <PhotoDropzone setFiles={setFiles} />
                  ) : (
                    <>
                      <PhotoCropper
                        setCropper={(cropper) => {
                          setCropper(cropper);
                          validateForm(values);
                        }}
                        imagePreview={files[0].preview!}
                      />
                    </>
                  )}
                </Box>

                <FormControl
                  fullWidth
                  error={errors.category && touched.category ? true : false}
                >
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
                    onBlur={handleBlur}
                  >
                    <MenuItem value={Category.Animals}>Animals</MenuItem>
                    <MenuItem value={Category.Food}>Food</MenuItem>
                    <MenuItem value={Category.Humor}>Humor</MenuItem>
                    <MenuItem value={Category.News}>News</MenuItem>
                    <MenuItem value={Category.Sports}>Sports</MenuItem>
                  </Select>
                  {errors.category && touched.category && (
                    <FormHelperText>{errors.category}</FormHelperText>
                  )}
                </FormControl>
                <FlexBetween mt="2rem">
                  <StyledButton
                    text="Cancel"
                    handleClick={() => {
                      setIsOpen(false);
                      resetForm();
                    }}
                    secondary
                  />
                  <StyledButton
                    text="Post"
                    submit
                    disabled={!dirty || !isValid}
                    loading={isSubmitting}
                  />
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
