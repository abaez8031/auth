import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import './index.css';
import App from './App';
import configureStore from './store';
import csrfFetch, { restoreCSRF } from './store/csrf';

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

if (sessionStorage.getItem("X-CSRF-Token") === null) {
  restoreCSRF().then(renderApplication);
} else {
  renderApplication();
}

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.csrfFetch = csrfFetch
}