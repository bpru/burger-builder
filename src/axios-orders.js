import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-60691.firebaseio.com/'
})

export default instance;