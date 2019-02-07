import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Menu,
  Container,
  Button,
  Segment,
  Visibility,
  Responsive,
} from 'semantic-ui-react';

const FixedMenu = ({ user, menuItems }) => (
  <Menu fixed='top' size='large' pointing>
    <Container>
      {menuItems.map((item, i) =>
        (user.permission >= item.permissionLevel ||
          (item.permissionLevel === 0)
          ?
            <Menu.Item key={i} as={Link} to={item.to}>{item.text}</Menu.Item>
            :
            null))}

      <Menu.Menu position='right'>
        <Menu.Item className='item'>
          {
            user.id ?
              <Button.Group>
                <Button primary as={Link} to='/profile'>Profilom</Button>
                <Button as='a' href='/api/v1/logout/'icon='sign out' />
              </Button.Group>
            :
              <Button as='a' href='/api/v1/login/authsch/' >Bejelentkezés</Button>
          }
        </Menu.Item>
      </Menu.Menu>
    </Container>
  </Menu>
);

class DesktopContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }
  componentWillMount() {
    this.props.getUserData();
  }

  hideFixedMenu() {
    this.setState({ visible: false });
  }

  showFixedMenu() {
    this.setState({ visible: true });
  }

  render() {
    const { visible } = this.state.visible;
    const { children, user, menuItems } = this.props;
    return (
      <Responsive minWidth={768}>
        {visible ? <FixedMenu user={this.props.user} /> : null}
        <Visibility
          onBottomPassed={() => this.showFixedMenu()}
          onBottomVisible={() => this.hideFixedMenu()}
          once={false}
        >
          <Segment inverted textAlign='center' vertical>
            <Container>
              <Menu inverted secondary stackable size='large'>

                {menuItems.map((item, i) =>
                  (this.props.user.permission >= item.permissionLevel ||
                    (item.permissionLevel === 0) ?
                      <Menu.Item key={i} as={Link} to={item.to}>{item.prefix}{item.text}</Menu.Item>
                      :
                    null))}

                <Menu.Item position='right'>
                  {
                    this.props.user.id ?
                      <Button.Group>
                        <Button inverted as={Link} to='/profile'>Profilom</Button>
                        <Button as='a' href='/api/v1/logout/' icon='sign out' />
                      </Button.Group>
                    :
                      <Button as='a' href='/api/v1/login/authsch/' inverted>Bejelentkezés</Button>
                  }
                </Menu.Item>

              </Menu>
            </Container>
          </Segment>
        </Visibility>
        {children}
      </Responsive>
    );
  }
}

export default DesktopContainer;
