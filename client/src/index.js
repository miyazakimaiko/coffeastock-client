import React from 'react'
import ReactDOM from 'react-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import App from './App'
import {AccountProvider} from './context/AccountContext'
import {AttributeRangeProvider} from './context/AttributeRangeContext'
import { RecipeProvider } from './context/RecipeContext'

const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <AccountProvider>
      <AttributeRangeProvider>
        <RecipeProvider>
          <App/>
          <ReactQueryDevtools/>
        </RecipeProvider>
      </AttributeRangeProvider>
    </AccountProvider>
  </QueryClientProvider>
, document.getElementById("root"))

