import React, { Component } from 'react';
import { Container, Header, Segment, Item } from 'semantic-ui-react';
import { connect } from 'react-redux';
import moment from 'moment';

import { getNews } from '../../actions';

class News extends Component {

  componentWillMount() {
    this.props.getNews();
  }

  render_news() {
    const news = this.props.news;

    return news.map( (item, index) => (
      <Item key={index}>
        <Item.Content>
          <Item.Header as='a'>{item.title}</Item.Header>
          <Item.Meta>{moment(item.created_at).format('LLLL')}</Item.Meta>
          <Item.Description>{item.text}</Item.Description>
          {/* TODO: Get author name from server.
            <Item.Extra>{item.author}</Item.Extra> */}
        </Item.Content>
      </Item>
    ));

  }

  render() {
    return (
      <div>
        <Segment inverted textAlign='center' vertical>
          <Container>
            <Header
              as='h1'
              content='Hírek'
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

        <Segment style={{ padding: '8em 0em' }} vertical>
          <Container text textAlign='justified'>
            <Item.Group>{this.render_news()}</Item.Group>
          </Container>
        </Segment>
      </div>
    );
  }
}


const mapStateToProps = ({ news }) => ({ news });

export default connect(mapStateToProps, { getNews })(News);
