import axios from 'axios';

const Api = axios.create({
  baseURL: 'https://ap-react.azurewebsites.net',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default Api;
