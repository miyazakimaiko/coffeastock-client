import axios from './CustomAxios'

export const getUnits = async (token) => {
  return await axios.get(`/units`, { headers: { accesstoken: token } }).then(res => res.data);
}