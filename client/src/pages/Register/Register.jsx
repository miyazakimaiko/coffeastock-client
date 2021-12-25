import { BookOpenIcon, GlobeIcon, LightBulbIcon } from '@heroicons/react/outline'
import React from 'react'
import { Link } from 'react-router-dom'
import CoffeeBag from '../../svgs/CoffeeBag'

const Register = () => {
  return (
    <div className="h-full bg-white">
      <header className="
        h-24 w-full max-w-screen-xl mx-auto px-3
        flex items-center justify-between"
      >
        <Link to="/register" className="text-2xl w-8 h-8">
          <CoffeeBag/>
        </Link>
        <Link to="/login">
          <div className="px-8 py-2 rounded-3xl sinenna-button-transition">Login</div>
        </Link>
      </header>

    <div className="">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-3">Coffee Journal</h1>
        <h2 className="text-xl">Collect, Analyse and Improve Your Coffee Records In One Place.</h2>
      </div>

      <div className="flex flex-wrap items-center m-auto pt-14 max-w-screen-lg">
        <div className="p-6 w-1/2">
          <div className="pb-4">
            <div className="flex items-center mb-2">
              <BookOpenIcon className="w-10 h-10 mr-3 text-blue"/>
              <h3 className="text-lg font-semibold">Free Account</h3>
            </div>
              <p>Here you can write a feature description for your dashboard, let the users know what is the value that you give them.</p>
          </div>
          <div className="pb-4">
            <div className="flex items-center mb-2">
              <GlobeIcon className="w-10 h-10 mr-3 text-green"/>
              <h3 className="text-lg font-semibold">Access From Anywhere</h3>
            </div>
            <p>Here you can write a feature description for your dashboard, let the users know what is the value that you give them.</p>
          </div>
          <div className="pb-4">
            <div className="flex items-center mb-2">
              <LightBulbIcon className="w-10 h-10 mr-3 text-yellow"/>
              <h3 className="text-lg font-semibold">Other Features</h3>
            </div>
            <p>Here you can write a feature description for your dashboard, let the users know what is the value that you give them.</p>
          </div>
        </div>
        <div className="w-1/2">
          <form 
            method="#" 
            action="#"
            className=""
          >
            <div className="bg-white p-6">
              <div class="card-content">
                <div class="pb-4">
                  <input type="text" placeholder="User Name" class="orange-outline-transition bg-creme block w-full text-base py-2 px-3 rounded-md"/>
                </div>
                <div class="pb-4">
                  <input type="email" placeholder="Email" class="orange-outline-transition transition-all bg-creme block w-full text-base py-2 px-3 rounded-md"/>
                </div>
                <div class="pb-4">
                  <input type="password" placeholder="Password" class="orange-outline-transition transition-all bg-creme block w-full text-base py-2 px-3 rounded-md"/>
                </div>
                <div class="pb-4">
                  <input type="password" placeholder="Password Confirmation" class="orange-outline-transition transition-all bg-creme block w-full text-base py-2 px-3 rounded-md"/>
                </div>
              </div>
              <div class="text-center">
                <button type="submit" class="bg-orange button-transition shadow-sm rounded-3xl pl-6 pr-8 py-2 my-2 mx-auto text-white text-base flex">
                  <span className="ml-1">Create Free Account</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Register
