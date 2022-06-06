const axios = require('axios')
const { base_url } = require('./config')
export default function LoginJWT(username, password) {
    const formData = new FormData();
    formData.append('username', username)
    formData.append('password', password)
    axios.post(`${base_url}/LoginNhanVien`, formData).then((res) => {
            localStorage.setItem('token', res.data)
            return true
        })
        .catch(err => {
            console.log(`Error while login`);
            return false
        })
}