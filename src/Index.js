import React from 'react';
import { render } from 'react-dom';
import { Router, IndexRoute, Route, hashHistory } from 'react-router';
import App from './components/App';
import Compass from './components/Compass';
import About from './components/About';

window.React = React;

render(
  (<Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute path="/" component={Compass} />
      <Route path="/about" component={About} />
    </Route>
  </Router>), document.getElementById('content')
);