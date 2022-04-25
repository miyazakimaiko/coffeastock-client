import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:4000/api/v1',
})

export const getBean = async (userid, beanid) => await api.get(`/user/${userid}/bean/${beanid}`).then(res => res.data)

export const getBeans = async (userid) => await api.get(`/user/${userid}/beans`).then(res => res.data)

export const addBean = async (userid, body) => await api.post(`/user/${userid}/bean`, body).then(res => res.data)

export const editBean = async (userid, body) => await api.post(`/user/${userid}/bean/${body.bean_id}`, body).then(res => res.data)

export const deleteBean = async (userid, beanid) => await api.delete(`/user/${userid}/bean/${beanid}`).then(res => res.data)
