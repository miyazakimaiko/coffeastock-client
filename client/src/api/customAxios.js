import axios from 'axios'

const customAxios = axios.create({
  baseURL: 'http://localhost:4000/api/v1',
})

const requestHandler = request => {
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