import axios from './CustomAxios';

export const sendFeedback = async (userid, body, token) => {
  return await axios.post(`/feedback/${userid}`, body, { headers: { accesstoken: token } }).then(res => res.data)
}