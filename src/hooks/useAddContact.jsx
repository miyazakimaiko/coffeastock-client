import { useMutation } from 'react-query'
import toastOnBottomCenter from '../utils/customToast'
import * as api from '../api/Hubspot'

export default function useAddContact() {
  return useMutation(
    async (user) => await api.addContact({
      userid: user.sub,
      nickname: user.nickname,
      email: user.email,
    }, user.accessToken.jwtToken),
    {
      onSuccess: () => toastOnBottomCenter('success', 'Contqct is added'),
      onError: err => {
        toastOnBottomCenter('error', err.message)
      }
    }
  )
}