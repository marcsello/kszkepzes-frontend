import React, { Component } from 'react';
import { Container, Segment, Item, Button, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import moment from 'moment';

import AddNewsForm from '../forms/AddNewsForm';
import EditNewsForm from '../forms/EditNewsForm';

import { getNews, deleteNews, setSelectedNews } from '../../actions/news';

import './News.css';

class News extends Component {
  componentWillMount() {
    this.props.getNews();
  }

  renderNews() {
    return this.props.news.map(item => (
      <Item key={item.id}>
        <Item.Content>
          <Item.Header
            as='h3'
            style={{ fontSize: '2em' }}
          >
            {item.title}
            <EditNewsForm
              floated='right'
              onClick={() => this.props.setSelectedNews(item)}
            />
            <Button
              color='red'
              size='mini'
              floated='right'
              onClick={() => this.props.deleteNews(item)}
            >
            Delete
            </Button>
          </Item.Header>
          <Item.Description style={{ fontSize: '1.33em' }}>
            <pre>{item.text}</pre>
          </Item.Description>
          <Item.Extra>
            <Grid>
              <Grid.Row className='news-extra'>
                <Grid.Column floated='left' width={10}>
                  <p> Készült: {moment(item.created_at).format('LLLL')} </p>
                  {/* TODO get the time when was edited */}
                  <p> Szerkesztve: {moment(item.updated_at).format('LLLL')}</p>
                </Grid.Column>
                <Grid.Column floated='right' width={5}>
                  <p> Írta: <strong>{item.author_name}</strong></p>
                  {/* TODO get the edited by name */}
                  <p> Szerkesztette: {item.author_name}</p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Item.Extra>
        </Item.Content>
      </Item>
    ));
  }

  render() {
    return (
      <div>

        <Segment style={{ padding: '3em 3em' }} vertical>
          {/*  { this.props.user.is_superuser ? <AddNewsForm /> : ''} */}
          <AddNewsForm />
          <Container text textAlign='center'>
            <Item.Group divided>
              {this.renderNews()}
            </Item.Group>
          </Container>
        </Segment>
      </div>
    );
  }
}


const mapStateToProps = ({ news, user }) => ({ news, user });

export default connect(mapStateToProps, { getNews, deleteNews, setSelectedNews })(News);
