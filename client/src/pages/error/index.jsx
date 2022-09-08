import React from 'react';
import { useNavigate } from 'react-router-dom';
import BlueButton from '../../elements/BlueButton';

const ErrorPage = () => {
  const navigate = useNavigate();

  function navigateToDashboard() {
    navigate('/', {replace: true});
  }

  return (
    <>
      <div className="px-4 pt-8 w-full max-w-980px mx-auto flex flex-col items-center">
        <div className="text-5xl font-bold">We're Sorry!</div>
        <div className="text-xl px-4 py-6 text-center">We're not quite sure what went wrong.<br/>You can go back, or try looking on our Help Center if you need a hand.</div>
        <div>
          <BlueButton
            text="Go to Dashboard"
            onClick={navigateToDashboard}
          />
        </div>
      </div>
    </>
  )
}

export default ErrorPage
