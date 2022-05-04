import React from "react";
import '../Styles/style.css'
import { RiMenuFill } from "react-icons/ri";
const ToolBar = () => {
    return (
        <div className="tool-bar">
            <div className="burger">
                <RiMenuFill/>
            </div>
            <div className="title">Dashboard ShopLaptop</div>
        </div>
    )
}

export default ToolBar