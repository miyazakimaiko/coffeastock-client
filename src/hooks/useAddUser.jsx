import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom';
import { TO_LOGIN, TO_SERVER_ERROR, TO_GENERAL_ERROR } from '../utils/Paths';
import toastOnBottomCenter from '../utils/customToast'
import { useSignout } from '../context/AccountContext'
import * as api from '../api/Users'

export default function useAddUser() {
  const signout = useSignout();
  const navigate = useNavigate();

  return useMutation(
    async (user) => await api.addUser(user.sub, user.contactid, user.accessToken.jwtToken),
    {
      onSuccess: () => toastOnBottomCenter('success', 'Welcome to Coffeeastock!'),
      onError: err => {
        if (err.message === 'Not authorized') {
          signout();
          navigate(TO_LOGIN, { replace: true } );
        }
        else if (err.message === 'Network Error') {
          navigate(TO_SERVER_ERROR, { replace: true } );
        }
        else {
          navigate(TO_GENERAL_ERROR, { replace: true } );
        }
      }
    }
  )
}