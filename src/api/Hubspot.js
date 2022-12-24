import axios from './CustomAxios'

export const addContact = async (body) => {
  return await axios.post("/hubspot/contact", body, {}).then(res => res.data)
}
