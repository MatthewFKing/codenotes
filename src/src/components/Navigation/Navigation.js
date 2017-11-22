import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navigation extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">CodeNotes</Link>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/new">New Note</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">Profile</Link>
          </li>
        </ul>
        <button className="btn btn-primary">Sign in</button>
      </nav>
    );
  };
}
