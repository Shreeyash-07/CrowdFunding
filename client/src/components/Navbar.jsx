import React from "react";
import { Menu, Header } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <Menu
      style={{
        marginTop: "10px",
        padding: "8px",
        fontSize: "15px",
        fontFamily: "poppins",
      }}
    >
      <NavLink to="/">
        <Menu.Item>CrowdFund</Menu.Item>
      </NavLink>

      <Menu.Menu position="right">
        <NavLink to="/">
          <Menu.Item>Campaigns</Menu.Item>
        </NavLink>
        <NavLink to="/campaign/new">
          <Menu.Item>+</Menu.Item>
        </NavLink>
      </Menu.Menu>
    </Menu>
  );
};

export default Navbar;
