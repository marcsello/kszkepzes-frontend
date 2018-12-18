import React, { Component } from 'react';
import { Container, Header, Segment, Divider,
        List, Modal, Button, Image, Form, Input, TextArea, Checkbox, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { getNews, } from '../../actions';
import { postNews, writeNews } from '../../actions/news.js'

class News extends Component {

  componentWillMount() {
    this.props.getNews();
  }


  render_add_news(){
    const { title, text } = this.props.newNews;
    const author = this.props.user.id;
    return (
    <Modal trigger={<Button >Add news</Button>}>
    <Modal.Header>Új hír:</Modal.Header>
    <Modal.Content>
    <Form>
      <Form.Field
        control={Input}
        label='Title'
        name='title'
        onChange={e => this.props.writeNews(e)}
        value={title}
        placeholder='Title' />
      <Form.Field
        control={TextArea}
        label='Text'
        name='text'
        onChange={e => this.props.writeNews(e)}
        value={text}
        placeholder='Tell us what you want...' />
    </Form>
    </Modal.Content>
    <Modal.Actions>
       <Button inverted color='red' >
         <Icon name='remove' /> Cancel
       </Button>
       <Button
         inverted color='green'
         onClick={() => this.props.postNews({title, text, author})}>
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


const mapStateToProps = ({ news, newNews, user }) => ({ news, newNews, user });

export default connect(mapStateToProps, { getNews, postNews, writeNews,  })(News);
