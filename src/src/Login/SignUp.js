import React, { Component } from 'react';

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


render() {
  return (
    <div className="login-form">
      <form>
        <input
          type="text"
          placeholder="Enter your Name">
        </input>
        <input
          type="email"
          placeholder="Enter your Email">
        </input>
        <input
          type="password"
          placeholder="Enter your password">
        </input>
        <input
          type="password"
          placeholder="Confirm your Password">
        </input>
        <button>Signup</button>
      </form>
    </div>
  )
}

}