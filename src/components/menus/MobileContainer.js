import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Menu,
  Container,
  Button,
  Segment,
  Image,
  Responsive,
  Sidebar,
  Icon,
} from 'semantic-ui-react';
import KSZKlogo from '../images/kszk_logo.svg';


class MobileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarVisible: false,
    };
  }
  componentWillMount() {
    this.props.getUserData();
  }

  render() {
    const visible = this.state.sidebarVisible;
    const { children, user, menuItems } = this.props;
    return(
      <Responsive maxWidth={767}>
        <Segment inverted textAlign='center' vertical>
          <Container>
          <Menu inverted secondary>
            <Menu.Item onClick={visible ? this.handleHideClick : this.handleShowClick}><Icon name='sidebar'/></Menu.Item>
            <Image size='mini' src={KSZKlogo} style={{ marginRight: '1.5em' }} />
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
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation='overlay'
            icon='labeled'
            inverted
            vertical
            visible={visible}
            width='thin'
          >
          {menuItems.map((item, i) =>
            (this.props.user.permission >= item.permissionLevel ||
              (item.permissionLevel === 0) ?
                <Menu.Item key={i} as={Link} to={item.to} onClick={this.handleSidebarHide}>{item.text}</Menu.Item>
                :
              null))}
          </Sidebar>
            <Sidebar.Pusher onClick={this.handleSidebarHide}>
            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
    </Responsive>);
  }

  handleShowClick = () => this.setState({ sidebarVisible: true })
  handleHideClick = () => this.setState({ sidebarVisible: false })
  handleSidebarHide = () => this.setState({ sidebarVisible: false })
}

export default MobileContainer;
