import React from 'react'
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { store } from './store/store.jsx';

const colors = {
  brand: {
    900: 'red',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors })
let persistor = persistStore(store);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <ChakraProvider theme={theme}>
            <App />
          </ChakraProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
