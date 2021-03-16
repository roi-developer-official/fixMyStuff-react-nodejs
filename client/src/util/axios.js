const axios = require('axios');

let url = '/api'
const Axios = axios.default.create({
    baseURL: url
});



export { Axios};

