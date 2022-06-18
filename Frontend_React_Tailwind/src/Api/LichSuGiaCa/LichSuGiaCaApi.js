const axios = require('axios')
const { base_url, backend_main_route, configJWT } = require('../config')
    //TODO URL chính cho giá cả
const mainURL = `${base_url}/${backend_main_route.bienDongGiaCaBaseURL}`
class LichSuGiaCaApi {
    getListLichSuGiaCa = (pageNumber) => {
        const chucNang = `ListBienDongGia`
        return axios.get(`${mainURL}/${chucNang}/${pageNumber}`, configJWT)
    }
}
export default new LichSuGiaCaApi()
