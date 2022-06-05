import TrangChuApi from '../../Api/Public/TrangChuApi';
import ReceiveData from '../ReceiveData';
class ProductListService {
  filterProductByCategory(id) {
    let idInt = parseInt(id);
    let data = null;
    if (isNaN(idInt)) return ReceiveData.do('Trang bạn yêu cầu truy cập không hợp lệ', false);
    else {
      TrangChuApi.getSanPhamByCategory(idInt).then(res => {
        data = res;
      });
      if (data === null) return ReceiveData.do('Không có sản phẩm', false);
      return ReceiveData.do(data, true);
    }
  }
}

export default new ProductListService();
