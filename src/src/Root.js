import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import App from './App';
import NoteForm from './NoteForm';

import { BrowserRouter,
  Route, Switch } from 'react-router-dom';

const store = configureStore();

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="root">
            <Switch>
              <Route exact path="/" component={App}/>
              <Route exact path="/new" component={NoteForm}/>
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}
