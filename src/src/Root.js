import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import App from './components/App';
//import NoteForm from './components/NoteForm';

import Login from './Login/Login';
import Signup from './Login/Signup'

import { BrowserRouter,
  Route, Switch } from 'react-router-dom';

const store = configureStore();

export default class Root extends Component {
  state = {
    isModal: false
  }
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="root">
            {this.state.isModal && <Login /> /* how is isModal ever getting set to true? */ } 
            <Switch>
              <Route exact path="/" component={App}/>
              <Route path="/signup" component={Signup}/>
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}
