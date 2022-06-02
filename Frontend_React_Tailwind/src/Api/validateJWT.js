const axios = require('axios')
const {base_url} = require('./config')
export default function validateJWT() {
  return axios.post(`${base_url}/LoginNhanVien/validateToken`)
}