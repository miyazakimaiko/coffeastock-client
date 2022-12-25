import axios from './CustomAxios'

export const addContact = async (body, token) => {
  return await axios.post("/hubspot/contact", body, { headers: { accesstoken: token } }).then(res => res.data)
}
