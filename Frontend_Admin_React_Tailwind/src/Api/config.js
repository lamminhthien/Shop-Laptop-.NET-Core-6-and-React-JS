
// Backend Base URL
const base_url = "https://localhost:7216/api"
const backend_main_route = {
    "hangSanXuatBaseURL" : "QuanLyHangSanXuat",
    "danhMucSanPhamBaseURL" : "QuanLyDanhMucSanPham",
    "sanPhamBaseURL" : "QuanLySanPham",
    "UploadAnhBaseURL" : "UploadAnh",
    "khachHangBaseURL" : "QuanLyKhachHang",
    "nhanVienBaseURL" : "QuanLyNhanVien",
    "bienDongGiaCaBaseURL" : "BienDongGiaCa",
    "loginNhanVien" : "LoginNhanVien"
}
const testting = () => {
    console.log('hello thien');
}

module.exports = {base_url,backend_main_route,testting}

