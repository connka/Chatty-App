import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
    render() {
        return(
        <main> {this.props.messages.map((message) => {
            return (<Message 
                username={message.username} 
                content={message.content}/>) 
        })
        } 
        </main>
        )   
    }
    
}

export default MessageList;