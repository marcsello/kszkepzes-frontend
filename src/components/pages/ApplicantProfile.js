import React, { Component } from 'react';
import { Container, Header, Item, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getSelectedProfile } from '../../actions/statistics';

class ApplicantProfile extends Component {
  componentWillMount() {
    this.props.getSelectedProfile(this.props.match.params.id);
  }

  render() {
    const { full_name, nick, motivation_about, motivation_exercise, motivation_profession }
    = this.props.selectedProfile;
    return (
      <Container style={{ padding: '60px' }}>
        <Item>
          <Item.Content>
            <Container textAlign='center'>
              <Header as='h2'>{full_name}</Header>
              <Item.Meta>{nick}</Item.Meta>
            </Container>
            <Item.Description>
              <Container textAlign='justified' style={{ padding: '30px' }}>
                <Header as='h3'>Magamról, eddigi tevékenységem:</Header>
                <p>{motivation_about}</p>
                <Header as='h3'>Szakmai motiváció:</Header>
                <p>{motivation_profession}</p>
                <Header as='h3'>Feladatok megoldása:</Header>
                <p>{motivation_exercise}</p>
              </Container>
            </Item.Description>
          </Item.Content>
        </Item>
        <Container textAlign='center'>
          <Button
            color='green'
          >
          Jelentkezés elfogadása
          </Button>
          <Button
            color='red'
          >
          Jelentkezés elutasítása
          </Button>
        </Container>
      </Container>
    )
  }
}

const mapStateToProps = ({ trainees: { selectedProfile } }) => ({ selectedProfile });

export default connect(mapStateToProps, { getSelectedProfile })(ApplicantProfile);
