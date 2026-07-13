import axios from 'axios';

export default axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
