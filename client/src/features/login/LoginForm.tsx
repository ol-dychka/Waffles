import { UserFormValues } from "../../models/User";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { Button, CircularProgress, TextField, useTheme } from "@mui/material";
import { useStore } from "../../store/store";
import { observer } from "mobx-react-lite";

const LoginForm = () => {
  const theme = useTheme();

  const {
    userStore: { login },
  } = useStore();

  const initialValues: UserFormValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email().required("Email is Required"),
    password: Yup.string().required("Password is Required"),
  });

  const handleFormSubmit = (values: UserFormValues) => {
    login(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
    >
      {({
        values,
        errors,
        isValid,
        touched,
        dirty,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <Form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={values.email}
            onChange={handleChange}
            margin="dense"
            helperText={errors.email && touched.email ? errors.email : null}
            error={errors.email && touched.email ? true : false}
            onBlur={handleBlur}
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            value={values.password}
            onChange={handleChange}
            margin="dense"
            type="password"
            helperText={
              errors.password && touched.password ? errors.password : null
            }
            error={errors.password && touched.password ? true : false}
            onBlur={handleBlur}
          />
          <Button
            type="submit"
            sx={{
              margin: "0.5rem 0",
              borderRadius: "1rem",
              bgcolor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              "&:hover": {
                bgcolor: theme.palette.primary.dark,
              },
            }}
            disabled={!dirty || !isValid || isSubmitting}
          >
            {isSubmitting ? (
              <CircularProgress color="secondary" size="1.2rem" />
            ) : (
              "Login"
            )}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default observer(LoginForm);
