import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import configureStore from './configureStore';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
