import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { MdWavingHand } from 'react-icons/md'
import { TO_LOGIN } from '../../utils/Paths';
import toastOnBottomCenter from '../../utils/customToast';
import { ModalStateContext } from '../../context/ModalStateContext';
import ModalWrapperContainer from '../../elements/ModalWrapperContainer';
import { useAuthenticate, useGetSession, useSetAuthenticated, useSignout } from '../../context/AccountContext';


const DeleteAccountModal = ({ email }) => {
  const { closeModal } = useContext(ModalStateContext);
  const authenticate = useAuthenticate();
  const getSession = useGetSession();
  const signout = useSignout();
  const setAuthenticated = useSetAuthenticated();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stage, setStage] = useState(1); // 1 = verify password, 2 = confirm
  const [password, setPassword] = useState('');

  function verifyPassword(event) {
    event.preventDefault();

    authenticate(email, password).then(data => {
      getSession().then((session) => {
        setUser(session.user);
        setStage(2);
      });
    })
    .catch(err => {
      toastOnBottomCenter('error', err.message)
    })
  }

  function deleteAccount(event) {
    event.preventDefault();

    user.deleteUser((err, _) => {
      if (err) {
        toastOnBottomCenter('error', err.message);
      }
      else {
        signout();
        setAuthenticated(false);
        navigate(TO_LOGIN, { replace: true } );
      }
    })
  }

  return (
    <>
      <ModalWrapperContainer
        onCloseClick={closeModal}
        title="Confirm Deletion"
      >
        { stage === 1 && (
          <>
            <div className="card-content pb-6">
              <p className="pb-6">
                Please take a moment to review what will happen when your account is deleted. This action is permanent and not reversible.
              </p>
              <h4 className="font-medium my-2">Workspace</h4>
              <p>Any worksplace that you own will be deleted after 30 days.</p>
              <h4 className="font-medium my-2">Billing</h4>
              <p>Future billing for the workspace will be stopped.</p>
              <h4 className="font-medium my-2">Your User Data</h4>
              <p>All user data will be removed immidiately after confirmation.</p>
              <hr className="my-4"/>
              <p className="font-medium text-base">This action is permanent, please confirm your understanding by entering your password</p>
              <form onSubmit={verifyPassword}>
                <div className="card-content w-80 mx-auto mt-4">
                  <div className="pb-6">
                    <input type="password" name="password" placeholder="Enter password" className="blue-outline-transition bg-creme block w-full py-2 px-3 rounded-md"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <button 
                    type="submit"
                    disabled={password.length === 0}
                    className="shadow-sm rounded-3xl pl-6 pr-8 py-2 my-2 ml-4 bg-blue button-transition text-white flex"
                  >
                    <span className="ml-1">Yes, I understand</span>
                  </button>
                </div>
              </form>
            </div>
          </>
        )}

        { stage === 2 && (
          <>
            <div className="card-content pb-6 text-center">
              <MdWavingHand className="h-16 w-16 mx-auto mb-4 mt-6 opacity-50"/>
              <p className="py-6">
                Thank you for having us as a part of your coffee journey!
              </p>
              <form onSubmit={deleteAccount}>
                <div className="card-content w-80 mx-auto mb-4">
                </div>
                <div className="flex items-center justify-center">
                  <button 
                    type="submit"
                    className="shadow-sm rounded-3xl pl-6 pr-8 py-2 my-2 ml-4 bg-blue button-transition text-white flex"
                  >
                    <span className="ml-1">Delete Account</span>
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

export default DeleteAccountModal