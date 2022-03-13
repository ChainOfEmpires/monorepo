import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import theme from './theme';

import './index.scss';
import { SignerContextProvider } from './contexts/signer';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <SignerContextProvider>
        <App />
      </SignerContextProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
