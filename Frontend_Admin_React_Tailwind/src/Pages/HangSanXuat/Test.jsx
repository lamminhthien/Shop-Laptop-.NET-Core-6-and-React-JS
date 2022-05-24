import getListHangSanXuat from '../../Api/HangSanXuat/hangSanXuatApi'
export default function TestAxios () {
    return (
        <div>
           <p>{console.log(getListHangSanXuat(5))}</p>
        </div>
    )
}