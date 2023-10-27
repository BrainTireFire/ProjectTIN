import { useTranslation } from "react-i18next";
import { Container, Header, Icon } from "semantic-ui-react";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <Container text textAlign="center" style={{ marginTop: "2rem" }}>
      <Header as="h1" icon textAlign="center">
        <Icon name="frown" />
        {t("pageNotFound")}
        <Header.Subheader>{t("requestedPageWasNotFound")}</Header.Subheader>
      </Header>
    </Container>
  );
}
