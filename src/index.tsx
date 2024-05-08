import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import '@mantine/core/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';
import { store } from './reduxToolkit/Store';
import { Provider } from 'react-redux';
import LoadData from './LoadData';

const theme = createTheme({
  /** Put your mantine theme override here */
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
  <MantineProvider theme={theme}>
    <Provider store={store}>
      <LoadData />
      <App />
    </Provider>
  </MantineProvider>
  // </React.StrictMode>
);
