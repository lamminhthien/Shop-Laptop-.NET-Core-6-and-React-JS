import PrimarySearchAppBar from "../../../Components/Public/Navbar"
import Ads from "../../../Components/Public/Ads"
import ProductType from "../../../Components/Public/ProductType"
import ProductList from "../../../Components/Public/ProductList"
import Footer from "../../../Components/Public/Footer"

export default function HomePage () {
    return (
        <div>
           <PrimarySearchAppBar/>
           <Ads/>
           <ProductType/>
           <ProductList/>
           <Footer/>
        </div>
    )
}