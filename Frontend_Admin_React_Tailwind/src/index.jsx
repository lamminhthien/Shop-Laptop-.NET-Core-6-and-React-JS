import reactDom from "react-dom";
import "./Styles/tailwind.css";
import { BrowserRouter, Route, Switch,useParams } from "react-router-dom";
import Home from "./Pages/Home";
import TableTailwind from "./Pages/TableTest";
import Details from "./Pages/Details";
import NotFoundPage from "./Pages/404ErrorPage";
import QueryParameters from "./Pages/QueryParameters";
import PersonList from "./Pages/SanPham/ListHangSanXuat";
import BrandList from "./Pages/SanPham/ListHangSanXuat";
import CreateBrand from "./Pages/SanPham/ThemHangSanXuat";
import Welcome from "./Components/TestProps";
import LoginCreateJWT from "./Pages/Login"
import AuthorizedJWT_ProtectedPage from "./Pages/AuthorizeProtectedPage"


// https://v5.reactrouter.com/web/example/basic React Router Example
reactDom.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" children={<Home />} />

            <Route exact path="/table" children={<TableTailwind />} />

            <Route exact path="/details/:id" children={<Details />} />

            <Route exact path="/queryparams" children={<QueryParameters/>} />

            <Route exact path="/list_san_pham" children={<BrandList/>} />

            <Route exact path="/them_san_pham" children={<CreateBrand/>} />

            <Route exact path="/prop_test" children={<Welcome name="Sara" />} />

            <Route exact path="/login" children={<LoginCreateJWT/>}/>

            <Route exact path="/admin" children={<AuthorizedJWT_ProtectedPage/>}/>

            <Route path="*" children={<NotFoundPage/>}  / >

            
        </Switch>
    </BrowserRouter>, document.getElementById("root"));

