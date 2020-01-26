import React, {Component} from 'react'
import { Segment, Header, Divider } from 'semantic-ui-react';

class HiddenForm extends Component {
    render(){
        return (
            <Segment style={{ marginTop: 0 }}>
                <Divider style={{ fontSize: '2em'}} horizontal><Header as='h3' style={{ fontSize: '1.2em'}}>{this.props.label}</Header></Divider>
                <div className='paragraph' dangerouslySetInnerHTML={{__html: this.props.value}}>
                </div>
            </Segment>
        )
    }
}

export default HiddenForm