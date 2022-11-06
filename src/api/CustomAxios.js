import axios from 'axios';

const baseURL = process.env.REACT_APP_URL + process.env.REACT_APP_API_ENDPOINT;

const customAxios = axios.create({
  baseURL,
})

const requestHandler = request => {
  console.log("request: ", request)
  return request;
};

const responseHandler = response => {
  if (response.status === 401) {
      window.location = '/login';
  }
  return response;
};

const errorHandler = error => {
  if (error.response) {
    return Promise.reject(error.response.data.error)
  }
  return Promise.reject(error);
};

customAxios.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

customAxios.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

export default customAxios;