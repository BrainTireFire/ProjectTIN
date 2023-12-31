import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Button, Header, Form as SemanticForm, Icon } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import "./LoginForm.css";
import { UserResetPasswordFormValues } from "../../app/models/user";
import { useResetPasswordMutation } from "../../hooks/api/accounts/useResetPasswordMutation";
import { router } from "../../app/router/Routes";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required"),
});

export default function ResetPasswordForm() {
  const { token } = useParams<{ token: string }>();
  const resetPasswordMutation = useResetPasswordMutation();
  const { t } = useTranslation();

  const handleResetPasswordSubmit = async (
    values: UserResetPasswordFormValues
  ) => {
    try {
      resetPasswordMutation.mutate({ token, resetPasswordData: values });
      router.navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-container">
      <Header as="h1" color="teal" textAlign="center">
        <Icon name="glass martini" className="icon-login" />
      </Header>
      <Header as="h2" color="teal" textAlign="center">
        Reset Your Password
      </Header>
      <Formik
        initialValues={{ password: "", passwordConfirm: "", error: null }}
        validationSchema={validationSchema}
        onSubmit={handleResetPasswordSubmit}
      >
        <Form className="ui form" autoComplete="off">
          <SemanticForm.Field>
            <label>New Password</label>
            <MyTextInput
              name="password"
              type="password"
              placeholder={t("newPassword")}
            />
          </SemanticForm.Field>

          <SemanticForm.Field>
            <label>Password Confirmation</label>
            <MyTextInput
              name="passwordConfirm"
              type="password"
              placeholder={t("confirmPassword")}
            />
          </SemanticForm.Field>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button positive content="Reset Password" type="submit" fluid />
          </div>
        </Form>
      </Formik>
    </div>
  );
}
