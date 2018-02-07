import React, { Component } from 'react';
import {
  Menu,
  Container,
  Segment,
  Visibility,
  Responsive,
  Sidebar,
  Icon,
} from 'semantic-ui-react';
import { connect } from 'react-redux';

import { MobileMenu, DesktopMenu, FixedMenu } from './menus';
import { getUserData } from '../actions';


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
    const { visible } = this.state;
    const { children, user } = this.props;

    return (
      <Responsive {...Responsive.onlyComputer}>
        {visible ? <FixedMenu user={user} /> : null}
        <Visibility
          onBottomPassed={() => this.showFixedMenu()}
          onBottomVisible={() => this.hideFixedMenu()}
          once={false}
        >
          <DesktopMenu user={user} />
        </Visibility>
        {children}
      </Responsive>
    );
  }
}

class MobileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { sidebarOpened: false}
  }

  handleToggle () {
    this.setState({ sidebarOpened: !this.state.sidebarOpened });
  }

  render() {
    const { children, user } = this.props
    const { sidebarOpened } = this.state

    return (
      <Responsive {...Responsive.onlyMobile}>
        <Sidebar.Pushable>
          <MobileMenu user={user} sidebarOpened={sidebarOpened} />

          <Sidebar.Pusher dimmed={sidebarOpened} onClick={() => this.handleToggle()} style={{ minHeight: '100vh' }}>
            <Segment inverted textAlign='center' style={{ minHeight: 350, padding: '1em 0em' }} vertical>
              <Container>
                <Menu inverted pointing secondary size='large'>
                  <Menu.Item onClick={() => this.handleToggle()}>
                    <Icon name='sidebar' />
                  </Menu.Item>
                </Menu>
              </Container>
            </Segment>

            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Responsive>
    )
  }
}

const PageLayout = ({ children, user, getUserData }) => (
  <div>
    <DesktopContainer user={user} getUserData={getUserData}>{children}</DesktopContainer>
    <MobileContainer user={user} getUserData={getUserData}>{children}</MobileContainer>
  </div>
)

const mapStateToProps = ({ user }) => ({
  user,
});

export default connect(mapStateToProps, { getUserData })(PageLayout);
