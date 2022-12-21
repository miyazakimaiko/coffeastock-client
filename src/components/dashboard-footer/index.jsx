import React from 'react';
import { Link } from 'react-router-dom';
const DashboardFooter = () => {
  return (
    <div className="flex justify-between flex-wrap w-full mx-auto p-4 text-xs">
      <div>
        <Link 
          to="/"
          target="_blank"
          rel="nofollow noopener noreferrer"
          key="home"
        >
          © {new Date().getFullYear()} Coffeastock
        </Link>
        <span className="px-2">|</span>
        <Link 
          to="/terms"
          target="_blank"
          rel="nofollow noopener noreferrer"
          key="terms"
        >
          Terms of Service
        </Link>
        <span className="px-2">|</span>
        <Link 
          to="/privacy"
          target="_blank"
          rel="nofollow noopener noreferrer"
          key="privacy"
        >
          Privacy Policy
        </Link>
        <span className="px-2">|</span>
        <Link 
          to="/"
          target="_blank"
          rel="nofollow noopener noreferrer"
          key="Feedback"
        >
          Feedback
        </Link>
        <span className="px-2">|</span>
        <Link 
          to="/"
          target="_blank"
          rel="nofollow noopener noreferrer"
          key="linkedin"
        >
          Linkedin
        </Link>
      </div>
    </div>
  )
}

export default DashboardFooter