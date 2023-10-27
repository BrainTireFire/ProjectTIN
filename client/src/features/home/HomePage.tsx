import React from "react";
import {
  Container,
  Header,
  Button,
  Icon,
  Grid,
  Segment,
  Image,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import { useTranslation } from "react-i18next";

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <Segment
      inverted
      textAlign="center"
      vertical
      className="masthead segmentStyle"
    >
      <Container text>
        <Header as="h1" inverted className="headerStyle">
          {t("welcomeToTheApp")}
        </Header>
        <p className="subheaderStyle">{t("discoverAlchols")}</p>
        <Link to="/register">
          <Button size="huge" className="buttonStyle registerButton">
            {t("register")}
          </Button>
        </Link>
        <Link to="/login">
          <Button size="huge" className="buttonStyle loginButton">
            {t("login")}
          </Button>
        </Link>
      </Container>
    </Segment>
  );
}
