import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom';
import { TO_LOGIN, TO_SERVER_ERROR, TO_GENERAL_ERROR } from '../utils/Paths';
import { useSignout } from '../context/AccountContext';
import * as api from '../api/Acount'

export default function useQueueToDeleteAccount() {
  const signout = useSignout();
  const navigate = useNavigate();

  return useMutation(
    async ({user, body}) => {
      await api.queueToDeleteAccount(user.username, body, user.signInUserSession.accessToken.jwtToken)
    },
    {
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
      },
    }
  )
}