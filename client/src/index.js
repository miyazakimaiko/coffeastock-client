import React from 'react'
import ReactDOM from 'react-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import App from './App'
import {AccountProvider} from './context/AccountContext'
import ModalStateProvider from './context/ModalStateContext'

const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <AccountProvider>
      <ModalStateProvider>
        <App/>
        <ReactQueryDevtools/>
      </ModalStateProvider>
    </AccountProvider>
  </QueryClientProvider>
, document.getElementById("root"))

