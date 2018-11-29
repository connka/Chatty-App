import React, {Component} from 'react';
import Header from './Header.jsx'
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Notification from './Notification.jsx';
import UUID from 'uuid'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      currentUser: {name: "Anonymous"},
      messages: []
    };
  }

newName = (event) => {
if (event.key === 'Enter') {
    if (event.target.value) {
        this.setState({
            currentUser: {name: event.target.value}
        })
    }
  }
}

handleChange = (event) => {
  this.setState({
    message: event.target.value
  });
}
newMessage = (event) => {
  if (event.key === "Enter") {
    const oldMessages = this.state.messages
    const newMessage = {
      id: UUID(), 
      username: this.state.currentUser.name, 
      content: event.target.value
    }
    this.setState({
      messages: [...oldMessages, newMessage],
      message: ""
    })
    if (this.socket.readyState === 1) {
      this.socket.send(JSON.stringify(newMessage))};
  }
}

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.onopen = () => {
      this.socket.send("Connected") ;
    }

    this.socket.onmessage = (event) => {
      console.log("Event received: ", event);
      let msg = JSON.parse(event.data);
      let messages = this.state.messages.concat(msg)
      this.setState({messages: messages})
    }
  }

  render() {
    return (
      <div>
        <Header />
        <MessageList 
        messages={this.state.messages}/>
        <Notification />
        <ChatBar 
          currentUser={this.state.currentUser.name}
          newMessage={this.newMessage.bind(this)}
          newName={this.newName}
          handleChange={this.handleChange}
          message={this.state.message}
        />
      </div>
      
    );
  }
}
