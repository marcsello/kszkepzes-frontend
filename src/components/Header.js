import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  Menu,
  Container,
  Button,
  Segment,
  Visibility,
  Image,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getUserData, logout } from '../actions';
import KSZKlogo from './images/kszk_logo.svg';

const FixedMenu = ({ user }) => (
  <Menu fixed='top' size='large' pointing>
    <Container>
      <Menu.Item as={NavLink} to='/home'>Főoldal</Menu.Item>
      <Menu.Item as={NavLink} to='/news'>Hírek</Menu.Item>
      <Menu.Item as={NavLink} to='/circles'>Köreink</Menu.Item>
      <Menu.Item as={NavLink} to='/trainers'>Képzők</Menu.Item>
      <Menu.Item as={NavLink} to='/schedule'>Ütemterv</Menu.Item>

      <Menu.Menu position='right'>
        <Menu.Item className='item'>
          {
            user.id ?
              <Button.Group>
                <Button primary as={Link} to='/profile'>Profilom</Button>
                <Button onClick={() => this.props.logout()} icon='sign out' />
              </Button.Group>
            :
              <Button href='/api/v1/login/authsch/'>Bejelentkezés</Button>
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
                <Menu.Item as={NavLink} to='/home'>
                  <Image
                    size='mini'
                    src={KSZKlogo}
                    style={{ marginRight: '1.5em' }}
                  />
                  Főoldal
                </Menu.Item>
                <Menu.Item as={NavLink} to='/news'>Hírek</Menu.Item>
                <Menu.Item as={NavLink} to='/circles'>Köreink</Menu.Item>
                <Menu.Item as={NavLink} to='/trainers'>Képzők</Menu.Item>
                <Menu.Item as={NavLink} to='/schedule'>Ütemterv</Menu.Item>

                <Menu.Item position='right'>
                  {
                    this.props.user.id ?
                      <Button.Group>
                        <Button inverted as={Link} to='/profile'>Profil</Button>
                        <Button onClick={() => this.props.logout()} icon='sign out' />
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

export default connect(mapStateToProps, { getUserData, logout })(Header);
