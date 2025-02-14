import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { MantineProvider } from '@mantine/core';
import store from './store/store';
import client from './apolloClient';
import './index.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
   <Provider store={store}>
    <MantineProvider withGlobalStyles withNormalizaCSS>
     <App />
    </MantineProvider>
   </Provider>
  </ApolloProvider>
);