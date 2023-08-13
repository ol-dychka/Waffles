import React from "react";
import { UserFormValues } from "../../models/User";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { Button, TextField } from "@mui/material";
import { useStore } from "../../store/store";

type Props = {};

const RegisterForm = (props: Props) => {
  const {
    userStore: { register },
  } = useStore();

  const initialValues: UserFormValues = {
    email: "",
    password: "",
    displayName: "",
    username: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().required(),
    password: Yup.string().required(),
    displayName: Yup.string().required(),
    username: Yup.string().required(),
  });

  const handleFormSubmit = (values: UserFormValues) => {
    console.log(values);
    register(values);
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
          <TextField
            fullWidth
            label="Display Name"
            name="displayName"
            value={values.displayName}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Usename"
            name="username"
            value={values.username}
            onChange={handleChange}
          />
          <Button type="submit">Register</Button>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
