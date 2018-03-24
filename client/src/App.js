import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import FreshmanHandbook from './FreshmanHandbook';
import {Provider} from 'react-redux';
import store from './Store';

import 'antd/dist/antd.css';

class App extends Component {
  render() {
    return (
        <Provider store={store}>
        <Router>
            <div>
                <Route strict path="/freshman-handbook/" component={FreshmanHandbook} />
            </div>
        </Router>
        </Provider>
    );
  }
}

export default App;
