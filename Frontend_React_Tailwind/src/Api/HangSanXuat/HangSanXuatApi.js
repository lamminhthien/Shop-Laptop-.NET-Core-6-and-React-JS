const axios = require('axios')
const {base_url,backend_main_route,configJWT} = require('../config')
//TODO URL chính cho Thương hiệu
const mainURL= `${base_url}/${backend_main_route.hangSanXuatBaseURL}`
class HangSanXuatApi {

     // TODO Lấy danh sách Thương hiệu và tổng số trang cần phân trang
     getListHangSanXuat (pageNumber)  {
        const chucNang = 'ListHangSanXuat'
        return axios.get(`${mainURL}/${chucNang}?page=${pageNumber}`,configJWT)
     }
     // TODO Thêm Thương hiệu
     themHangSanXuat (formData) {
         const chucNang = `ThemHangSanXuat`
        return axios.post(`${mainURL}/${chucNang}`,formData,configJWT)
     }
     // TODO Lấy toàn bộ hãng sãn xuất
     getAllHangSanXuat () {
        const chucNang = 'ListHangSanXuat?allRecord=true'
        return axios.get(`${mainURL}/${chucNang}`,configJWT)
     }

     // TODO Sữa tên Thương hiệu
     editNameHangSanXuat (id,name) {
        const chucNang = `SuaTenHangSanXuat`
        const formData = new FormData()
        formData.append("tenHangSX",name)
        return axios.put(`${mainURL}/${chucNang}/${id}`,formData,configJWT)
     }

     //TODO Sữa ảnh Thương hiệu
     editImageHangSanXuat (id,image) {
        const chucNang = `SuaAnhHangSanXuat`
        const formData = new FormData()
        formData.append("image",image)
        return axios.put(`${mainURL}/${chucNang}/${id}`,formData,configJWT)
     }

     //TODO Lấy cụ thể Thương hiệu
     getSingleHangSanXuat (id) {
        const chucNang = `GetSingleHangSanXuat`
        return axios.get(`${mainURL}/${chucNang}/?id=${id}`,configJWT)
     }

     
}

export default new HangSanXuatApi();

