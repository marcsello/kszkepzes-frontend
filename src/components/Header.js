import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Menu,
  Container,
  Button,
  Segment,
  Visibility,
  Image,
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
    permissionLevel: 1,
  },
]

const FixedMenu = ({ user }) => (
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

class Header extends Component {
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
    const { visible } = this.state;

    return (
      <div>
        {visible ? <FixedMenu user={this.props.user} /> : null}
        <Visibility
          onBottomPassed={() => this.showFixedMenu()}
          onBottomVisible={() => this.hideFixedMenu()}
          once={false}
        >
          <Segment inverted textAlign='center' vertical>
            <Container>
              <Menu inverted secondary size='large'>

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
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user,
});

export default connect(mapStateToProps, { getUserData })(Header);
