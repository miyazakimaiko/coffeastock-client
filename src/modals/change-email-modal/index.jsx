import React, { useContext, useState } from 'react';
import { useChangeAttribute, useUserData, useVerifyAttribute } from '../../context/AccountContext';
import { ModalStateContext } from '../../context/ModalStateContext';
import ModalWrapperContainer from '../../elements/ModalWrapperContainer';


const ChangeEmailModal = () => {
  const { closeModal } = useContext(ModalStateContext);
  const [stage, setStage] = useState(1); // 1 = email, 2 = code stage
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const changeAttribute = useChangeAttribute();
  const verifyAttribute = useVerifyAttribute();

  function sendVerificationCode(e) {
    e.preventDefault();
    changeAttribute('email', email, setStageTwo);
  }

  function setStageTwo() {
    setStage(2);
  }

  function verifyCode(e) {
    e.preventDefault();
    verifyAttribute('email', verificationCode, closeModal);
  }

  return (
    <>
      <ModalWrapperContainer
        onCloseClick={closeModal}
        title="Change Email"
      >
        { stage === 1 && (
          <div className="card-content pb-6 justify-center text-center">
            <p className="mb-6">
              Please enter new email address.
            </p>
            <form onSubmit={(e) => sendVerificationCode(e)}>
              <div className="card-content w-full md:w-80 mx-auto">
                <div className="pb-6">
                  <input type="email" name="email" placeholder="Enter email" className="blue-outline-transition bg-creme block w-full py-2 px-3 rounded-md text-lg"
                    value={email}
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
                  <span className="ml-1">Send verification code</span>
                </button>
              </div>
            </form>
          </div>
        ) }

        { stage === 2 && (
          <div className="card-content py-6">
            <p className="pb-6">
              Please type the verification code we sent to 
              <span className="font-medium"> {email}</span>
              . Didn't receive it? Check your spam folder.
            </p>
            <div className="pb-6">
              <input type="text" name="code" placeholder="Enter Verification Code" className="blue-outline-transition bg-creme block w-full py-2 px-3 md:rounded-md text-lg"
                value={verificationCode}
                onChange={e => setVerificationCode(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-end">
              <div className="resend">
                <button onClick={(e) => sendVerificationCode(e)}>Resend Verification Code</button>
              </div>
              <button 
                type="submit"
                onClick={(e) => verifyCode(e)}
                className="shadow-sm rounded-3xl pl-6 pr-8 py-2 my-2 ml-4 bg-blue button-transition text-white flex"
              >
                <span className="ml-1">Submit</span>
              </button>
            </div>
          </div>
        ) }
      </ModalWrapperContainer>
    </>
  )
}

export default ChangeEmailModal