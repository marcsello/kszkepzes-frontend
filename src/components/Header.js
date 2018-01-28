import React from "react";
import { NavLink } from "react-router-dom";
import {
  Menu,
  Container,
  Button,
  Segment,
  Visibility,
  Image
} from "semantic-ui-react";
import { Component } from "react";
import KSZKlogo from "./images/kszk_logo.svg";

const FixedMenu = () => (
  <Menu fixed="top" size="large" pointing>
    <Container>
      <Menu.Item as={NavLink} to="/home">
        Főoldal
      </Menu.Item>
      <Menu.Item as={NavLink} to="/circles">
        Köreink
      </Menu.Item>
      <Menu.Item as={NavLink} to="/trainers">
        Képzők
      </Menu.Item>
      <Menu.Item as={NavLink} to="/schedule">
        Ütemterv
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item className="item">
          <Button href="/api/v1/login/authsch/">Bejelentkezés</Button>
        </Menu.Item>
      </Menu.Menu>
    </Container>
  </Menu>
);

export default class Header extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ visible: false });
  showFixedMenu = () => this.setState({ visible: true });

  render() {
    const { visible } = this.state;

    return (
      <div>
        {visible ? <FixedMenu /> : null}
        <Visibility
          onBottomPassed={this.showFixedMenu}
          onBottomVisible={this.hideFixedMenu}
          once={false}
        >
          <Segment inverted textAlign="center" vertical>
            <Container>
              <Menu inverted secondary size="large">
                <Menu.Item as={NavLink} to="/home">
                  <Image
                    size="mini"
                    src={KSZKlogo}
                    style={{ marginRight: "1.5em" }}
                  />
                  Főoldal
                </Menu.Item>
                <Menu.Item as={NavLink} to="/circles">
                  Köreink
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
        </Visibility>
      </div>
    );
  }
}
