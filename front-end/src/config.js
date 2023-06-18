// config.js
const apiURL = process.env.NODE_ENV === 'production' ? 'https://vibevaultrestapi-d5eaa6432eb9.herokuapp.com/api' : 'http://localhost:7777/api';
export default apiURL;