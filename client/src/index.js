import React from 'react'
import ReactDOM from 'react-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import App from './App'
import {AccountProvider} from './context/AccountContext'

const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <AccountProvider>
      <App/>
      <ReactQueryDevtools/>
    </AccountProvider>
  </QueryClientProvider>
, document.getElementById("root"))

