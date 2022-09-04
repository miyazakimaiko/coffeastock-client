import axios from './CustomAxios'

export const getBean = async (userid, beanid, token) => {
  return await axios.get(`/user/${userid}/bean/${beanid}`, { headers: { accesstoken: token } }).then(res => res.data)
}

export const getBeans = async (userid, token) => {
  return await axios.get(`/user/${userid}/beans`, { headers: { accesstoken: token } }).then(res => res.data)
}

export const getBeansSummary = async (userid, token) => {
  return await axios.get(`/user/${userid}/beans-summary`, { headers: { accesstoken: token } }).then(res => res.data)
}

export const addBean = async (userid, body, token) => {
  return await axios.post(`/user/${userid}/bean`, body, { headers: { accesstoken: token } }).then(res => res.data)
}

export const editBean = async (userid, body, token) => {
  return await axios.post(`/user/${userid}/bean/${body.bean_id}`, body, { headers: { accesstoken: token } }).then(res => res.data)
}

export const deleteBean = async (userid, body, token) => {
  return await axios.post(`/user/${userid}/bean/delete/${body.bean_id}`, body, { headers: { accesstoken: token } }).then(res => res.data)
}
