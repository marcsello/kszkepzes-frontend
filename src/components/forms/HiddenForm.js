import React, {Component} from 'react'
import { Segment } from 'semantic-ui-react';

class HiddenForm extends Component {
    render(){
        return (
            <div>
                <div style={{ marginBottom: 0, fontWeight: this.props.fontWeight }}>{this.props.label}</div>
                <Segment style={{ marginTop: 0 }}>
                <div>
                    {this.props.value}
                </div>
                </Segment>
            </div>
        )
    }
}

export default HiddenForm