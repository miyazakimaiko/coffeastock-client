import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { BsCheckLg } from 'react-icons/bs';
import * as EmailValidator from 'email-validator';
import { AiOutlineArrowRight } from 'react-icons/ai';
import UserPool from '../../utils/UserPool';
import { TO_LOGIN } from '../../utils/Paths';
import toastOnBottomCenter from '../../utils/customToast'
import LogoSm from '../../assets/images/logo.png'
import LogoLg from '../../assets/images/logo-white-bg.png'
import ConfirmUserModal from '../../modals/confirm-user-modal';
import useAddContact from '../../hooks/useAddContact';

const Register = () => {
  const [cognitoUser, setCognitoUser] = useState(null);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRetype, setPasswordRetype] = useState('');

  const [pwdContainsLowercase, setPwdContainsLowercase] = useState(false);
  const [pwdContainsUppercase, setPwdContainsUppwecase] = useState(false);
  const [pwdContainsNumber, setPwdContainsNumber] = useState(false);
  
  const [showEmailWarningMsg, setShowEmailWarningMsg] = useState(null);
  const [showPwdRetypeWarningMsg, setShowPwdRetypeWarningMsg] = useState(false);

  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verificationCode, setVerificationCode] = useState(null);
  
  const navigate = useNavigate();

  const addContact = useAddContact();

  function validateEmail() {
    if (!EmailValidator.validate(email)) {
      setShowEmailWarningMsg(true);
    }
    else {
      setShowEmailWarningMsg(false);
    }
  }

  useEffect(() => {
    if (Boolean(showEmailWarningMsg)) {
      validateEmail()
    }
  }, [email, showEmailWarningMsg])
  

  function validatePassword() {
    password.match(/[a-z]/g) 
      ? setPwdContainsLowercase(true) 
      : setPwdContainsLowercase(false);
    password.match(/[A-Z]/g) 
      ? setPwdContainsUppwecase(true) 
      : setPwdContainsUppwecase(false);
    password.match(/[0-9]/g) 
      ? setPwdContainsNumber(true) 
      : setPwdContainsNumber(false);
  }

  useEffect(() => {
    validatePassword();
    if (passwordRetype.length > 0) {
      if (password !== passwordRetype) {
        setShowPwdRetypeWarningMsg(true);
      }
      else {
        setShowPwdRetypeWarningMsg(false);
      }
    }
  }, [password, passwordRetype])
  

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

  async function verifyUser(event) {
    event.preventDefault();
    await cognitoUser.confirmRegistration(verificationCode, true, function(err, result) {
      if (err) {
        toastOnBottomCenter('error', err.message);
      }
      else {
        addContact.mutate({
          userid: cognitoUser.sub,
          nickname,
          email
        },
        {
          onSuccess: () => {
            console.log("addContact successs: ")
          },
          onError: (error) => {
            console.log("addContact error: ", error)
          },
          onSettled:() => {
            toastOnBottomCenter('success', 'Account Confirmed. Please login to get started!');
            navigate(TO_LOGIN, { replace: true } );
          }
        });
      }
    });
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
        <header className="h-16 lg:h-24 w-full max-w-screen-xl mx-auto px-3 flex items-center justify-between">
          <Link to="/" className="w-10 md:w-44">
            <img src={LogoSm} alt="Coffeastock" className="block md:hidden w-10" />
            <img src={LogoLg} alt="Coffeastock" className="hidden md:block" />
          </Link>
          <div className="flex items-center">
            <span className="pr-3">Already have an account?</span>
            <Link to="/login">
              <div className="px-4 py-2 rounded-3xl sinenna-button-transition flex items-center">
                Sign in
                <AiOutlineArrowRight className="ml-1"/>
              </div>
            </Link>
          </div>
        </header>

        <div className="">
          <div className="text-center">
            <h1 className="text-3xl  mb-3">Sign up</h1>
          </div>

          <div className="flex flex-wrap items-center m-auto py-4 w-full max-w-md">
            <div className="w-full mx-2">
              <form method="#" action="#">
                <div className="bg-creme py-8 px-6 shadow-sm rounded-md border border-burnt-sienna border-opacity-20">
                  <h2 className="text-xl text-center">Start your 14-day free trial</h2>
                  <div className="card-content py-4">
                    <div className="pb-4">
                      <div className="flex items-center">
                        { showEmailWarningMsg
                          ? <span className="text-red font-medium">Please enter valid email address.</span>
                          : <span>Enter your email</span>
                        }
                        {email.length > 0 && !showEmailWarningMsg
                          ? <BsCheckLg className="ml-2 w-3 h-3 text-deep-green" />
                          : null
                        }
                      </div>
                      <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        className="orange-outline-transition transition-all block w-full py-2 px-3 rounded-md"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={validateEmail}
                      />
                    </div>
                    <div className="pb-4">
                      <div className="flex items-center">
                        {showPwdRetypeWarningMsg
                          ? <span className="text-red font-medium">Password does not match.</span>
                          : <span>Create a password</span>
                        }
                        {password.length > 0 
                          && passwordRetype.length > 0 
                          && !showPwdRetypeWarningMsg
                          && pwdContainsLowercase
                          && pwdContainsUppercase
                          && pwdContainsNumber
                          ? <BsCheckLg className="ml-2 w-3 h-3 text-deep-green" />
                          : null
                        }
                      </div>
                      <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        className="orange-outline-transition transition-all block w-full py-2 px-3 rounded-md"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <div className="flex items-center flex-wrap text-xs">
                        Must contain: 
                        <div className="mx-1">
                          {pwdContainsLowercase
                            ? <div className="text-deep-green flex items-center">
                                <BsCheckLg className="mr-1"/> 
                                A lowercase letter
                              </div>
                            : <div className="text-red">A lowercase letter</div>
                          }
                        </div>
                        |
                        <div className="mx-1">
                          {pwdContainsUppercase
                            ? <div className="text-deep-green flex items-center">
                                <BsCheckLg className="mr-1"/> 
                                A uppercase letter
                              </div>
                            : <div className="text-red">A uppercase letter</div>
                          }
                        </div>
                        |
                        <div className="mx-1">
                          {pwdContainsNumber
                            ? <div className="text-deep-green flex items-center">
                                <BsCheckLg className="mr-1"/> 
                                A number
                              </div>
                            : <div className="text-red">A number</div>
                          }
                        </div>
                      </div>
                    </div>
                    <div className="pb-4">
                      <input
                        type="password"
                        placeholder="Password Retype"
                        className="orange-outline-transition transition-all block w-full py-2 px-3 rounded-md"
                        value={passwordRetype}
                        onChange={(e) => setPasswordRetype(e.target.value)}
                      />
                    </div>
                    <div className="pb-4">
                      <div className="flex items-center">
                        <label>Enter a nickname</label>
                        {nickname.length > 0
                            ? <BsCheckLg className="ml-2 w-3 h-3 text-deep-green" />
                            : null
                        }
                      </div>
                      <input
                        type="text"
                        placeholder="Nickname"
                        name="nickname"
                        className="orange-outline-transition block w-full py-2 px-3 rounded-md"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      onClick={onSubmit}
                      disabled={ showEmailWarningMsg
                                || email.length <= 0 
                                || password.length <= 0
                                || !pwdContainsLowercase
                                || !pwdContainsUppercase
                                || !pwdContainsNumber
                                || passwordRetype.length <= 0
                                || nickname.length <= 0
                                || showPwdRetypeWarningMsg}
                      className="bg-orange button-transition shadow-sm rounded-3xl pl-6 pr-8 py-2 my-2 mx-auto text-white flex"
                    >
                      <span className="ml-1">Create Free Account</span>
                    </button>

                    <p className="text-xs pt-4">
                      By creating an account, you agree to the <Link to="/terms" className="text-blue underline">Terms of Service</Link>
                      . For more information about Coffeastock's privacy practices, 
                      see the <Link to="/privacy" className="text-blue underline">Coffeastock Privacy Policy</Link>
                      . We'll occasionally send you account-related emails.
                    </p>
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
