const axios = require('axios')
const { base_url, configJWT } = require('./config')
export default function validateJWT() {
    return axios.get(`${base_url}/LoginNhanVien/validateToken`, configJWT)
}