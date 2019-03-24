import React, { Component } from 'react';
import initStore from './store';
import { Provider } from 'react-redux';
import SafeBoxWrapper from '../views/components/safe-box-wrapper/SafeBoxWrapper';

const store = initStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <SafeBoxWrapper />
      </Provider>
    );
  }
}

export default App;
