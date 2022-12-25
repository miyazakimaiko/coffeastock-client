import { LoginIcon } from '@heroicons/react/outline';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsCheck2 } from 'react-icons/bs';
import * as api from '../../api/Users';
import LogoSm from '../../assets/images/logo.png';
import LogoLg from '../../assets/images/logo-white-bg.png';
import toastOnBottomCenter from '../../utils/customToast';
import { ModalStateContext } from '../../context/ModalStateContext';
import { useAuthenticate, 
        useGetSession, 
        useSetUserData, 
        useSetAuthenticated, 
        useSignout, 
        useUserData,
        useAuthenticated,
        useChangeAttribute} from '../../context/AccountContext';
import useAddContact from '../../hooks/useAddContact';
import useAddUser from '../../hooks/useAddUser';
import useGetUser from '../../hooks/useGetUser';
import ChangePasswordModal from '../../modals/change-password-modal';
import { TO_DASHBOARD } from '../../utils/Paths';
import SpinnerSmall from '../../elements/SpinnerSmall';
import { useEffect } from 'react';


const Login = () => {
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { modal, 
        openChangePasswordModal, 
        modalModeSelection } = useContext(ModalStateContext);

  const userData = useUserData();
  const setUserData = useSetUserData();
  const authenticate = useAuthenticate();
  const getSession = useGetSession();
  const setAuthenticated = useSetAuthenticated();
  const changeAttribute = useChangeAttribute();
  const addContact = useAddContact();
  const addUser = useAddUser();
  const getUser = useGetUser();
  const navigate = useNavigate();
  const signout = useSignout();


  const onSubmit = (event) => {
    event.preventDefault();

    setLoading(true);

    if (email.length === 0 && password.length === 0) {
      toastOnBottomCenter('error', 'Please enter Email Address and Password.');
      setLoading(false);
    }
    else {
      authenticate(email, password)
        .then(data => {
          getSession().then((userData) => {
            setUserData(userData);
            setAuthenticated(true);
          })  
        })
        .catch(err => {
          setLoading(false);
          toastOnBottomCenter('error', err.message);
        })
    }
  };

  useEffect(() => {
    if (loading && userData.sub) {
      createUserIfNotFound(userData);
    }
  }, [userData])
  

  async function createUserIfNotFound(userData) {
    try {
      const user = await api.findUser(userData.sub, userData.accessToken.jwtToken);

      if (!user.found) {
        await addContact.mutateAsync(userData).then(contact => {
          changeAttribute('custom:contact_id', contact.id, null);
          addUser.mutate({...userData, contactid: contact.id}, {
            onSuccess: () => {
              navigateToDashboard();
              setLoading(false);
            }
          });
        });

      }
      else {
        getUser.mutate(userData, {
          onSuccess: () => {
            navigateToDashboard();
            setLoading(false);
          }
        });
      }
    }
    catch (err) {
      toastOnBottomCenter('error', `${err.message}: Please try again later.`);
      signout();
      setLoading(false);
    }
  }

  function navigateToDashboard() {
    navigate(TO_DASHBOARD, {replace: true});
    toastOnBottomCenter('success', 'Logged in successfully.');
  }

  return (
    <>    
      <div className="h-full">
        <div className="h-16 lg:h-24 w-full max-w-screen-xl mx-auto px-3 flex items-center justify-between">
          <div className="w-10 md:w-44">
            <Link to="/">
              <img src={LogoSm} alt="Coffeastock" className="block md:hidden w-10" />
              <img src={LogoLg} alt="Coffeastock" className="hidden md:block" />
            </Link>
          </div>
          <div className="flex items-center">
            <span className="pr-3">New to Coffeastock?</span>
            <Link to="/register">
              <div className="px-4 py-2 rounded-3xl sinenna-button-transition flex items-center">
                Sign up
                <BsCheck2 className="ml-1"/>
              </div>
            </Link>
          </div>
        </div>

        <div className="w-full flex justify-center mt-20">
          <form 
            method="#" 
            action="#"
            className="w-96 mx-2"
            onSubmit={onSubmit}
          >
            <div className="bg-creme p-6 shadow-sm rounded-md border border-burnt-sienna border-opacity-20">
              <div>
                <h3 className="text-2xl font-light text-center">Sign in to Coffeastock</h3>
              </div>
              <div className="card-content pt-3">
                <div className="pb-3">
                  <label className="">Email address</label>
                  <input type="email" name="email" placeholder="Enter email" className="blue-outline-transition bg-white block w-full py-2 px-3 rounded-md"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
                <div className="pb-3">
                  <label className="">Password</label>
                  <input type="password" name="password" placeholder="Password" className="blue-outline-transition bg-white block w-full py-2 px-3 rounded-md"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="text-center">
                <button 
                  type="submit"
                  disabled={loading}
                  className="shadow-sm rounded-3xl py-2 my-2 mx-auto bg-blue button-transition text-white text-center min-w-[150px]"
                >
                  {loading 
                    ? <SpinnerSmall />
                    : <div className="w-full flex justify-center">
                        <LoginIcon className="h-5 w-5 my-auto" />
                        <span className="ml-1 mr-2">Sign in</span>
                      </div>
                  }
                  </button>
                <div className="forgot">
                  <a href="#" onClick={openChangePasswordModal}>Forgot your password?</a>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      { modal.isOpen && modal.mode === modalModeSelection.changePassword && (
        <ChangePasswordModal />
      )}
    </>
  )
}

export default Login
