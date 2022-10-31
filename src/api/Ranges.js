import axios from './CustomAxios'

export const getRanges = async (userid, token) => {
  return await axios.get(`/user/${userid}/ranges`, { headers: { accesstoken: token } }).then(res => res.data)
}

export const getRange = async (userid, range, token) => {
  return await axios.get(`/user/${userid}/range/${range}`, { headers: { accesstoken: token } }).then(res => res.data)
}

export const editRange = async (userid, range, rangeid, body, token) => {
  return await axios.post(`/user/${userid}/range/${range}/${rangeid}`, body, { headers: { accesstoken: token } }).then(res => res.data)
}

export const addRange = async (userid, range, body, token) => {
  return await axios.post(`/user/${userid}/range/${range}`, body, { headers: { accesstoken: token } }).then(res => res.data)
}

export const deleteRange = async (userid, range, body, token) => {
  return await axios.post(`/user/${userid}/range/${range}/delete/${body.value}`, body, { headers: { accesstoken: token } }).then(res => res.data)
}