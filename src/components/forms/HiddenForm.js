import React, {Component} from 'react'
import { Segment } from 'semantic-ui-react';

class HiddenForm extends Component {
    render(){
        return (
            <div>
                <p style={{ marginBottom: 0, fontWeight: this.props.fontWeight }}>{this.props.label}</p>
                <Segment style={{ marginTop: 0 }}>
                <p>
                    {this.props.value}
                </p>
                </Segment>
            </div>
        )
    }
}

export default HiddenForm