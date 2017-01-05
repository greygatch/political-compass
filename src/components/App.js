import React from 'react';
import { Link } from 'react-router';
import { version } from '../../package.json';

const App = ({ children }) => (
  <div>
    <header>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </header>
    <section>
      {children}
    </section>
  </div>
);

App.propTypes = { children: React.PropTypes.object };

export default App;
