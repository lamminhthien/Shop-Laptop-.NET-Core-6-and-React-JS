import PrimarySearchAppBar from "../../../Components/Public/Navbar"
import Ads from "../../../Components/Public/Ads"
import ProductType from "../../../Components/Public/ProductType"
import ProductList from "../../../Components/Public/ProductList"
import Footer from "../../../Components/Public/Footer"
import BrandList from "../../../Components/Public/BrandList"
import axios from 'axios'

export default function HomePage () {
    const viewCountIncrease = () => {
        axios.get(`https://localhost:7216/api/TrangChu/ViewCount`)
    }
    return (
        <div className="container m-auto">
            {viewCountIncrease()}
           <PrimarySearchAppBar/>
           <Ads/>
           <ProductType/>
           <BrandList/>
           <ProductList/>
           <Footer/>
        </div>
    )
}
