const axios = require('axios')
const {base_url,backend_main_route} = require('../config')

 // TODO Lấy danh sách hãng sản xuất và tổng số trang cần phân trang
 const getListHangSanXuat = (pageNumber) => {
    axios.get(`${base_url}/${backend_main_route.hangSanXuatBaseURL}/ListHangSanXuat?page=${pageNumber}`)
    .then(res => {
        return {
            "listHangSanXuat" : res.data.ketQua,
            "numberOfPages" : res.data.tongSoTrang
        }
    })
    .catch(error => console.log(error));
    console.log("Hello bro");
    return `${pageNumber}`
 }

export default getListHangSanXuat

