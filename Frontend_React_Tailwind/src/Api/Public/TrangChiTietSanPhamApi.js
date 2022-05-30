const axios = require('axios')
const mainURL = `https://localhost:7216/api/TrangChiTietSanPham`

class TrangChiTietSanPhamApi  {
    getChiTietSanPham (id) {
        return axios.get(`${mainURL}/ChiTietSanPham/?id=${id}`)
    }


}

export default new TrangChiTietSanPhamApi();