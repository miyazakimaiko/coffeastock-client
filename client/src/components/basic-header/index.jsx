import React from 'react'
import Logo from '../../assets/images/logo-white-bg.png'


const BasicHeader = () => {
  return (
    <div className="h-16 lg:h-24 w-full max-w-screen-xl mx-auto px-3 flex items-center justify-between">
      <div className="w-44">
        <img src={Logo} alt="Coffeastock" />
      </div>
    </div>
  )
}

export default BasicHeader