import axios from './CustomAxios'

export const addContact = async (body, token) => {
  return await axios.post("/hubspot/contact", body, { headers: { accesstoken: token } }).then(res => res.data)
}

export const updateContact = async (userid, body, token) => {
  return await axios.put(`/hubspot/contact/${userid}`, body, { headers: { accesstoken: token } }).then(res => res.data)
}

export const deleteContact = async (userid, token) => {
  return await axios.delete(`/hubspot/contact/${userid}`, {}, { headers: { accesstoken: token } }).then(res => res.data)
}