import 'flowbite';
import reactDom from 'react-dom';
import './Styles/tailwind.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NotFoundPage from './Components/404ErrorPage';
import ListSanPham from './Pages/Admin/SanPham/ListSanPham';
import ChiTietSanPham from './Pages/Admin/SanPham/ChiTietSanPham';
import EditSanPham from './Pages/Admin/SanPham/EditSanPham';
import ThemSanPham from './Pages/Admin/SanPham/ThemSanPham';
import ListLoaiSanPham from './Pages/Admin/LoaiSanPham/ListLoaiSanPham';
import ListHangSanXuat from './Pages/Admin/HangSanXuat/ListHangSanXuat';
import ListNhanVien from './Pages/Admin/NhanVien/ListNhanVien';
import ListKhachHang from './Pages/Admin/KhachHang/ListKhachHang';
import ListLichSuGiaCa from './Pages/Admin/LichSuGiaCa/ListLichSuGiaCa';
import XoaSanPham from './Pages/Admin/SanPham/XoaSanPham';
import ThemLoaiSanPham from './Pages/Admin/LoaiSanPham/ThemLoaiSanPham';
import ThemHangSanXuat from './Pages/Admin/HangSanXuat/ThemHangSanXuat';
import HomePage from './Pages/Public/TrangChu/index';
import ChiTietSanPhamPublic from './Pages/Public/ChiTietSanPham/index';
import EditLoaiSanPham from './Pages/Admin/LoaiSanPham/EditLoaiSanPham';
import EditHangSanXuat from './Pages/Admin/HangSanXuat/EditHangSanXuat';
import DangKy from './Pages/Public/DangKy/DangKy';

// https://v5.reactrouter.com/web/example/basic React Router Example
reactDom.render(
  <BrowserRouter>
    <Switch>
      <Route exact path='/' children={<HomePage />} />

      {/* Admin Quản lý sản phẩm */}
      <Route exact path='/admin' children={<ListSanPham />} />
      <Route exact path='/admin/chi-tiet-san-pham/:id' children={<ChiTietSanPham />} />

      <Route exact path='/admin/san-pham/:pageNumber' children={<ListSanPham />} />

      <Route exact path='/admin/edit-san-pham/:id' children={<EditSanPham />} />

      <Route exact path='/admin/them-san-pham/' children={<ThemSanPham />} />

      <Route exact path='/admin/xoa-san-pham/:id' children={<XoaSanPham />} />

      {/* Admin Quản lý danh mục sản phẩm */}

      <Route exact path='/admin/danh-muc-san-pham/:pageNumber' children={<ListLoaiSanPham />} />

      <Route exact path='/admin/them-danh-muc-san-pham' children={<ThemLoaiSanPham />} />

      <Route exact path='/admin/sua-danh-muc-san-pham/:id' children={<EditLoaiSanPham />} />

      {/* Admin Quản lý hãng sản xuất */}

      <Route exact path='/admin/list-hang-san-xuat/:pageNumber' children={<ListHangSanXuat />} />

      <Route exact path='/admin/them-hang-san-xuat' children={<ThemHangSanXuat />} />

      <Route exact path='/admin/edit-hang-san-xuat/:id' children={<EditHangSanXuat />} />

      {/* Admin Quản lý nhân viên */}

      <Route exact path='/admin/list-nhan-vien/:pageNumber' children={<ListNhanVien />} />

      {/* Admin Quản lý khách hàng */}

      <Route exact path='/admin/list-khach-hang/:pageNumber' children={<ListKhachHang />} />

      {/* Admin Quản lý biến động giá cả */}
      <Route exact path='/admin/list-bien-dong-gia-ca/:pageNumber' children={<ListLichSuGiaCa />} />

      {/* Public */}
      <Route exact path='/public/trang-chu' children={<HomePage />} />

      <Route exact path='/public/dang-ky' children={<DangKy />} />

      <Route exact path='/public/san-pham/:id' children={<ChiTietSanPhamPublic />} />

      {/* Khách Hàng */}
      {/* <Route exact path="/khach-hang/gio-hang" children=GioH  /> */}

      <Route path='*' children={<NotFoundPage />} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
