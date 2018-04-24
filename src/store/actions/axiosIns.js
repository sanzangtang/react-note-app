import axios from 'axios';

// create an axios instance
const axiosIns = axios.create({
  baseURL: 'https://note-app-69c68.firebaseio.com/'
});

export default axiosIns;
