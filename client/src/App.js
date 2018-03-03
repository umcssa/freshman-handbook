import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import FreshmanHandbook from './FreshmanHandbook';

class App extends Component {
  render() {
    return (
        <Router>
            <div>
                <Route strict path="/freshman-handbook/" component={FreshmanHandbook} />
            </div>
        </Router>
    );
  }
}

export default App;
