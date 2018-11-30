import React, {Component} from 'react';
import Header from './Header.jsx';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import UUID from 'uuid';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    userCount: 0,
      id: "",
      currentUser: {name: "Anonymous"},
      messages: []
    };
  }

newName = (event) => {
if (event.key === 'Enter') {
        const newUser = {
          type: 'postNotification',
          content: (this.state.currentUser.name + ' has changed their name to ' + event.target.value)
      }
      this.socket.send(JSON.stringify(newUser));
      this.setState({
        currentUser: {name: event.target.value}, 
        messages: this.state.messages.concat(newUser)
    })
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
      type: 'postMessage',
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

    this.socket.onmessage = (event) => {
      console.log("Event received: ", event);
      let data = JSON.parse(event.data);
      let messages = this.state.messages.concat(data)
      if (data.type === "userCount") {
        this.setState({userCount: data.count})
      }
      if (data.type === "postMessage") {
        this.setState({messages: messages})
      }
      if (data.type === "postNotification") {
        this.setState({notification: notification})
      }
    }
  }

  render() {
    return (
      <div>
        <Header 
        userCount={this.state.userCount} />
        <MessageList 
        messages={this.state.messages}/>
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

export default App;
