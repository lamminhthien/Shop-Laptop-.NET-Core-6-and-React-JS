const axios = require('axios')
const {base_url,backend_main_route} = require('../config')
//TODO URL chính cho hãng sản xuất
const mainURL= `${base_url}/${backend_main_route.hangSanXuatBaseURL}`
class HangSanXuatApi {

     // TODO Lấy danh sách hãng sản xuất và tổng số trang cần phân trang
     getListHangSanXuat (pageNumber)  {
        const chucNang = 'ListHangSanXuat'
        return axios.get(`${mainURL}/${chucNang}?page=${pageNumber}`)
     }
     // TODO Thêm hãng sản xuất
     themHangSanXuat (formData) {
         const chucNang = `ThemHangSanXuat`
        return axios.post(`${mainURL}/${chucNang}`,formData)
     }
     // TODO Lấy toàn bộ hãng sãn xuất
     getAllHangSanXuat () {
        const chucNang = 'ListHangSanXuat?allRecord=true'
        return axios.get(`${mainURL}/${chucNang}`)
     }

     
}

export default new HangSanXuatApi();

