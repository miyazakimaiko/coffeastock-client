import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:4000/api/v1',
})

export const getBean = (userid, beanid) => api.get(`/user/${userid}/bean/${beanid}`).then(res => res.data)

export const getBeans = (userid) => api.get(`/user/${userid}/beans`).then(res => res.data)

export const addBean = (userid, body) => api.post(`/user/${userid}/bean`, body).then(res => res.data)

export const editBean = (userid, body) => api.post(`/user/${userid}/bean/${body.bean_id}`, body).then(res => res.data)

export const deleteBean = (userid, beanid) => api.delete(`/user/${userid}/bean/${beanid}`).then(res => res.data)
