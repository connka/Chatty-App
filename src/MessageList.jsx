import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

class MessageList extends Component {
    render() {
        return(
        <main> {this.props.messages.map((message) => {
            switch(message.type) {
                case "incomingMessage":
                case "postMessage":
                return (
                    <Message
                        key={message.id}
                        username={message.username}
                        content={message.content}
                    />)
                case "incomingNotification":
                case "postNotification":
                return (
                    <Notification
                        content={message.content}
                    />)

                    default:
                    throw new Error("Unknown event type " + message.type);
                }
        })
        } 
        </main>
        )   
    }
    
}

export default MessageList;