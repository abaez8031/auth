import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import './index.css';
import App from './App';
import configureStore from './store';
import csrfFetch, { restoreCSRF } from './store/csrf';
import * as sessionActions from './store/session';

let store = configureStore();

const Root = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </Provider>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));

const renderApplication = () => {
  root.render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>,
  );
}

if (
  sessionStorage.getItem("currentUser") === null ||
  sessionStorage.getItem("X-CSRF-Token") === null 
) {
  store.dispatch(sessionActions.restoreSession()).then(renderApplication);
} else {
  renderApplication();
}

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
}