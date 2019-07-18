import React, { Component } from 'react';
import { Switch, Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Page from './components/layout/Page/Page';
import BlogsPage from './components/pages/BlogsPage/BlogsPage';
import './scss/App.scss';
import Home from './components/pages/Home/Home';

class App extends Component {
  constructor(props) {
    super(props);
    this.history = createBrowserHistory();
  }

  render() {
    return (
      <Router history={this.history}>
        <Page>
          <Switch>
            <Route exact strict path="/" component={Home} />
            <Route exact strict path="/blog" component={BlogsPage} />
            <Route exact strict path="/blog/:slug" component={BlogsPage} />
          </Switch>
        </Page>
      </Router>
    );
  }
}

export default App;
