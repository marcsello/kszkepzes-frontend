import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Menu,
  Container,
  Button,
  Segment,
  Image,
  Grid,
  Popup,
  Icon,
  Responsive,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getUserData } from '../actions';
import KSZKlogo from './images/kszk_logo.svg';

const menuItems = [
  {
    text: 'Főoldal',
    to: '/home',
    prefix: <Image size='mini' src={KSZKlogo} style={{ marginRight: '1.5em' }} />,
    permissionLevel: 0,
  },
  {
    text: 'Hírek',
    to: '/news',
    prefix: '',
    permissionLevel: 0,
  },
  {
    text: 'Köreink',
    to: '/groups',
    prefix: '',
    permissionLevel: 0,
  },
  {
    text: 'Ütemterv',
    to: '/schedule',
    prefix: '',
    permissionLevel: 1,
  },
  {
    text: 'Statisztika',
    to: '/statistics',
    prefix: '',
    permissionLevel: 3,
  },
  {
    text: 'Jelentkezések',
    to: '/applications',
    prefix: '',
    permissionLevel: 3,
  },
  {
    text: 'Házi feladatok',
    to: '/homework',
    prefix: '',
    permissionLevel: 2,
  },
];

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }
  componentWillMount() {
    this.props.getUserData();
  }

  handleOpen = () => {
    this.setState({ isOpen: true });
  }

  handleClose = () => {
    this.setState({ isOpen: false });
  }

  render() {
    const { visible } = this.state;
    return (
      <div>
        <Responsive minWidth={600}>
          <Segment inverted textAlign='center' vertical>
            <Container>
            <Menu inverted secondary size='large'>
              {menuItems.map((item, i) =>
                (item.permissionLevel === 0 ?
                    <Menu.Item key={i} as={Link} to={item.to}>{item.prefix}{item.text}</Menu.Item>
                    : null
                ))
              }
              { this.props.user.id ?
              <Popup trigger={
                  <Menu.Item>
                    <Icon name='angle down' size='large' />
                  </Menu.Item>
                }
                position='center'
                flowing hoverable inverted>
                  <Menu inverted secondary size='large'>
                      {menuItems.map((item, i) =>
                        (this.props.user.permission >= item.permissionLevel
                          && item.permissionLevel > 0?
                            <Menu.Item
                              key={i} as={Link} to={item.to}>
                                {item.prefix}{item.text}
                            </Menu.Item>
                            : null
                        ))
                      }
                  </Menu>
              </Popup>
              : null
              }
              <Menu.Item position='right' width={5}>
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
        </Responsive>
        <Responsive maxWidth={599}>
          <Segment inverted textAlign='center' vertical>
            <Container>
            <Menu inverted secondary size='normal'>
              <Menu.Item as={Link} to={menuItems[0].to}>{menuItems[0].prefix}{menuItems[0].text}</Menu.Item>     
              <Popup trigger={
                  <Menu.Item onClick={this.handleClose} 
                  position='right'>
                    <Icon name='bars' size='large' />
                  </Menu.Item>
                }
                position='center'
                flowing hoverable inverted
                open={this.state.isOpen}
                onOpen={this.handleOpen}>
                  <Menu vertical inverted secondary size='normal'>
                    {menuItems.map((item, i) =>
                      ( (this.props.user.permission >= item.permissionLevel ||
                        item.permissionLevel === 0) && i>0?
                          <Menu.Item onClick={this.handleClose} 
                          key={i} as={Link} to={item.to}>
                            {item.prefix}{item.text}
                          </Menu.Item>
                          : null
                      ))
                    }
                    <Menu.Item>
                      {
                        this.props.user.id ?
                          <Button.Group>
                            <Button onClick={this.handleClose} inverted as={Link} to='/profile'>Profilom</Button>
                            <Button onClick={this.handleClose} as='a' href='/api/v1/logout/' icon='sign out' />
                          </Button.Group>
                        :
                          <Button onClick={this.handleClose} as='a' href='/api/v1/login/authsch/' inverted>Bejelentkezés</Button>
                      }
                    </Menu.Item>
                  </Menu>
              </Popup>
            </Menu>
            </Container>
          </Segment>
        </Responsive>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user,
});

export default connect(mapStateToProps, { getUserData })(Header);
