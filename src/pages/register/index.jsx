import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BookOpenIcon, GlobeIcon, LightBulbIcon } from '@heroicons/react/outline'
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import UserPool from '../../utils/UserPool'
import { TO_LOGIN } from '../../utils/Paths';
import toastOnBottomCenter from '../../utils/customToast'
import CoffeeBagLeft from '../../assets/svgs/CoffeeBagLeft'
import ConfirmUserModal from '../../modals/confirm-user-modal';

const Register = () => {
  const [cognitoUser, setCognitoUser] = useState(null);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verificationCode, setVerificationCode] = useState(null);


  const onSubmit = (event) => {
    event.preventDefault();
    const attributes = [];
    const nicknameData = {
      Name: 'nickname',
      Value: nickname
    }

    attributes.push(new CognitoUserAttribute(nicknameData));

    UserPool.signUp(email, password, attributes, null, (err, data) => {
      if (err) {
        toastOnBottomCenter('error', err.message)
      } else {
        try {
          setCognitoUser(data.user);
          setShowVerificationModal(true);
        } catch (error) {
          toastOnBottomCenter('error', error.message)
        }
      }
    });
  };

  function verifyUser(event) {
    event.preventDefault();
    cognitoUser.confirmRegistration(verificationCode, true, function(err, result) {
      if (err) {
        toastOnBottomCenter('error', err.message);
        return;
      }
      toastOnBottomCenter('success', 'Account Confirmed. Please login to get started!');
      navigate(TO_LOGIN, { replace: true } );
    })
  }

  function resendVerificationCode() {
    cognitoUser.resendConfirmationCode(function(err, result) {
      if (err) {
        toastOnBottomCenter('error', err.message)
        return;
      }
      toastOnBottomCenter('success', 'Verification Code has been sent.')
    });
  }

  return (
    <>
      <div className="h-full bg-white">
        <header
          className="
          h-24 w-full max-w-screen-xl mx-auto px-3
          flex items-center justify-between"
        >
          <Link to="/register" className="text-2xl w-8 h-8">
            <CoffeeBagLeft />
          </Link>
          <Link to="/login">
            <div className="px-8 py-2 rounded-3xl sinenna-button-transition">
              Login
            </div>
          </Link>
        </header>

        <div className="">
          <div className="text-center">
            <h1 className="text-4xl  mb-3">Coffee Journal</h1>
            <h2 className="text-xl">
              Collect, Analyse and Improve Your Coffee Records In One Place.
            </h2>
          </div>

          <div className="flex flex-wrap items-center m-auto pt-14 max-w-screen-lg">
            <div className="p-6 w-1/2">
              <div className="pb-4">
                <div className="flex items-center mb-2">
                  <BookOpenIcon className="w-10 h-10 mr-3 text-blue" />
                  <h3 className="text-lg font-medium">Free Account</h3>
                </div>
                <p>
                  Here you can write a feature description for your dashboard,
                  let the users know what is the value that you give them.
                </p>
              </div>
              <div className="pb-4">
                <div className="flex items-center mb-2">
                  <GlobeIcon className="w-10 h-10 mr-3 text-green" />
                  <h3 className="text-lg font-medium">Access From Anywhere</h3>
                </div>
                <p>
                  Here you can write a feature description for your dashboard,
                  let the users know what is the value that you give them.
                </p>
              </div>
              <div className="pb-4">
                <div className="flex items-center mb-2">
                  <LightBulbIcon className="w-10 h-10 mr-3 text-yellow" />
                  <h3 className="text-lg font-medium">Other Features</h3>
                </div>
                <p>
                  Here you can write a feature description for your dashboard,
                  let the users know what is the value that you give them.
                </p>
              </div>
            </div>
            <div className="w-1/2">
              <form method="#" action="#" onSubmit={onSubmit}>
                <div className="bg-white p-6">
                  <div className="card-content">
                    <div className="pb-4">
                      <input
                        type="text"
                        placeholder="Nickname"
                        name="nickname"
                        className="orange-outline-transition bg-creme block w-full py-2 px-3 rounded-md"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                      />
                    </div>
                    <div className="pb-4">
                      <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        className="orange-outline-transition transition-all bg-creme block w-full py-2 px-3 rounded-md"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="pb-4">
                      <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        className="orange-outline-transition transition-all bg-creme block w-full py-2 px-3 rounded-md"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="pb-4">
                      <input
                        type="password"
                        placeholder="Password Confirmation"
                        className="orange-outline-transition transition-all bg-creme block w-full py-2 px-3 rounded-md"
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="bg-orange button-transition shadow-sm rounded-3xl pl-6 pr-8 py-2 my-2 mx-auto text-white flex"
                    >
                      <span className="ml-1">Create Free Account</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {showVerificationModal ? (
        <ConfirmUserModal
          email={email}
          verificationCode={verificationCode}
          setVerificationCode={setVerificationCode}
          resendVerificationCode={resendVerificationCode}
          onSubmit={verifyUser}
        />
      ) : null}
    </>
  );
}

export default Register
