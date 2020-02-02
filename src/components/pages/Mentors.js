import React, { Component } from 'react'
  import { Container, Segment, Item, Divider, Header, Image, Card, Label, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { getMentors } from '../../actions/mentors'

class Mentors extends Component {
  UNSAFE_componentWillMount() {
    this.props.getMentors();
  }

  renderMentors() {
    return this.props.mentors.map( (item, index) => (
      <Card style={{maxWidth: '100%', minWidth: '100%'}}>
        <Card.Content style={{padding: '0'}}>
            <Item.Group>
                <Item>
                    {index%2 === 0 ?
                      <Item.Image size='medium' src={item.image} /> : null
                    }
                    <Item.Content style={{padding: '1rem'}}>
                        <Item.Header>{item.name}</Item.Header>
                        <Item.Description>
                            <p>{item.text}</p>
                        </Item.Description>
                        <Item.Extra>
                          <Label><Icon name='mail'></Icon>{item.email}</Label>
                        </Item.Extra>
                    </Item.Content>
                    {index%2 === 1 ?
                      <Item.Image size='medium' src={item.image} /> : null
                    }
                </Item>
            </Item.Group>
        </Card.Content>
      </Card>
    ));
  }

  renderMultiLine(text) {
    const strings = text.split('\n');
    return strings.map(string => <p key={Math.random()}>{string}</p>);
  }

  render() {
    return (
      <div>
        <Segment inverted textAlign='center' vertical>
          <Container>
            <Header
              as='h1'
              content='Mentorok'
              inverted
              style={{
                fontSize: '3em',
                fontWeight: 'normal',
                marginBottom: 0,
                marginTop: '0.5em',
              }}
            />
          </Container>
        </Segment>
        <Container style={{paddingTop: '2em', paddingBottom: '5em'}}> 
          {this.renderMentors()}
        </Container>
      </div>
    );
  }
}

const mapStateToProps = ({ mentors, user }) => ({ mentors, user });

export default connect(mapStateToProps, { getMentors })(Mentors);
