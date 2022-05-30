const axios = require('axios')
const mainURL = `https://localhost:7216/api/TrangChu`

class TrangChuApi  {
    getListLoaiSanPham () {
        return axios.get(`${mainURL}/ListLoaiSanPham`)
    }

    getListHangSanXuat () {
        return axios.get(`${mainURL}/ListHangSanXuat`)
    }

    getSanPhamByDefault (page) {
        if (page === undefined) page=1
        return axios.get(`${mainURL}/ListSanPhamDefault?page=${page}`)
    }
}

export default new TrangChuApi();