import React, { Component } from 'react';
import { Container, Header, Segment, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { getNews } from '../../actions';

class News extends Component {

  componentWillMount() {
    this.props.getNews();
  }

  render_news() {
    const news = this.props.news;
    console.log(news);

    return news.map( (item, index) => (
      <div key={index}>
        { index > 0 ? <Divider /> : ''}
        <Header as='h3' style={{ fontSize: '2em' }}>{item.title}</Header>
        <p style={{ fontSize: '1.33em' }}>{item.text}</p>
      </div>
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
          <Container text>
            {this.render_news()}
          </Container>
        </Segment>
      </div>
    );
  }
}


const mapStateToProps = ({ news }) => ({ news });

export default connect(mapStateToProps, { getNews })(News);
