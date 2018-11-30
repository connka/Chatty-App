import React, {Component} from 'react';

class Header extends Component {
    render() {
        return (
        <nav className="navbar">
        <a href="/" className="navbar-brand">Prism Chat</a>
        <span className= "navbar-counter">{this.props.userCount} User(s) Online</span>
        </nav>
        )
    }
}

export default Header