import React, { Component } from 'react';
import { Container, Segment, Item, Button, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import moment from 'moment';

import AddNewsForm from '../forms/AddNewsForm'
import EditNewsForm from '../forms/EditNewsForm'

import ConfirmModal from '../forms/ConfirmModal'

import { getNews, deleteNews, setSelectedNews } from '../../actions/news';

import './News.css';

class News extends Component {
  UNSAFE_componentWillMount() {
    this.props.getNews();
  }
  renderNews() {
    return this.props.news.map(item => (
      <Item key={item.id}>
        <Item.Content>
          <Container text textAlign='left'>
            <Item.Header
              style={{ fontSize: '2em', width: '100%' }}
            >
              <Grid>
                <Grid.Column
                  floated='left'
                  width={this.props.user.role === 'Staff' ? 12 : 16}
                >
                  {item.title}
                </Grid.Column>
                { this.props.user.role === 'Staff' ?
                  <Grid.Column floated='right' width={4}>
                    <EditNewsForm
                      onClick={() => this.props.setSelectedNews(item)}
                    />
                    <ConfirmModal
                      text={`törölni akarod a következő hírt: ${item.title}`}
                      button={
                        <Button
                          compact
                          color='red'
                          size='mini'
                        >
                        Törlés
                        </Button>
                         }
                      onAccept={() => this.props.deleteNews(item)}
                    />
                  </Grid.Column>
                  : null }
              </Grid>
            </Item.Header>
            <Item.Meta style={{ fontSize: '0.75em', fontStyle: 'italic' }}>Közzétéve: {moment(item.created_at).format('LLLL')}</Item.Meta>
            <Item.Description className='news-text' style={{ fontSize: '1em' }}>
              {this.renderMultiLine(item.text)}
            </Item.Description>
        </Container>
        </Item.Content>
      </Item>
    ));

  // renderNews() {
  //   return this.props.news.map(item => (
  //     <Item key={item.id}>
  //       <Item.Content>
  //         <Item.Header
  //           style={{ fontSize: '2em', width: '100%' }}
  //         >
  //           <Grid>
  //             <Grid.Column width={12}>
  //               {item.title}
  //             </Grid.Column>
  //             { this.props.user.role === 'Staff' ?
  //             <Grid.Column floated='right' width={4}>
  //               <EditNewsForm
  //                 onClick={() => {
  //                   this.props.setSelectedNews(item)
  //                 }}
  //               />
  //               <Button
  //                 compact
  //                 color='red'
  //                 size='mini'
  //                 onClick={() => this.props.deleteNews(item)}
  //               >
  //                 Delete
  //               </Button>
  //             </Grid.Column>
  //             : null }
  //           </Grid>
  //         </Item.Header>
  //         <Item.Description className='news-text' style={{ fontSize: '1.33em' }}>
  //           {this.renderMultiLine(item.text)}
  //         </Item.Description>
  //         <Item.Extra>
  //           <Grid>
  //             <Grid.Row className='news-extra'>
  //               <Grid.Column floated='left' width={10}>
  //                 <p> Készült: {moment(item.created_at).format('LLLL')} </p>
  //                 <p> Szerkesztve: {moment(item.updated_at).format('LLLL')}</p>
  //               </Grid.Column>
  //               <Grid.Column floated='right' width={5}>
  //                 <p> Írta: <strong>{item.author}</strong></p>
  //                 {/* TODO get the edited by name */}
  //                 <p> Szerkesztette: {item.last_update_by}</p>
  //               </Grid.Column>
  //             </Grid.Row>
  //           </Grid>
  //         </Item.Extra>
  //       </Item.Content>
  //     </Item>
  //   ));
  }

  renderMultiLine(text) {
    const strings = text.split('\n');
    return strings.map(string => <p key={Math.random()}>{string}</p>);
  }

  render() {
    return (
      <div>
        <Segment vertical>
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