import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:4000/api/v1',
})

export const getRanges = async (userid) => await api.get(`/user/${userid}/ranges`).then(res => res.data)

export const getRange = async (userid, range) => await api.get(`/user/${userid}/range/${range}`).then(res => res.data)

export const editRange = async (userid, range, rangeid, body) => await api.post(`/user/${userid}/range/${range}/${rangeid}`, body).then(res => res.data)

export const addRange = async (userid, range, body) => await api.post(`/user/${userid}/range/${range}`, body).then(res => res.data)

export const isRangeInUse = async (userid, range, rangeid) => await api.get(`/user/${userid}/range/${range}/${rangeid}/isinuse`).then(res => res.data)

export const deleteRange = async (userid, range, rangeid) => await api.delete(`/user/${userid}/range/${range}/${rangeid}`).then(res => res.data)