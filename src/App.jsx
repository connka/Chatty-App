import React, {Component} from 'react';
import Header from './Header.jsx'
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Notification from './Notification.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        {
          id: (Math.round(Math.random()*50)),
          username: "Bob", 
          content: "This is a message",
        }
      ]
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
      let data = event.data;
        let messages = this.state.messages.concat(data)
        this.setState({messages: messages})
    }
  }

  newMessage(message) {
    const newMessage = {id: 4, username: "Kate", content: message}
    const messages = this.state.messages.concat(newMessage);
    this.setState({messages: messages})
    if (this.socket.readyState === 1) {
      this.socket.send(JSON.stringify(message))
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
        currentUser={this.state.currentUser}
        newMessage={this.newMessage.bind(this)}/>
      </div>
      
    );
  }
}
export default App;
