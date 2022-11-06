import axios from './CustomAxios'

export const findUser = async (userid, token) => {
  return await axios.get(`/user`, { headers: { accesstoken: token }, params: { id: userid } })
                    .then(res => res.data)
                    .catch(error => {
                      if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                      } else if (error.request) {
                        // The request was made but no response was received
                        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                        // http.ClientRequest in node.js
                        console.log(error.request);
                      } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                      }
                    });
}

export const getUser = async (userid, token) => {
  return await axios.get(`/user/${userid}`, { headers: { accesstoken: token } }).then(res => res.data);
}

export const getUserTotalUsedMb = async (userid, token) => {
  return await axios.get(`/user/${userid}/total-used-mb`, { headers: { accesstoken: token } }).then(res => res.data);
}

export const getUserInfo = async (userid, token) => {
  return await axios.get(`/user/${userid}/info`, { headers: { accesstoken: token } }).then(res => res.data);
}

export const editUserUnitIds = async (userid, body, token) => {
  return await axios.post(`/user/${userid}/unit-ids`, body, { headers: { accesstoken: token } }).then(res => res.data);
}

export const addUser = async (userid, body, token) => {
  return await axios.post(`/user/${userid}`, body, { headers: { accesstoken: token } }).then(res => res.data)
}

