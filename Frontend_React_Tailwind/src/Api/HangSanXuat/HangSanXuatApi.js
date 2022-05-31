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

     // TODO Sữa tên hãng sản xuất
     editNameHangSanXuat (id,name) {
        const chucNang = `SuaTenHangSanXuat`
        const formData = new FormData()
        formData.append("tenHangSX",name)
        return axios.put(`${mainURL}/${chucNang}/${id}`,formData)
     }

     //TODO Sữa ảnh hãng sản xuất
     editImageHangSanXuat (id,image) {
        const chucNang = `SuaAnhHangSanXuat`
        const formData = new FormData()
        formData.append("image",image)
        return axios.put(`${mainURL}/${chucNang}/${id}`,formData)
     }

     //TODO Lấy cụ thể hãng sản xuất
     getSingleHangSanXuat (id) {
        const chucNang = `GetSingleHangSanXuat`
        return axios.get(`${mainURL}/${chucNang}/?id=${id}`)
     }

     
}

export default new HangSanXuatApi();

