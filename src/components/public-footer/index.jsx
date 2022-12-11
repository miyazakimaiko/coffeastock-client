import React from 'react';
import { Link } from 'react-router-dom';

const PublicFooter = () => {
  return (
    <div className="flex justify-between flex-wrap w-full max-w-screen-xl mx-auto p-10">
      <div>
        <Link to="/terms">Terms of Service</Link>
        <span className="px-2">|</span>
        <Link to="/privacy">Privacy Policy</Link>
        <span className="px-2">|</span>
        <Link to="/">Contact</Link>
        <span className="px-2">|</span>
        <Link to="/">Linkedin</Link>
      </div>
      <div>
        <Link to="/">© {new Date().getFullYear()} Coffeastock</Link>
      </div>
    </div>
  )
}

export default PublicFooter