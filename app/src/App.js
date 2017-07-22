import React, { Component } from 'react';
import './App.css';
import io from 'socket.io-client';
let socket = io(`http://localhost:3011/`)

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      allMessages: [],
      message: ''
    }
    this.handleInput = this.handleInput.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
  }

  componentDidMount() {
    socket.on('from:server', res => {
      this.setState({
        allMessages: [...this.state.allMessages, res]
      })
    })
  }

  handleInput(e) {
    this.setState({
      message: e.target.value
    })
  }

  sendMessage() {
    socket.emit('to:server', {message: this.state.message})
    this.setState({message: ''})
  }

  render() {
    const messages = this.state.allMessages.map((e, i) => {
      return (
        <p key={i}>{ e.message }</p>
      )
    })
    return (
      <div className="App">
        <div className="App-header">
          <h1>Socket.io</h1>
        </div>
        <input onChange={ this.handleInput } value={ this.state.message }/>
        <button onClick={ this.sendMessage }>Send</button>
        {messages}
      </div>
    );
  }
}

