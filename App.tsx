import React from 'react';
import { Provider } from "react-redux";
import { Navigator } from './Navigator';
import { store } from './store';

export default class App extends React.Component {
  // TODO: go ahead and fetch the historic weights here.  No need to wait on the response.
  render() {
    return (
      <Provider store={store}>
        <Navigator/>
      </Provider>
    );
  }
}
