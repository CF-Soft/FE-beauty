import { Box, Button, Paper, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editAdmin, getAdmin, getMe } from "../../store/actions/auth-action";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField } from "@mui/material";

const Settings = () => {
  const dispatch = useDispatch();
  const me = useSelector((state) => state.auth.admin);
  const myAdmin = useSelector((state) => state.auth.myAdmin);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("required"),
    email: Yup.string().email("invalid-email").required("required"),
    password: Yup.string().min(8, "too-short").max(50, "too-long"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "passwords-much"
    ),
  });

  const validationSchemaAdmin = Yup.object().shape({
    name: Yup.string().required("required"),
    email: Yup.string().email("invalid-email").required("required"),
    password: Yup.string().min(8, "too-short").max(50, "too-long"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "passwords-much"
    ),
  });

  useEffect(() => {
    dispatch(getMe());
    dispatch(getAdmin());
  }, []);

  const initialValues = {
    name: me?.name,
    email: me?.email,
    password: "",
    confirmPassword: "",
  };

  const initialValuesAdmin = {
    name: myAdmin?.name,
    email: myAdmin?.email,
    password: "",
    confirmPassword: "",
  };

  return (
    <Box
      component={Paper}
      sx={{
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
        minHeight: "100vh",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography gutterBottom variant="h5" component="div">
          Իմ կարգավորումները
        </Typography>
        {!!initialValues?.email && (
          <Box>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) =>
                dispatch(editAdmin({ ...values, oldEmail: me.email }))
              }
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="services-title"></div>
                  <Field
                    as={TextField}
                    name="name"
                    label={"Անուն"}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                  />
                  <Field
                    as={TextField}
                    name="email"
                    label={"էլեկտրոնային հասցե"}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                  />
                  <Field
                    as={TextField}
                    name="password"
                    label={"Գաղտնաբառ"}
                    type="password"
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                  />

                  <Field
                    as={TextField}
                    name="confirmPassword"
                    label={"Հաստատել գաղտնաբառը"}
                    type="password"
                    error={
                      touched.confirmPassword && Boolean(errors.confirmPassword)
                    }
                    helperText={
                      touched.confirmPassword && errors.confirmPassword
                    }
                    variant="outlined"
                    margin="normal"
                    fullWidth
                  />
                  <Button type="submit">{"Խմբագրել"}</Button>
                </Form>
              )}
            </Formik>
          </Box>
        )}
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography gutterBottom variant="h5" component="div">
          Ադմինի կարգավորումներ
        </Typography>
        <Box>
          {!!initialValuesAdmin?.email && (
            <Box>
              <Formik
                initialValues={initialValuesAdmin}
                validationSchema={validationSchemaAdmin}
                onSubmit={(values) =>
                  dispatch(editAdmin({ ...values, oldEmail: myAdmin.email }))
                }
              >
                {({ errors, touched }) => (
                  <Form>
                    <div className="services-title"></div>
                    <Field
                      as={TextField}
                      name="name"
                      label={"Անուն"}
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                      variant="outlined"
                      margin="normal"
                      fullWidth
                    />
                    <Field
                      as={TextField}
                      name="email"
                      label={"էլեկտրոնային հասցե"}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                      variant="outlined"
                      margin="normal"
                      fullWidth
                    />
                    <Field
                      as={TextField}
                      name="password"
                      label={"Գաղտնաբառ"}
                      type="password"
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                      variant="outlined"
                      margin="normal"
                      fullWidth
                    />

                    <Field
                      as={TextField}
                      name="confirmPassword"
                      label={"Հաստատել գաղտնաբառը"}
                      type="password"
                      error={
                        touched.confirmPassword &&
                        Boolean(errors.confirmPassword)
                      }
                      helperText={
                        touched.confirmPassword && errors.confirmPassword
                      }
                      variant="outlined"
                      margin="normal"
                      fullWidth
                    />
                    <Button type="submit">{"Խմբագրել"}</Button>
                  </Form>
                )}
              </Formik>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Settings;
