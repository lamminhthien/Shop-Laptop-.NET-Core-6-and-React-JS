const axios = require('axios')
const mainURL = `https://localhost:7216/api/KhachHang`

class DangKyTaiKhoan {
    dangKyTaiKhoan = (formData) => {
        return axios.post(`${mainURL}/DangKyKhachHang`, formData)
    }
}

export default new DangKyTaiKhoan();