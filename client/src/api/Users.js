import axios from './CustomAxios'

export const findUser = async (userid, token) => {
  return await axios.get(`/user/${userid}`, { headers: { accesstoken: token } }).then(res => res.data);
}

export const addUser = async (userid, body, token) => {
  return await axios.post(`/user/${userid}`, body, { headers: { accesstoken: token } }).then(res => res.data)
}