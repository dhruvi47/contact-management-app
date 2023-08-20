// src/index.tsx

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './tailwind.css';
import App from './App';
import store from './redux/store'; // Import the store

ReactDOM.render(
  <Provider store={store}> {/* Provide the Redux store */}
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
