import React, { Component } from 'react';
import { Container, Header, Segment, Divider,
        List, Modal, Button, Image, Form, Input, TextArea, Checkbox, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { getNews } from '../../actions';

class News extends Component {

  componentWillMount() {
    this.props.getNews();
  }


  render_add_news(){
    return (
    <Modal trigger={<Button >Add news</Button>}>
    <Modal.Header>Select a Photo</Modal.Header>
    <Modal.Content image>
    <Form>
      <Form.Field control={Input} label='Title' placeholder='Title' />
      <Form.Field control={TextArea} label='Text' placeholder='Tell us what you wanr...' />
      <Form.Field control={Checkbox} label='I agree to the Terms and Conditions' />
    </Form>
    </Modal.Content>
    <Modal.Actions>
       <Button basic color='red' >
         <Icon name='remove' /> Cancel
       </Button>
       <Button color='green'>
         <Icon name='checkmark' /> Add
       </Button>
     </Modal.Actions>
  </Modal>

);
  }

  render_news() {
    const news = this.props.news;

    return news.map( (item, index) => (
      <div key={index} id={index}>
        { index > 0 ? <Divider /> : ''}
        <Header as='h3' style={{ fontSize: '2em' }}>{item.title}</Header>
        <p style={{ fontSize: '1.33em' }}>{item.text}</p>
      </div>
    ));

  }

  render_sidebar() {
    const news = this.props.news;

    return news.map( (item, index) => (
        <List.Item as='a' href={`#${index}`}>
          <List.Icon name='align justify' verticalAlign={"middle"}/>
          <List.Content>
            <List.Header>
              {item.title}
            </List.Header>
          </List.Content>
        </List.Item>
    ));

  }

  render() {

    return (
      <div>
      {/*  <Segment inverted textAlign='center' vertical>
          <Container>
            <Header
              as='h1'
              content='Hírek'
              inverted
              style={{
                fontSize: '2em',
                fontWeight: 'normal',
                marginBottom: 0,
                marginTop: '0.2em',
                padding: 0
              }}
            />
          </Container>
        </Segment>
        */}

        <Segment floated={'left'} style={{ padding: '3em 3em' }} vertical>
          {this.render_add_news()}
          <Container text textAlign = {'center'}>
            {this.render_news()}
          </Container>
        </Segment>
        <Segment floated={'right'} style={{ padding: '1em 1em' }} vertical>
          <List size={'big'} link divided>
              {this.render_sidebar()}
          </List>
        </Segment>
      </div>
    );
  }
}


const mapStateToProps = ({ news }) => ({ news });

export default connect(mapStateToProps, { getNews })(News);
