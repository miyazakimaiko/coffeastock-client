import React from 'react';
import { useNavigate } from 'react-router-dom';
import BlueButton from '../../elements/BlueButton';
import './PageNotFound.scss';

const PageNotFound = () => {
  const navigate = useNavigate();

  function navigateToDashboard() {
    navigate('/', {replace: true});
  }

  return (
    <>
      <div className="absolute top-1/3 w-full text-center flex flex-col justify-center mx-auto">
        <div className="text-8xl font-bold">404</div>
        <div className="text-2xl">UH OH! You're lost.</div>
        <div className="px-4 py-4">The page you are looking for does not exist. How you got here is a mystery. But you can click the button below to go back to the dashboard.</div>
        <div>
          <BlueButton
            text="Dashboard"
            onClick={navigateToDashboard}
          />
        </div>
      </div>
    </>
  )
}

export default PageNotFound
