import reactDom from "react-dom";
import "./Styles/tailwind.css";
import { BrowserRouter, Route, Switch,useParams } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import TableTailwind from "./Pages/TableTest";
import Details from "./Pages/Details";
import NotFoundPage from "./Components/404ErrorPage";
import QueryParameters from "./Pages/QueryParameters";

import ListSanPham from "./Pages/SanPham/ListSanPham";
import CreateBrand from "./Pages/SanPham/BackupThemSanPham";
import Welcome from "./Components/TestProps";
import ChiTietSanPham from "./Pages/SanPham/ChiTietSanPham"
import EditSanPham from "./Pages/SanPham/EdiSanPham";
import 'flowbite';
import ThemSanPham from "./Pages/SanPham/ThemSanPham";
import UploadImage from "./Pages/SanPham/UploadAnhTest";
import ListLoaiSanPham from './Pages/LoaiSanPham/ListLoaiSanPham';
import ListHangSanXuat from './Pages/HangSanXuat/ListHangSanXuat'
import ListNhanVien from './Pages/NhanVien/ListNhanVien'
import ListKhachHang from './Pages/KhachHang/ListKhachHang'
import ListLichSuGiaCa from './Pages/LichSuGiaCa/ListLichSuGiaCa'




// https://v5.reactrouter.com/web/example/basic React Router Example
reactDom.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" children={<Dashboard />} />

            <Route exact path="/table" children={<TableTailwind />} />

            <Route exact path="/chi-tiet-san-pham/:id" children={<ChiTietSanPham />} />

            <Route exact path="/queryparams" children={<QueryParameters/>} />

            <Route exact path="/san-pham/:pageNumber" children={<ListSanPham/>} />

            <Route exact path="/edit-san-pham/:id" children={<EditSanPham   />} />

            <Route exact path="/them-san-pham/" children={<ThemSanPham   />} />

            <Route exact path="/danh-muc-san-pham/:pageNumber" children={<ListLoaiSanPham   />} />

            <Route exact path="/hang-san-xuat/:pageNumber" children={<ListHangSanXuat   />} />

            <Route exact path="/nhan-vien/:pageNumber" children={<ListNhanVien   />} />

            <Route exact path="/khach-hang/:pageNumber" children={<ListKhachHang   />} />

            <Route exact path="/bien-dong-gia-ca/:pageNumber" children={<ListLichSuGiaCa   />} />

            <Route exact path="/them_san_pham" children={<CreateBrand/>} />

            <Route exact path="/them-anh-test" children={<UploadImage/>} />

            <Route exact path="/prop_test" children={<Welcome name="Sara" />} />

            <Route path="*" children={<NotFoundPage/>}  / >

            
        </Switch>
    </BrowserRouter>, document.getElementById("root"));

