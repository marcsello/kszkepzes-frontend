import React, { Component } from 'react';
import { Container, Segment, Form, Dropdown, Divider, Card, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { textChange, submitRegistration, groupChange } from '../../actions';

const options = [
  { key: 'DT', text: 'DevTeam', value: 'DT' },
  { key: 'NET', text: 'NeTeam', value: 'NET' },
  { key: 'ST', text: 'SecurITeam', value: 'ST' },
  { key: 'SYS', text: 'SysAdmin', value: 'SYS' },
  { key: 'HAT', text: 'Hallgatói Tudásbázis', value: 'HAT' },
];

class Profile extends Component {
  componentWillMount() {
    if (!this.props.id) {
      this.props.history.push('/home');
    }
  }

  render() {
    const {
      nick, groups, motivation, signed, id,
    } = this.props;
    return (
      <Container
        style={{
          marginBottom: '0.5em',
          marginTop: '0.5em',
        }}
      >
        <Divider horizontal>
          <Header as='h2' content='Profil (Jelentkezés)' />
        </Divider>
        <Segment textAlign='center'>
          <Form>
            <Divider horizontal>Becenév</Divider>
            <Form.Input
              fluid
              name='nick'
              onChange={e => this.props.textChange(e)}
              placeholder='Becenév'
              value={nick}
            />

            <Divider horizontal>Motivációs levél</Divider>
            <Form.TextArea
              rows={10}
              name='motivation'
              onChange={e => this.props.textChange(e)}
              placeholder='Miért szeretnék jelentkezni...'
              value={motivation}
            />

            <Divider horizontal>Érdekelt Körök</Divider>
            <Dropdown
              fluid
              multiple
              selection
              placeholder='DevTeam, ...'
              onChange={(_, v) => this.props.groupChange(v.value)}
              options={options}
              defaultValue={groups}
            />
            <br />
            <Form.Checkbox
              name='signed'
              label='Szeretnék jelentkezni a KSZK-ba'
              onChange={(_, v) =>
                this.props.textChange({ target: { name: v.name, value: v.checked } })
              }
              checked={signed}
            />
            <Form.Button
              onClick={() => this.props.submitRegistration({
                nick, motivation, signed, groups, id,
              })}
            >
              Mentés
            </Form.Button>
          </Form>
        </Segment>
      </Container>
    );
  }
}

const mapStateToProps = ({
  user: {
    nick, groups, motivation, signed, id,
  },
}) => ({
  nick,
  groups,
  motivation,
  signed,
  id,
});

export default connect(mapStateToProps, { textChange, submitRegistration, groupChange })(Profile);
