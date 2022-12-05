import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/images/logo-white-bg.png'


const PublicHeader = () => {
  return (
    <header className="h-16 lg:h-24 w-full max-w-screen-xl mx-auto px-3 flex items-center justify-between">
      <div className="w-44">
        <Link to="/">
          <img src={Logo} alt="Coffeastock" />
        </Link>
      </div>
      <div className="flex items-center">
          <Link to="/login" className="text-sm mr-4">
              Sign in
          </Link>
          <Link to="/register">
            <div className="border text-base border-burnt-sienna shadow-xl px-3 py-2 rounded-md button-transition">
              Sign up
            </div>
          </Link>
        </div>
    </header>
  )
}

export default PublicHeader