import React, { Component } from 'react';
import './App.css';
import io from 'socket.io-client';
let socket = io(`http://localhost:3011/`)

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
      userInput: ''
    }
    this.updateInput = this.updateInput.bind(this)
    this.sendTest = this.sendTest.bind(this)
  }

  componentDidMount() {
    socket.on('from:server', d => {
      this.setState({
        data: [...this.state.data, d]
      })
    })
  }

  updateInput(e) {
    this.setState({
      userInput: e.target.value
    })
  }

  sendTest() {
    socket.emit('to:server', {message: this.state.userInput})
    this.setState({userInput: ''})
  }

  render() {
    const messages = this.state.data.map((e, i) => {
      return (
        <p key={i}>{ e.message }</p>
      )
    })
    return (
      <div className="App">
        <div className="App-header">
          <h1>Socket.io</h1>
        </div>
        <input onChange={ this.updateInput } value={ this.state.userInput }/>
        <button onClick={ this.sendTest }>Send</button>
        {messages}
      </div>
    );
  }
}

