import { Menu, Dropdown, Icon } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
    return (
        <Menu inverted className="navbar" stackable>
            <Menu.Item className="menu-item">
            </Menu.Item>
            <Menu.Item as={NavLink} to="/alcohols" name="Alcohols" className="menu-item" />
            <Menu.Item as={NavLink} to="/reviews" name="Reviews" className="menu-item" />
            <Menu.Item name="Services" className="menu-item" />
            <Menu.Item name="About me" className="menu-item" />

            <Menu.Menu position="right">
                <Dropdown item text="Account">
                    <Dropdown.Menu>
                        <Dropdown.Item>Profile</Dropdown.Item>
                        <Dropdown.Item>Settings</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item>Log Out</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Menu>
        </Menu>
    );
}
