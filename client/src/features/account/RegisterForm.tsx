import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Header,
  Label,
  Form as SemanticForm,
  Icon,
} from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import "./RegisterForm.css";
import { Link } from "react-router-dom";
import { UserRegisterFormValues } from "../../app/models/user";
import { useRegisterMutation } from "../../hooks/api/accounts/userRegisterMutation";
import { router } from "../../app/router/Routes";
import { useTranslation } from "react-i18next";

export default function LoginForm() {
  const registerMutation = useRegisterMutation();
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t("nameIsRequired")),
    email: Yup.string()
      .email(t("invaidEmailAdress"))
      .required(t("emailIsRequired")),
    password: Yup.string()
      .min(8, t("passwordMinChar"))
      .required(t("passwordIsRequired")),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref("password"), null], t("passwordNotMatch"))
      .required(t("passwordConfirmIsRequired")),
  });

  const handleRegisterSubmit = async (values: UserRegisterFormValues) => {
    try {
      registerMutation.mutate(values);
      router.navigate("/alcohols");
    } catch (error) {
      console.log(error);
      // Handle login error
    }
  };

  return (
    <div className="registration-container">
      <Header as="h1" color="teal" textAlign="center">
        <Icon name="glass martini" className="icon-login" />
      </Header>
      <Header as="h2" color="teal" textAlign="center">
        {t("createAccontInAlcoholWorld")}
      </Header>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          passwordConfirm: "",
          error: null,
        }}
        validationSchema={validationSchema}
        // onSubmit={(values, { setErrors }) => userStore.register(values).catch(error => setErrors({ error: 'Invalid email or password' }))}
        onSubmit={handleRegisterSubmit}
      >
        <Form className="ui form" autoComplete="off">
          <SemanticForm.Field>
            <label>{t("name")}</label>
            <MyTextInput name="name" placeholder={t("name")} />
          </SemanticForm.Field>
          <SemanticForm.Field>
            <label>{t("email")}</label>
            <MyTextInput name="email" placeholder={t("email")} />
          </SemanticForm.Field>
          <SemanticForm.Field>
            <label>{t("password")}</label>
          </SemanticForm.Field>
          <SemanticForm.Field>
            <MyTextInput
              name="password"
              placeholder={t("password")}
              type="password"
            />
          </SemanticForm.Field>
          <SemanticForm.Field>
            <label>{t("passwordConfirm")}</label>
          </SemanticForm.Field>
          <SemanticForm.Field>
            <MyTextInput
              name="passwordConfirm"
              placeholder={t("passwordConfirm")}
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
            <Button positive content={t("register")} type="submit" fluid />
          </div>
          <ErrorMessage
            name="error"
            render={() => (
              <Label style={{ marginBottom: 10 }} basic color="red" />
            )}
          />
        </Form>
      </Formik>
      <div className="create-account-text">
        <p>
          {t("alreadyHaveAccount")}
          <Link
            to={`/login`}
            key={"sign_in_button"}
            className="create-account-link"
          >
            {t("signIn")}
          </Link>
        </p>
      </div>
    </div>
  );
}
