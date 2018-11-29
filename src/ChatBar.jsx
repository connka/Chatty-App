import React, {Component} from 'react';

class ChatBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:"",
            message:[],
        }
    }

    handleChange(event) {
            this.setState({message: event.target.value})
    }

    renderUser(message) {
        if (message.username === '') {
            message.username = 'Anonymous'
        }
    }

    submitNewMessage = (event) => {
        if (event.key === "Enter") {
            this.props.newMessage(this.state.message);
            this.setState({message: ""});
        }
    }

    render() {
        return(
        <footer className="chatbar">
        <input 
            className="chatbar-username" 
            defaultValue={this.props.currentUser} 
            placeholder="Your Name (Optional)"/>
        <input 
            className="chatbar-message" 
            placeholder="Type a message and hit ENTER"
            onChange={this.handleChange.bind(this)}
            onKeyUp={this.submitNewMessage}
        value={this.state.message}
        /> 
    </footer>
        )
    }
}

export default ChatBar;