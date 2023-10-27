import { Form, Formik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Header,
  Form as SemanticForm,
  Message,
  Icon,
} from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import "./LoginForm.css";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../../hooks/api/accounts/useLoginMutation";
import { UserFormValues } from "../../app/models/user";
import { router } from "../../app/router/Routes";
import ErrorPage from "../errors/ErrorPage";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useCurrentUser } from "../../hooks/api/users/useCurrentUser";
import { useTranslation } from "react-i18next";

export default function LoginForm() {
  const loginMutation = useLoginMutation();
  const [errorLogin, setErrorLogin] = useState(false);
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required(t("emailIsRequired"))
      .email(t("invaidEmailAdress")),
    password: Yup.string()
      .required(t("passwordIsRequired"))
      .min(8, t("passwordMinChar")),
  });

  const handleLoginSubmit = async (values: UserFormValues) => {
    try {
      const response = await loginMutation.mutateAsync(values);

      if (response) {
        router.navigate("/alcohols");
      }

      setErrorLogin(false);
    } catch (error) {
      console.error("Error in handleLoginSubmit:", error);
      setErrorLogin(true);
    }
  };

  return (
    <div className="login-container">
      <Header as="h1" color="teal" textAlign="center">
        <Icon name="glass martini" className="icon-login" />
      </Header>
      <Header as="h2" color="teal" textAlign="center">
        {t("noUserAvailabe")}
      </Header>
      {errorLogin ? (
        <Message negative>
          <Message.Header>{t("unauthorized")}</Message.Header>
          <p>{t("incorrectEmailAndPassword")}</p>
        </Message>
      ) : null}
      <Formik
        initialValues={{ email: "", password: "", error: null }}
        validationSchema={validationSchema}
        onSubmit={handleLoginSubmit}
      >
        <Form className="ui form" autoComplete="off">
          <SemanticForm.Field>
            <label>{t("email")}</label>
            <MyTextInput name="email" placeholder={t("email")} />
          </SemanticForm.Field>
          <SemanticForm.Group>
            <SemanticForm.Field
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <label>{t("password")}</label>
            </SemanticForm.Field>
            <SemanticForm.Field>
              <Link
                to={`/forgotPassword`}
                key={"forgot_password_button"}
                className="forgot-password-link"
                style={{ marginLeft: "179px" }}
              >
                {t("forgotPassword")}
              </Link>
            </SemanticForm.Field>
          </SemanticForm.Group>
          <SemanticForm.Field style={{ marginTop: "-14px" }}>
            <MyTextInput
              name="password"
              placeholder={t("password")}
              type="password"
            />
          </SemanticForm.Field>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button positive content="Login" type="submit" fluid />
          </div>
        </Form>
      </Formik>
      <div className="create-account-text">
        <p>
          {t("newGithub")}
          <Link
            to={`/register`}
            key={"create_an_account_button"}
            className="create-account-link"
          >
            {t("createAnAccount")}
          </Link>{" "}
        </p>
      </div>
    </div>
  );
}
