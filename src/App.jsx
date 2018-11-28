import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: name,
      messages: [
        {
          id: (Math.round(Math.random()*50)),
          username: "Bob", 
          content: "This is a message",
        }
      ]
  }
}

handleNewMessage = (msg) => {
  console.log('This is a Message', msg)
  const newMessage = {id: 7, username: "Allison", content: msg};
  const messages = this.state.messages.concat(newMessage)
  this.setState({messages: messages})
}

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }
  
  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser} handleNewMessage={this.handleNewMessage} />
      </div>
      
    );
  }
}
export default App;
