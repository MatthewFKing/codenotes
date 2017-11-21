import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navigation extends Component {
  render() {
    return (
      <nav className="nav justify-content-center">
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/new">New Note</Link>
        <Link className="nav-link" to="/">Profile</Link>
        <button className="btn btn-primary">Sign in</button>
      </nav>
    );
  };
}
