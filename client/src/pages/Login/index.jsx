import { LoginIcon } from '@heroicons/react/outline'
import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className="h-full">
      <div className="
        h-24 w-full max-w-screen-xl mx-auto px-3
        flex items-center justify-between"
      >
        <h2 className="text-2xl">Coffee Journal</h2>
        <Link to="/register">
          <div className="px-8 py-2 rounded-3xl sinenna-button-transition">Create New Account</div>
        </Link>
      </div>

      <div className="w-full flex justify-center mt-20">
        <form 
          method="#" 
          action="#"
          className="w-96"
        >
          <div className="bg-white p-6 shadow-sm rounded-md">
            <div>
              <h3 class="text-2xl font-light">Login</h3>
            </div>
            <div class="card-content pt-3">
              <div class="pb-3">
                <label className="font-bold">Email address</label>
                <input type="email" placeholder="Enter email" class="blue-outline-transition bg-creme block w-full text-base py-2 px-3 rounded-md"/>
              </div>
              <div class="pb-3">
                <label className="font-bold">Password</label>
                <input type="password" placeholder="Password" class="blue-outline-transition bg-creme block w-full text-base py-2 px-3 rounded-md"/>
              </div>
            </div>
            <div class="text-center">
              <button type="submit" class="shadow-sm rounded-3xl pl-6 pr-8 py-2 my-2 mx-auto bg-blue button-transition text-white text-base flex">
                <LoginIcon className="h-5 w-5 my-auto"/>
                <span className="ml-1">Login</span>
                </button>
              <div class="forgot">
                <a href="#pablo">Forgot your password?</a>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
