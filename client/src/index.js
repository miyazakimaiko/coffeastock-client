import React from 'react'
import ReactDOM from 'react-dom'
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import App from './App'
import { AccountProvider } from './context/AccountContext'
import ModalStateProvider from './context/ModalStateContext'
import NavStateProvider from './context/NavStateContext';

const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <NavStateProvider>
      <AccountProvider>
        <ModalStateProvider>
          <App/>
          <ReactQueryDevtools/>
        </ModalStateProvider>
      </AccountProvider>
    </NavStateProvider>
  </QueryClientProvider>
, document.getElementById("root"))

