import Footer from "../../../Components/Public/Footer";
import Navbar from "../../../Components/Public/Navbar";
import CommentList from "../../../Components/Public/CommentList";
import ProductDetail from "../../../Components/Public/ProductDetail";
import CommentForm from '../../../Components/Public/CommentForm';

export default function ChiTietSanPhamPublic() {
    return (
        <>
            <Navbar />
            <ProductDetail/>
            <CommentForm/>
            <CommentList/>
            <Footer/>
        </>


    )
}
