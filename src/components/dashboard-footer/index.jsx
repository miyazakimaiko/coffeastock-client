import React from 'react';
import { useContext } from 'react';
import { ModalStateContext } from '../../context/ModalStateContext';

const DashboardFooter = () => {
  const { openSendFeedbackModal } = useContext(ModalStateContext);

  return (
    <div className="flex justify-between flex-wrap w-full mx-auto p-4 text-xs">
      <div>
        <a 
          href="https://coffeastock.com"
          target="_blank"
          rel="nofollow noopener noreferrer"
          key="home"
        >
          © {new Date().getFullYear()} Maiko Miyazaki
        </a>
        <span className="px-2">|</span>
        <a 
          href="https://coffeastock.com/terms"
          target="_blank"
          rel="nofollow noopener noreferrer"
          key="terms"
        >
          Terms of Service
        </a>
        <span className="px-2">|</span>
        <a 
          href="https://coffeastock.com/privacy"
          target="_blank"
          rel="nofollow noopener noreferrer"
          key="privacy"
        >
          Privacy Policy
        </a>
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