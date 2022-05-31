const axios = require('axios')
const {base_url,backend_main_route,backend_img_route} = require('../config')
//TODO URL chính cho loại sản phẩm
const mainURL= `${base_url}/${backend_main_route.danhMucSanPhamBaseURL}`
class LoaiSanPhamApi {

     // TODO Lấy danh sách loại sản phẩm và tổng số trang cần phân trang
     getListloaiSanPham (pageNumber)  {
         const chucNang = 'ListDanhMucSanPham'
        return axios.get(`${mainURL}/${chucNang}?page=${pageNumber}`)
     }
     //TODO Thêm loại sản phẩm
     themloaiSanPham (formData) {
         const chucNang = `ThemloaiSanPham`
        return axios.post(`${mainURL}/${chucNang}`,formData)
     }

     //TODO load ảnh minh họa
     loadAnhMinhHoa () {
         return `${backend_img_route}/LoaiSanPham`
     }

     //TODO sữa ảnh loại sản phẩm
     suaAnhLoaiSanPham (id,formData) {
         const chucNang = `SuaAnhLoaiSanPham`
         return axios.put(`${mainURL}/${chucNang}/${id}`,formData)
     }

     //TODO Sữa tên loại sản phẩm
     suaTenLoaiSanPham (id,formData) {
         const chucNang = `SuaTenLoaiSanPham`
         return axios.put(`${mainURL}/${chucNang}/${id}`,formData)
     }

     //TODO lấy toàn bộ loại sản phẩm
     getAllLoaiSanPham () {
         const chucNang = `ListDanhMucSanPham?allRecord=true`
         return axios.get(`${mainURL}/${chucNang}`)
     }

     //TODO Lấy loại sản phẩm cụ thể 
     getLoaiSanPhamSingle (id) {
         const chucNang = `GetSingleDanhMuc`
         return axios.get(`${mainURL}/${chucNang}?id=${id}`)
     }

}

export default new LoaiSanPhamApi();

