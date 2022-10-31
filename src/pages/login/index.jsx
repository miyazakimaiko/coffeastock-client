import { LoginIcon } from '@heroicons/react/outline'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as api from '../../api/Users';
import Logo from '../../assets/images/logo-white-bg.png'
import toastOnBottomCenter from '../../utils/customToast';
import { ModalStateContext } from '../../context/ModalStateContext';
import { useAuthenticate, 
        useGetSession, 
        useSetUserData, 
        useSetAuthenticated } from '../../context/AccountContext';
import useAddUser from '../../hooks/useAddUser';
import useGetUser from '../../hooks/useGetUser';
import ChangePasswordModal from '../../modals/change-password-modal';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { modal, 
        openChangePasswordModal, 
        modalModeSelection } = useContext(ModalStateContext);
  const setUserData = useSetUserData();
  const authenticate = useAuthenticate();
  const getSession = useGetSession();
  const setAuthenticated = useSetAuthenticated();
  const addUser = useAddUser();
  const getUser = useGetUser();
  const navigate = useNavigate();


  const onSubmit = (event) => {
    event.preventDefault();

    if (email.length === 0 && password.length === 0) {
      toastOnBottomCenter('error', 'Please enter Email Address and Password.')
    }
    else {
      authenticate(email, password).then(data => {
        getSession().then((session) => {
          setUserData(session);
          setAuthenticated(true);
          createUserIfNotFound(session);
        });
      })
      .catch(err => {
        toastOnBottomCenter('error', err.message)
      })
    }
  };

  

  async function createUserIfNotFound(userData) {
    if (userData.sub) {
      const userFound = await api.findUser(userData.sub, userData.accessToken.jwtToken);

      if (!userFound) {
        addUser.mutate(userData, {
          onSuccess: () => navigateToDashboard()
        });
      }
      else {
        getUser.mutate(userData, {
          onSuccess: () => navigateToDashboard()
        });
      }

    }
  }

  function navigateToDashboard() {
    navigate('/', {replace: true});
    toastOnBottomCenter('success', 'Logged in successfully.');
  }

  return (
    <>    
      <div className="h-full">
        <div className="h-16 lg:h-24 w-full max-w-screen-xl mx-auto px-3 flex items-center justify-between">
          <div className="w-44">
            <img src={Logo} alt="Coffeastock" />
          </div>
          <Link to="/register">
            <div className="px-8 py-2 rounded-3xl sinenna-button-transition">Create New Account</div>
          </Link>
        </div>

        <div className="w-full flex justify-center mt-20">
          <form 
            method="#" 
            action="#"
            className="w-96"
            onSubmit={onSubmit}
          >
            <div className="bg-white p-6 shadow-sm rounded-md">
              <div>
                <h3 className="text-2xl font-light">Login</h3>
              </div>
              <div className="card-content pt-3">
                <div className="pb-3">
                  <label className="">Email address</label>
                  <input type="email" name="email" placeholder="Enter email" className="blue-outline-transition bg-creme block w-full py-2 px-3 rounded-md"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
                <div className="pb-3">
                  <label className="">Password</label>
                  <input type="password" name="password" placeholder="Password" className="blue-outline-transition bg-creme block w-full py-2 px-3 rounded-md"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="text-center">
                <button 
                  type="submit"
                  className="shadow-sm rounded-3xl pl-6 pr-8 py-2 my-2 mx-auto bg-blue button-transition text-white flex"
                >
                  <LoginIcon className="h-5 w-5 my-auto" />
                  <span className="ml-1">Login</span>
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
