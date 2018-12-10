import React, {Component} from 'react';

class ChatBar extends Component {

    render() {
        return(
        <footer className="chatbar">
        <input 
            className="chatbar-username" 
            defaultValue={this.props.currentUser} 
            placeholder="Your Name (Optional)"
            onKeyUp={this.props.newName}/>
            
        <input 
            className="chatbar-message" 
            placeholder="Type a message and hit ENTER"
            onKeyUp={this.props.newMessage}
            // onChange={this.props.handleChange}
            // value={this.props.message}
        /> 
    </footer>
        )
    }
}

export default ChatBar;