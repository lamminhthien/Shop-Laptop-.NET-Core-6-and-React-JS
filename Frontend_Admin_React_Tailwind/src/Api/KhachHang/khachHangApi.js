const axios = require('axios')
const {base_url,backend_main_route} = require('../config')
//TODO URL chính cho khách hàng
const mainURL = `${base_url}/${backend_main_route.khachHangBaseURL}`
class khachHangApi {
    getListKhachHang = (pageNumber) => {
        const chucNang = `ListKhachHang`
        return axios.get(`${mainURL}/${chucNang}/${pageNumber}`)
    }
}
export default new khachHangApi()