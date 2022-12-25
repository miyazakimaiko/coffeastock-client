import { useMutation } from 'react-query'
import * as api from '../api/Hubspot'

export default function useAddContact() {
  return useMutation(
    async (user) => await api.addContact({
      userid: user.sub,
      nickname: user.nickname,
      email: user.email,
    }, user.accessToken.jwtToken),
    {
      onError: err => console.error(err)
    }
  )
}