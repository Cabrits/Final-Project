// config.js
const apiURL = process.env.NODE_ENV === 'production' ? 'https://your-production-url.com/api' : 'http://localhost:7777/api';
export default apiURL;