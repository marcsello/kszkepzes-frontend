import React, { Component } from 'react'
  import { Container, Segment, Item, Header, Card, Label, Icon, Responsive, Image } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { getMentors } from '../../actions/mentors'

class Mentors extends Component {
  UNSAFE_componentWillMount() {
    this.props.getMentors();
  }

  renderMentorsNormal() {
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

  renderMentorsMobile() {
    return this.props.mentors.map( (item, index) => (
      // <Card style={{maxWidth: '100%', minWidth: '100%'}}>
      //   <Card.Content style={{padding: '0'}}>
      //       <Item.Group>
      //           <Item>
      //             <Item.Image size='medium' src={item.image} />
      //             <Item.Content style={{padding: '1rem'}}>
      //               <Item.Header>{item.name}</Item.Header>
      //               <Item.Extra>
      //                 <Label><Icon name='mail'></Icon>{item.email}</Label>
      //               </Item.Extra>
      //             </Item.Content>
      //           </Item>
      //           <Item>
      //             <Item.Content style={{padding: '1rem'}}>
      //                 <Item.Description>
      //                     <p>{item.text}</p>
      //                 </Item.Description>
      //                 <Item.Extra>
      //                   <Label><Icon name='mail'></Icon>{item.email}</Label>
      //                 </Item.Extra>
      //             </Item.Content>
      //           </Item>
      //       </Item.Group>
      //   </Card.Content>
      // </Card>
      <Card key={item.id}>
        <Image src={item.image} wrapped ui={false}/>
        <Card.Content>
          <Card.Header>{item.name}</Card.Header>
          <Card.Description>
            {item.text}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Label><Icon name='mail'></Icon>{item.email}</Label>
        </Card.Content>
      </Card>
    ));
  }

  render() {
    return (
      <div>
        <Responsive minWidth={768}>
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
            {this.renderMentorsNormal()}
          </Container>
        </Responsive>
        <Responsive minWidth={551} maxWidth={767}>
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
            <Card.Group itemsPerRow={2}>
              {this.renderMentorsMobile()}
            </Card.Group>
          </Container>
        </Responsive>

        <Responsive maxWidth={550}>
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
            <Card.Group itemsPerRow={1}>
              {this.renderMentorsMobile()}
            </Card.Group>
          </Container>
        </Responsive>
      </div>
    );
  }
}

const mapStateToProps = ({ mentors, user }) => ({ mentors, user });

export default connect(mapStateToProps, { getMentors })(Mentors);
