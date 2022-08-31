import axios from './CustomAxios'

export const findUser = async (userid, token) => {
  return await axios.get(`/user`, { headers: { accesstoken: token }, params: { id: userid } }).then(res => res.data);
}

export const getUser = async (userData) => {
  return await axios.get(`/user/${userData.sub}`, { headers: { accesstoken: userData.accessToken.jwtToken } }).then(res => res.data);
}

export const getUserUnitIds = async (userid, token) => {
  return await axios.get(`/user/${userid}/unit-ids`, { headers: { accesstoken: token } }).then(res => res.data);
}

export const addUser = async (userid, body, token) => {
  return await axios.post(`/user/${userid}`, body, { headers: { accesstoken: token } }).then(res => res.data)
}

