const axios = require('axios')
const {base_url,backend_main_route,configJWT} = require('../config')
//TODO URL chính cho Banner
const mainURL= `${base_url}/${backend_main_route.BannerBaseURL}`
class BannerApi {

     // TODO Lấy danh sách Banner và tổng số trang cần phân trang
     getListBanner (pageNumber)  {
        const chucNang = 'ListBanner'
        return axios.get(`${mainURL}/${chucNang}?page=${pageNumber}`,configJWT)
     }
     // TODO Thêm Banner
     themBanner (formData) {
         const chucNang = `ThemBanner`
        return axios.post(`${mainURL}/${chucNang}`,formData,configJWT)
     }
     // TODO Lấy toàn bộ hãng sãn xuất
     getAllBanner () {
        const chucNang = 'ListBanner?allRecord=true'
        return axios.get(`${mainURL}/${chucNang}`,configJWT)
     }

     // TODO Sữa tên Banner
     editNameBanner (id,name) {
        const chucNang = `SuaTenBanner`
        const formData = new FormData()
        formData.append("tenHangSX",name)
        return axios.put(`${mainURL}/${chucNang}/${id}`,formData,configJWT)
     }

     //TODO Sữa ảnh Banner
     editImageBanner (id,image) {
        const chucNang = `SuaAnhBanner`
        const formData = new FormData()
        formData.append("image",image)
        return axios.put(`${mainURL}/${chucNang}/${id}`,formData,configJWT)
     }

     //TODO Lấy cụ thể Banner
     getSingleBanner (id) {
        const chucNang = `GetSingleBanner`
        return axios.get(`${mainURL}/${chucNang}/?id=${id}`,configJWT)
     }

     
}

export default new BannerApi();

