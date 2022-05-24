const axios = require('axios')
const {base_url,backend_main_route,backend_img_route} = require('../config')
//TODO URL chính cho loại sản phẩm
const mainURL= `${base_url}/${backend_main_route.danhMucSanPhamBaseURL}`
class loaiSanPhamApi {

     // TODO Lấy danh sách loại sản phẩm và tổng số trang cần phân trang
     getListloaiSanPham (pageNumber)  {
         const chucNang = 'ListDanhMucSanPham'
        return axios.get(`${mainURL}/${chucNang}?page=${pageNumber}`)
     }
     themloaiSanPham (formData) {
         const chucNang = `ThemloaiSanPham`
        return axios.post(`${mainURL}/${chucNang}`,formData)
     }

     loadAnhMinhHoa () {
         return `${backend_img_route}/LoaiSanPham`
     }

     suaAnhLoaiSanPham (id,formData) {
         const chucNang = `SuaAnhLoaiSanPham`
         return axios.put(`${mainURL}/${chucNang}/${id}`,formData)
     }
}

export default new loaiSanPhamApi();

