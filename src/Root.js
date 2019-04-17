import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from "react-router-dom";
import store from 'store'
import App from 'component/App'

class Root extends Component {

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    )
  }
}

export default Root
