import { getSanPham } from "../api/SanPhamApi" 
export default function ListSanPham() {
    
    return (
        <>
            <h3>This page is testing axios</h3>
            {getSanPham()}
        </>
    )
}