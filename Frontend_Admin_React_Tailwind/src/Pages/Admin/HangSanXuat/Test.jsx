import getListHangSanXuat from '../../Api/HangSanXuat/HangSanXuatApi'
export default function TestAxios () {
    return (
        <div>
           <p>{console.log(getListHangSanXuat(5))}</p>
        </div>
    )
}