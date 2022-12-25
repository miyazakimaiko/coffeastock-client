import { useMutation } from 'react-query'
import * as api from '../api/Hubspot'

export default function useUpdateContact() {
  return useMutation(
    async (user) => {
      const body = {};

      if (user.email) body.email = user.email;
      if (user.nickname) body.nickname = user.nickname;

      return await api.updateContact(user['custom:contact_id'], body, user.accessToken.jwtToken)
    },
    {
      onError: err => console.error(err)
    }
  )
}