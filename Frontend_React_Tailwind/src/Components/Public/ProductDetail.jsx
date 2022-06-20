import {useParams} from 'react-router-dom';
import TrangChiTietSanPhamApi from '../../Api/Public/TrangChiTietSanPhamApi';
import {useState, useEffect} from 'react';
import axios from 'axios';
import CommentForm from './CommentForm';

export default function ProductDetail() {
  let {id} = useParams();
  const [state, setState] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    //Check NhanVien to block button thêm vào giỏ hàng
    axios.get('https://localhost:7216/api/LoginNhanVien/validateToken', configJWT).then(res => {
      setIsAdmin(true);
    })
    // Get chi tiet san pham
    TrangChiTietSanPhamApi.getChiTietSanPham(id)
      .then(res => {
        setState({
          data: res.data.chiTietSanPham,
          image: res.data.danhSachAnh,
          imageSlide: res.data.danhSachAnh[0],
          done: true
        });
      })
      .catch(err => {
        setState({
          error: err,
          done: false
        });
      });
  }, []);

  const configJWT = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  };

  const themGioHang = maSanPham => {
    const formData = new FormData();
    formData.append('maSanPham', maSanPham);
    formData.append('soLuong', 1);
    axios
      .post('https://localhost:7216/api/GioHang/ThemGioHang', formData, configJWT)
      .then(res => {
        alert('Đã thêm vào giỏ hàng thành công');
      })
      .catch(err => {
        alert('Sản phẩm này đã tồn tại trong giỏ hàng');
      });
  };

  if (state.done) {
    return (
      <>
        <section className='text-gray-600 body-font overflow-hidden'>
          <div className='container px-5 py-24 mx-auto'>
            <div className='flex flex-row'>
              <div className='lg:basis-2/4'>
                <img
                  alt='ecommerce'
                  className='m-auto h-3/5  w-96 h-96 object-cover object-center rounded'
                  src={state.imageSlide}
                />
                <div className='flex flex-row mt-3  justify-center space-x-4 font-mono text-white text-sm font-bold leading-6'>
                  {state.image !== null ? (
                    state.image.map(item => (
                      <img
                        alt='ecommerce'
                        className='w-48 h-48 object-cover object-center rounded'
                        src={item}
                        onClick={() => setState({...state, imageSlide: item})}
                      />
                    ))
                  ) : (
                    <p>Đang load ảnh thu nhỏ</p>
                  )}
                </div>
              </div>
              <div className='lg:basis-2/4 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0'>
                <h2 className='title-font text-sm tracking-widest text-gray-500 font-bold italic'>{state.data.hangSanXuat}</h2>
                <h1 className='title-font mb-1 text-3xl font-medium text-gray-900'>{state.data.tenSanPham}</h1>
                <div className='flex mb-4'>
                  <span className='flex items-center'>
                    <span className='ml-3 text-indigo-500 font-bold'>{state.data.loaiSanPham}</span>
                  </span>
                </div>
                <div className='leading-relaxed px-3 border-x-2 border-y-4'>
                  <ul class='list-inside  text-slate-900 divide-y-8'>
                    <li className='p-3'>CPU: {state.data.cpu}</li>
                    <li className='p-3'>Card đồ họa: {state.data.cardDoHoa}</li>
                    <li className='p-3'>Độ phân giải: {state.data.doPhanGiai}</li>
                    <li className='p-3'>Ổ cứng: {state.data.oCung}</li>
                    <li className='p-3'>Hệ điều hành: {state.data.heDieuHanh}</li>
                    <li className='p-3'>Kích Thước: {state.data.kichThuoc}</li>
                    <li className='p-3'>Màn hình: {state.data.manHinh}</li>
                    <li className='p-3'>Trọng lượng: {state.data.trongLuong}</li>
                    <li className='p-3'>RAM: {state.data.ram}</li>
                    <li className='p-3'>Mô tả thêm: {state.data.moTaThem}</li>
                  </ul>
                </div>
                <div className='flex justify-center mt-3'>
                  <span className='title-font text-red-500 font-semibold text-2xl'>
                    Giá: {state.data.giaNiemYet} VND
                  </span>
                  {isAdmin ? (
                    ''
                  ) : (
                    <button
                      onClick={() => themGioHang(state.data.maSanPham)}
                      className='flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded'>
                      Thêm vào giỏ hàng
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        <CommentForm maSanPham={id} />
      </>
    );
  }
}
