import React, { useState } from 'react'
import { CognitoUser } from 'amazon-cognito-identity-js';
import UserPool from '../../utils/UserPool';
import toastOnBottomCenter from '../../utils/customToast';
import { XIcon } from '@heroicons/react/outline';
const ForgotPasswordModal = ({ closeModal }) => {
  const [stage, setStage] = useState(1); // 1 = email, 2 = code stage
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRetype, setPasswordRetype] = useState('');

  function getUser() {
    return new CognitoUser({
      Username: email.toLowerCase(),
      Pool: UserPool
    });
  }

  function sendCode(event) {
    event.preventDefault();

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
      <div
        className="justify-center flex overflow-x-hidden 
        overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div 
          className="relative h-fit w-full max-w-3xl md:px-2 md:my-8 mx-auto"
        >
          <div 
            className="w-full border-0 rounded-lg shadow-lg relative p-8
            flex flex-col bg-white outline-none focus:outline-none"
          >
            <h3 className="md:text-lg font-light">
              Reset Password
            </h3>
            <button
              className="absolute right-4 top-4 border-0 text-black float-right"
              onClick={closeModal}>
              <XIcon className="h-6 w-6"/>
            </button>

            { stage === 1 && (
              <>
                <div className="card-content py-6">
                  <p>
                    Please enter your email address.
                  </p>
                </div>
                <div className="w-full">
                    <form onSubmit={sendCode}>
                      <div className="card-content w-80 mx-auto">
                        <div className="pb-6">
                          <input type="email" name="code" placeholder="Enter email address" className="blue-outline-transition bg-creme block w-full py-2 px-3 rounded-md text-lg"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-end">
                        <button 
                          type="submit"
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
                <div className="card-content py-6">
                  <p>
                    Please type the verification code we sent to 
                    <span className="font-medium"> {email}</span>
                    . Didn't receive it? Check your spam folder.
                  </p>
                </div>
                <div className="w-full">
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
                      <div className="flex items-center justify-end">
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
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
  )
}

export default ForgotPasswordModal