import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Container, Button, Icon, Header, Segment } from "semantic-ui-react";

export default function AgeVerificationPage() {
  const { t } = useTranslation();

  return (
    <Segment
      inverted
      textAlign="center"
      vertical
      className="masthead segmentStyle"
    >
      <Container
        text
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          marginButton: "200px",
        }}
      >
        <Header as="h1" inverted className="headerStyle">
          {t("areHave18")}
        </Header>
        <p className="subheaderStyle">{t("confirmAge")}</p>
        <Link to="/home">
          <Button size="huge" className="buttonStyle">
            {t("iHave18")}
            <Icon name="right arrow" />
          </Button>
        </Link>
      </Container>
    </Segment>
  );
}
