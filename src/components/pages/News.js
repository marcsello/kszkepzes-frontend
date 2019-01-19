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
            style={{ fontSize: '2em', width: '100%' }}
          >
            <Grid>
              <Grid.Column floated='center' width={12}>
                {item.title}
              </Grid.Column>
              { this.props.user.role === 'Staff' ?
              <Grid.Column floated='right' width={4}>
                <EditNewsForm
                  onClick={() => this.props.setSelectedNews(item)}
                />
                <Button
                  compact
                  color='red'
                  size='mini'
                  onClick={() => this.props.deleteNews(item)}
                >
                  Delete
                </Button>
              </Grid.Column>
              : null }
            </Grid>
          </Item.Header>
          <Item.Description className='news-text' style={{ fontSize: '1.33em' }}>
            {this.renderMultiLine(item.text)}
          </Item.Description>
          <Item.Extra>
            <Grid>
              <Grid.Row className='news-extra'>
                <Grid.Column floated='left' width={10}>
                  <p> Készült: {moment(item.created_at).format('LLLL')} </p>
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

  renderMultiLine(text) {
    const strings = text.split('\n');
    return strings.map(string => <p>{string}</p>);
  }

  render() {
    return (
      <div>

        <Segment style={{ padding: '3em 3em' }} vertical>
          {/*  { this.props.user.is_superuser ? <AddNewsForm /> : ''} */}
          <Container text textAlign='center'>
            {this.props.user.role === 'Staff' ?
              <AddNewsForm />
              :
              null}
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
