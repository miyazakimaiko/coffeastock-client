import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Account from './context/Account'


ReactDOM.render(
  <Account>
    <App/>
  </Account>
, document.getElementById("root"))

