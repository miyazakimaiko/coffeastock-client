import axios from './customAxios'

export const getRanges = async (userid) => await axios.get(`/user/${userid}/ranges`).then(res => res.data)

export const getRange = async (userid, range) => await axios.get(`/user/${userid}/range/${range}`).then(res => res.data)

export const editRange = async (userid, range, rangeid, body) => await axios.post(`/user/${userid}/range/${range}/${rangeid}`, body).then(res => res.data)

export const addRange = async (userid, range, body) => await axios.post(`/user/${userid}/range/${range}`, body).then(res => res.data)

export const deleteRange = async (userid, range, body) => await axios.post(`/user/${userid}/range/${range}/delete/${body.value}`, body).then(res => res.data)