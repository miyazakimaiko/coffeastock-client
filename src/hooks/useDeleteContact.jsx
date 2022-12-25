import { useMutation } from 'react-query'
import * as api from '../api/Hubspot'

export default function useDeleteContact() {
  return useMutation(
    async (user) => await api.deleteContact(user['custom:contact_id'], user.accessToken.jwtToken),
    {
      onError: err => console.error(err)
    }
  )
}