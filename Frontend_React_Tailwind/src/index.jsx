import reactDom from "react-dom";
import "./Styles/tailwind.css";
import { BrowserRouter, Route, Switch,useParams } from "react-router-dom";
import Dashboard from "./Pages/Admin/Dashboard";
import NotFoundPage from "./Components/404ErrorPage";
import ListSanPham from "./Pages/Admin/SanPham/ListSanPham";
import CreateBrand from "./Pages/Admin/SanPham/BackupThemSanPham";
import ChiTietSanPham from "./Pages/Admin/SanPham/ChiTietSanPham"
import EditSanPham from "./Pages/Admin/SanPham/EditSanPham";
import ThemSanPham from "./Pages/Admin/SanPham/ThemSanPham";
import ListLoaiSanPham from './Pages/Admin/LoaiSanPham/ListLoaiSanPham';
import ListHangSanXuat from './Pages/Admin/HangSanXuat/ListHangSanXuat'
import ListNhanVien from './Pages/Admin/NhanVien/ListNhanVien'
import ListKhachHang from './Pages/Admin/KhachHang/ListKhachHang'
import ListLichSuGiaCa from './Pages/Admin/LichSuGiaCa/ListLichSuGiaCa'
import  XoaSanPham from './Pages/Admin/SanPham/XoaSanPham'
import ThemLoaiSanPham from './Pages/Admin/LoaiSanPham/ThemLoaiSanPham'
import ThemHangSanXuat from "./Pages/Admin/HangSanXuat/ThemHangSanXuat";
import HomePage from "./Pages/Public/TrangChu/index"
import ChiTietSanPhamPublic from "./Pages/Public/ChiTietSanPham/index"

// https://v5.reactrouter.com/web/example/basic React Router Example
reactDom.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" children={<Dashboard />} />

            <Route exact path="/chi-tiet-san-pham/:id" children={<ChiTietSanPham />} />

            <Route exact path="/san-pham/:pageNumber" children={<ListSanPham/>} />

            <Route exact path="/edit-san-pham/:id" children={<EditSanPham   />} />

            <Route exact path="/them-san-pham/" children={<ThemSanPham   />} />

            <Route exact path="/danh-muc-san-pham/:pageNumber" children={<ListLoaiSanPham   />} />

            <Route exact path="/hang-san-xuat/:pageNumber" children={<ListHangSanXuat   />} />

            <Route exact path="/nhan-vien/:pageNumber" children={<ListNhanVien   />} />

            <Route exact path="/khach-hang/:pageNumber" children={<ListKhachHang   />} />

            <Route exact path="/bien-dong-gia-ca/:pageNumber" children={<ListLichSuGiaCa   />} />

            <Route exact path="/delete-san-pham/:id" children={<XoaSanPham   />} />

            <Route exact path="/them_san_pham" children={<CreateBrand/>} />

            <Route exact path="/them_loai_san_pham" children={<ThemLoaiSanPham/>} />

            <Route exact path="/them_hang_san_xuat" children={<ThemHangSanXuat/>} />
            
            <Route exact path="/public/trang-chu" children={<HomePage/>} />

            <Route exact path="/public/san-pham/:id" children={<ChiTietSanPhamPublic/>} />

            <Route path="*" children={<NotFoundPage/>}  / >

            
        </Switch>
    </BrowserRouter>, document.getElementById("root"));

