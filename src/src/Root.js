import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import App from './components/App';
//import NoteForm from './components/NoteForm';

import Navigation from './components/Navigation/Navigation';
import Login from './Login/Login';
import Signup from './Login/Signup'

import { BrowserRouter,
  Route, Switch } from 'react-router-dom';

const store = configureStore();

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="root">
            <Navigation />
            <Switch>
              <Route path="/" component={App}/>
              <Route path="/signin" component={Login}/>
              <Route path="/signup" component={Signup}/>
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}
