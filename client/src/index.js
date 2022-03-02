import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import AccountProvider from './context/AccountContext'
import AttributeRangeContext from './context/AttributeRangeContext';
import BeansProvider from './context/BeansContext';


ReactDOM.render(
  <AccountProvider>
    <AttributeRangeContext>
      <BeansProvider>
        <App/>
      </BeansProvider>
    </AttributeRangeContext>
  </AccountProvider>
, document.getElementById("root"))

