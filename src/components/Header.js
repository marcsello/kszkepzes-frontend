import React from "react";
import { NavLink } from "react-router-dom";
import { Menu, Container, Button, Segment } from "semantic-ui-react";

const Header = () => (
  <Segment inverted textAlign="center" vertical>
    <Container>
      <Menu inverted secondary size="large">
        <Menu.Item as={NavLink} to="/home">
          Főoldal
        </Menu.Item>
        <Menu.Item as={NavLink} to="/trainers">
          Képzők
        </Menu.Item>
        <Menu.Item as={NavLink} to="/schedule">
          Ütemterv
        </Menu.Item>
        <Menu.Item position="right">
          <Button as="a" href="/api/v1/login/authsch/" inverted>
            Bejelentkezés
          </Button>
        </Menu.Item>
      </Menu>
    </Container>
  </Segment>
);

export default Header;
