import axios from './CustomAxios'

export const getRssFeed = async (token) => {
  return await axios.get(`/rss-feed`, { headers: { accesstoken: token } }).then(res => res.data);
}