import axios from './CustomAxios';

export const queueToDeleteAccount = async (userid, body, token) => {
  return await axios.post(`/user/${userid}/delete-request`, body, { headers: { accesstoken: token } }).then(res => res.data)
}
