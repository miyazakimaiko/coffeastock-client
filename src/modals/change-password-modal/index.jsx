import React, { useContext, useEffect, useState } from 'react'
import { CognitoUser } from 'amazon-cognito-identity-js';
import UserPool from '../../utils/UserPool';
import toastOnBottomCenter from '../../utils/customToast';
import { ModalStateContext } from '../../context/ModalStateContext';
import ModalWrapperContainer from '../../elements/ModalWrapperContainer';


const ChangePasswordModal = ({ currentUserEmail = null }) => {
  const { closeModal } = useContext(ModalStateContext);
  const [stage, setStage] = useState(1); // 1 = email, 2 = code stage
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRetype, setPasswordRetype] = useState('');

  useEffect(() => {
    if (currentUserEmail !== null) {
      setEmail(currentUserEmail);
    }
  }, [])
  

  function getUser() {
    return new CognitoUser({
      Username: email.toLowerCase(),
      Pool: UserPool
    });
  }

  function sendCode(event) {
    event.preventDefault();

    if (email.length === 0) {
      toastOnBottomCenter('error', 'Please enter email address.');
      return;
    }

    getUser().forgotPassword({
      onSuccess: () => {
        closeModal();
        toastOnBottomCenter('Success', 'Password has been changed successfully.')
      },
      onFailure: err => {
        toastOnBottomCenter('error', err.message);
      },
      inputVerificationCode: data => {
        setStage(2);
      }
    })
  }

  function resetPassword(event) {
    event.preventDefault();

    if (password !== passwordRetype) {
      toastOnBottomCenter('error', 'The two passwords typed do not match.');
      return;
    }

    getUser().confirmPassword(code, password, {
      onSuccess: () => {
        closeModal();
        toastOnBottomCenter('success', 'Password has has been changed successfully.');
      },
      onFailure: err => {
        toastOnBottomCenter('error', err.message);
      },
      
    })
  }

  return (
    <>
      <ModalWrapperContainer
        onCloseClick={closeModal}
        title="Reset Password"
      >
        { stage === 1 && (
          <>
            <div className="card-content pb-6 text-center">
              { !currentUserEmail && (
                <p className="pb-6">
                  Please enter your email address.
                </p>
              ) }
              <form onSubmit={sendCode}>
                <div className="card-content w-full md:w-80 mx-auto">
                  <div className="pb-6">
                    <input type="email" name="code" placeholder="Enter email address" className="blue-outline-transition bg-creme block w-full py-2 px-3 rounded-md text-lg"
                      value={email}
                      disabled={currentUserEmail}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <button 
                    type="submit"
                    disabled={email.length === 0}
                    className="shadow-sm rounded-3xl pl-6 pr-8 py-2 my-2 ml-4 bg-blue button-transition text-white flex"
                  >
                    <span className="ml-1">Send Verification Code</span>
                  </button>
                </div>
              </form>
            </div>
          </>
        )}

        { stage === 2 && (
          <>
            <div className="card-content pb-6 text-center">
              <p className="pb-6">
                Please type the verification code we sent to 
                <span className="font-medium"> {email}</span>
                . Didn't receive it? Check your spam folder.
              </p>
              <form onSubmit={resetPassword}>
                <div className="card-content w-80 mx-auto my-4">
                  <div className="pb-6">
                    <input type="text" name="code" placeholder="Enter Verification Code" className="blue-outline-transition bg-creme block w-full py-2 px-3 mb-6 rounded-md text-lg"
                      value={code}
                      onChange={e => setCode(e.target.value)}
                    />
                    <input type="password" name="password" placeholder="Enter new password" className="blue-outline-transition bg-creme block w-full py-2 px-3 mb-6 rounded-md text-md"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                    <input type="password" name="passwordRetype" placeholder="Retype new password" className="blue-outline-transition bg-creme block w-full py-2 px-3 rounded-md text-md"
                      value={passwordRetype}
                      onChange={e => setPasswordRetype(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <button 
                    type="submit"
                    className="shadow-sm rounded-3xl pl-6 pr-8 py-2 my-2 ml-4 bg-blue button-transition text-white flex"
                  >
                    <span className="ml-1">Change Password</span>
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </ModalWrapperContainer>
    </>
  )
}

export default ChangePasswordModal