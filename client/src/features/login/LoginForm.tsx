import React from "react";
import { UserFormValues } from "../../models/User";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { Button, TextField } from "@mui/material";
import { useStore } from "../../store/store";

type Props = {};

const LoginForm = (props: Props) => {
  const {
    userStore: { login },
  } = useStore();

  const initialValues: UserFormValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().required(),
    password: Yup.string().required(),
  });

  const handleFormSubmit = (values: UserFormValues) => {
    console.log(values);
    login(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
    >
      {({ handleSubmit, values, handleChange }) => (
        <Form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
          <Button type="submit">Log In</Button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
