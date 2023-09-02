import { UserFormValues } from "../../models/User";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { Button, CircularProgress, TextField, useTheme } from "@mui/material";
import { useStore } from "../../store/store";
import { observer } from "mobx-react-lite";

const RegisterForm = () => {
  const theme = useTheme();

  const {
    userStore: { register, logging },
  } = useStore();

  const initialValues: UserFormValues = {
    email: "",
    password: "",
    displayName: "",
    username: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
    displayName: Yup.string().required(),
    username: Yup.string().required(),
  });

  const handleFormSubmit = (values: UserFormValues) => {
    register(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
    >
      {({ handleSubmit, values, handleChange, dirty, isValid }) => (
        <Form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={values.email}
            onChange={handleChange}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            value={values.password}
            onChange={handleChange}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Display Name"
            name="displayName"
            value={values.displayName}
            onChange={handleChange}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Usename"
            name="username"
            value={values.username}
            onChange={handleChange}
            margin="dense"
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
            disabled={!dirty || !isValid || logging}
          >
            {logging ? (
              <CircularProgress color="secondary" size="1.2rem" />
            ) : (
              "Register"
            )}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default observer(RegisterForm);
