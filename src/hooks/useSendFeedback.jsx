import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom';
import { TO_LOGIN, TO_SERVER_ERROR, TO_GENERAL_ERROR } from '../utils/Paths';
import toastOnBottomCenter from '../utils/customToast'
import { useSignout, useUserData } from '../context/AccountContext'
import * as api from '../api/Feedback'

export default function useSendFeedback() {
  const user = useUserData();
  const signout = useSignout();
  const navigate = useNavigate();

  return useMutation(
    async (body) => await api.sendFeedback(user.sub, body, user.accessToken.jwtToken),
    {
      enabled: user ? true : false,
      onSuccess: () => toastOnBottomCenter('success', 'Thank you, your feedback is sent to the Coffeastock support.'),
      onError: err => {
        if (err.message === 'Not authorized') {
          signout();
          navigate(TO_LOGIN, { replace: true } );
        }
        else if (err.message === 'Network Error') {
          toastOnBottomCenter('error', 'Network Error. Please try again later.');
        }
        else {
          toastOnBottomCenter('error', 'Failed to send the feedback. Please try again later.');
        }
      }
    }
  )
}