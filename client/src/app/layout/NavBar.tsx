import { Menu, Dropdown, Icon } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <Menu inverted className="navbar" stackable>
      <Menu.Item className="menu-item">
        <Dropdown text={t("language")} simple>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => changeLanguage("en")}>
              {t("english")}
            </Dropdown.Item>
            <Dropdown.Item onClick={() => changeLanguage("es")}>
              {t("spanish")}
            </Dropdown.Item>
            <Dropdown.Item onClick={() => changeLanguage("fr")}>
              {t("french")}
            </Dropdown.Item>
            <Dropdown.Item onClick={() => changeLanguage("de")}>
              {t("german")}
            </Dropdown.Item>
            <Dropdown.Item onClick={() => changeLanguage("pl")}>
              {t("polish")}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
      <Menu.Item
        as={NavLink}
        to="/alcohols"
        name={t("alcohols")}
        className="menu-item"
      />
      <Menu.Item
        as={NavLink}
        to="/reviews"
        name={t("reviews")}
        className="menu-item"
      />

      {/* <Menu.Menu position="right">
        <Dropdown item text="Account">
          <Dropdown.Menu>
            <Dropdown.Item>Profile</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Log Out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu> */}
    </Menu>
  );
}
