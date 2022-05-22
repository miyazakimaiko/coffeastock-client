import React from 'react'
import ReactDOM from 'react-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import App from './App'
import {AccountProvider} from './context/AccountContext'
import { RecipeProvider } from './context/RecipeContext'

const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <AccountProvider>
      <RecipeProvider>
        <App/>
        <ReactQueryDevtools/>
      </RecipeProvider>
    </AccountProvider>
  </QueryClientProvider>
, document.getElementById("root"))

