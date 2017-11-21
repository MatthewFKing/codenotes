import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import App from './components/App';
import NoteForm from './components/NoteForm';
import Navigation from './components/Navigation/Navigation';

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
              <Route exact path="/" component={App}/>
              <Route exact path="/new" component={NoteForm}/>
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}
