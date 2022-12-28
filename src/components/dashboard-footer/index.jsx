import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ModalStateContext } from '../../context/ModalStateContext';

const DashboardFooter = () => {
  const { openSendFeedbackModal } = useContext(ModalStateContext);

  return (
    <div className="flex justify-between flex-wrap w-full mx-auto p-4 text-xs">
      <div>
        <Link 
          to="/"
          target="_blank"
          rel="nofollow noopener noreferrer"
          key="home"
        >
          © {new Date().getFullYear()} Maiko Miyazaki
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
        <a
          onClick={openSendFeedbackModal}
          key="Feedback"
          className="cursor-pointer"
        >
          Feedback
        </a>
      </div>
    </div>
  )
}

export default DashboardFooter