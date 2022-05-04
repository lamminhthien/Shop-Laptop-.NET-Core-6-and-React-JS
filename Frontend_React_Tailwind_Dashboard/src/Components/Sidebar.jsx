import React from "react";
import {
    RiHome2Line,
    RiShoppingCart2Line,
    RiNewspaperLine,
    RiPhoneLine,
    RiInformationLine
} from "react-icons/ri"
const Sidebar = ({Sidebar}) => {
    return (
        <div className={Sidebar?"sidebar sidebar--open":"sidebar"}>
            <li> <RiHome2Line/> Home</li>
            <li> <RiShoppingCart2Line/> Products</li>
            <li> <RiNewspaperLine/>  Carrer</li>
            <li> <RiPhoneLine/>  Contact Us</li>
            <li> <RiInformationLine/>  About Us</li>
            <li></li>
        </div>
    )
}
export default Sidebar