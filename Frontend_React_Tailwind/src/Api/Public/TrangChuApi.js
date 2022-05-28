const axios = require('axios')
const mainURL = `https://localhost:7216/api/TrangChu`

class TrangChuApi  {
    getListLoaiSanPham () {
        return axios.get(`${mainURL}/ListLoaiSanPham`)
    }
}

export default new TrangChuApi();