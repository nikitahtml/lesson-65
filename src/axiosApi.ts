import axios from 'axios';

const axiosApi = axios.create({
  baseURL: 'https://control-64-default-rtdb.europe-west1.firebasedatabase.app/',
});

export default axiosApi;
