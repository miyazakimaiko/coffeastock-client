import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:4000/api/v1',
})

export const getRanges = (userid) => api.get(`/user/${userid}/ranges`).then(res => res.data)

export const getRange = (userid, range) => api.get(`/user/${userid}/range/${range}`).then(res => res.data)

export const editRange = (userid, range, rangeId, body) => {
  // const encodedBody = body.replace(/(\r\n|\n|\r)/gm, " ")
  api.post(`/user/${userid}/range/${range}/${rangeId}`, body).then(res => res.data)
}