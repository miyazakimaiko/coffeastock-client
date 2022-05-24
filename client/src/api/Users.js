import axios from './CustomAxios'

export const addUser = async (userid, body) => await axios.post(`/user/${userid}`, body).then(res => res.data)