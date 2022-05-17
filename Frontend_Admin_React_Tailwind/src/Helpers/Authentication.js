import axios from 'axios';

// Hàm kiểm tra đăng nhập = gửi request đến backend2
export default function isAuthorized() {
    // Cấu hình header để đọc JWT từ localStorage
    const config = {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    };
    // Truy cập vào trang có bảo mật, ví dụ trang danh sách sản phẩm đang quản lý của nhân viên
    axios.get("https://localhost:44372/api/User/Admins", config).then(res => {
        alert('ok')
        return true
    }, err => {
        alert('false')
        return false
    })
}





