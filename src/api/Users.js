import axios from './CustomAxios'

export const findUser = async (userid, token) => {
  return await axios.get(`/user`, { headers: { accesstoken: token }, params: { id: userid } }).then(res => res.data);
}

export const getUser = async (userid, token) => {
  return await axios.get(`/user/${userid}`, { headers: { accesstoken: token } }).then(res => res.data);
}

export const getUserTotalUsedMb = async (userid, token) => {
  return await axios.get(`/user/${userid}/total-used-mb`, { headers: { accesstoken: token } }).then(res => res.data);
}

export const getUserInfo = async (userid, token) => {
  return await axios.get(`/user/${userid}/info`, { headers: { accesstoken: token } }).then(res => res.data);
}

export const editUserUnitIds = async (userid, body, token) => {
  return await axios.post(`/user/${userid}/unit-ids`, body, { headers: { accesstoken: token } }).then(res => res.data);
}

export const addUser = async (userid, contactid, token) => {
  return await axios.post(`/user/${userid}`, {contactid}, { headers: { accesstoken: token } }).then(res => res.data)
}

