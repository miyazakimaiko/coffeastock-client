import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom';
import { TO_LOGIN, TO_SERVER_ERROR, TO_GENERAL_ERROR } from '../utils/Paths';
import toastOnBottomCenter from '../utils/customToast'
import { useSignout } from '../context/AccountContext'
import * as api from '../api/Hubspot'

export default function useAddContact() {
  const signout = useSignout();
  const navigate = useNavigate();

  return useMutation(
    async (body) => await api.addContact(body),
    {
      onSuccess: () => toastOnBottomCenter('success', 'Contqct is added'),
      onError: err => {
        toastOnBottomCenter('error', err.message)
      }
    }
  )
}