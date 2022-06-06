const axios = require('axios')
const { base_url, backend_main_route, backend_img_route, configJWT } = require('../config')
    //TODO URL chính cho loại sản phẩm
const mainURL = `${base_url}/${backend_main_route.danhMucSanPhamBaseURL}`
class LoaiSanPhamApi {

    // TODO Lấy danh sách loại sản phẩm và tổng số trang cần phân trang
    getListloaiSanPham(pageNumber) {
            const chucNang = 'ListDanhMucSanPham'
            return axios.get(`${mainURL}/${chucNang}?page=${pageNumber}`, configJWT)
        }
        //TODO Thêm loại sản phẩm
    themloaiSanPham(formData) {
        const chucNang = `ThemloaiSanPham`
        return axios.post(`${mainURL}/${chucNang}`, formData, configJWT)
    }

    //TODO load ảnh minh họa
    loadAnhMinhHoa() {
        return `${backend_img_route}/LoaiSanPham`
    }

    //TODO sữa ảnh loại sản phẩm
    suaAnhLoaiSanPham(id, formData) {
        const chucNang = `SuaAnhLoaiSanPham`
        return axios.put(`${mainURL}/${chucNang}/${id}`, formData, configJWT)
    }

    //TODO Sữa tên loại sản phẩm
    suaTenLoaiSanPham(id, formData) {
        const chucNang = `SuaTenLoaiSanPham`
        return axios.put(`${mainURL}/${chucNang}/${id}`, formData, configJWT)
    }

    //TODO lấy toàn bộ loại sản phẩm
    getAllLoaiSanPham() {
        const chucNang = `ListDanhMucSanPham?allRecord=true`
        return axios.get(`${mainURL}/${chucNang}`, configJWT)
    }

    //TODO Lấy loại sản phẩm cụ thể 
    getLoaiSanPhamSingle(id) {
        const chucNang = `GetSingleDanhMuc`
        return axios.get(`${mainURL}/${chucNang}?id=${id}`, configJWT)
    }

}

export default new LoaiSanPhamApi();