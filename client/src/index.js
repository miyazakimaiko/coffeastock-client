import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {AccountProvider} from './context/AccountContext'
import {AttributeRangeProvider} from './context/AttributeRangeContext'
import {BeansProvider} from './context/BeansContext'
import { RecipeProvider } from './context/RecipeContext'


ReactDOM.render(
  <AccountProvider>
    <AttributeRangeProvider>
      <BeansProvider>
        <RecipeProvider>
          <App/>
        </RecipeProvider>
      </BeansProvider>
    </AttributeRangeProvider>
  </AccountProvider>
, document.getElementById("root"))

