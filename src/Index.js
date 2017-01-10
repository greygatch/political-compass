import React from 'react';
import { render } from 'react-dom';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import App from './components/App';
import Quiz from './components/Quiz';
import About from './components/About';

window.React = React;

render(
  (<Router history={browserHistory}>
    <Route path="/*" component={App}>
      <IndexRoute component={Quiz} />
      <Route path="/about" component={About} />
    </Route>
  </Router>), document.getElementById('content')
);
