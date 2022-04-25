import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:4000/api/v1',
})

export const getRanges = async (userid) => await api.get(`/user/${userid}/ranges`).then(res => res.data)

export const getRange = async (userid, range) => await api.get(`/user/${userid}/range/${range}`).then(res => res.data)

export const editRange = async (userid, range, rangeId, body) => {
  await api.post(`/user/${userid}/range/${range}/${rangeId}`, body).then(res => res.data)
}