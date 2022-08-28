import { LoginIcon } from '@heroicons/react/outline'
import React from 'react'

const ConfirmUserModal = ({ email, verificationCode, setVerificationCode, resendVerificationCode, onSubmit }) => {

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
              Confirm your email
            </h3>
            <div className="card-content py-6">
              <p>
                Please type the verification code we sent to 
                <span className="font-medium"> {email}</span>
                . Didn't receive it? Check your spam folder.
              </p>
            </div>
            <div className="w-full">
              <div className="card-content w-80 mx-auto">
                <div className="pb-6">
                  <input type="text" name="code" placeholder="Enter Verification Code" className="blue-outline-transition bg-creme block w-full py-2 px-3 rounded-md text-lg"
                    value={verificationCode}
                    onChange={e => setVerificationCode(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center justify-end">
                <div className="resend">
                  <button onClick={resendVerificationCode}>Resend Verification Code</button>
                </div>
                <button 
                  type="submit"
                  onClick={onSubmit}
                  className="shadow-sm rounded-3xl pl-6 pr-8 py-2 my-2 ml-4 bg-blue button-transition text-white flex"
                >
                  <LoginIcon className="h-5 w-5 my-auto" />
                  <span className="ml-1">Submit</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
  )
}

export default ConfirmUserModal