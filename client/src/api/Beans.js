import axios from './CustomAxios'

export const getBean = async (userid, beanid) => await axios.get(`/user/${userid}/bean/${beanid}`).then(res => res.data)

export const getBeans = async (userid) => await axios.get(`/user/${userid}/beans`).then(res => res.data)

export const addBean = async (userid, body) => await axios.post(`/user/${userid}/bean`, body).then(res => res.data)

export const editBean = async (userid, body) => await axios.post(`/user/${userid}/bean/${body.bean_id}`, body).then(res => res.data)

export const deleteBean = async (userid, body) => await axios.post(`/user/${userid}/bean/delete/${body.bean_id}`, body).then(res => res.data)
