import React from 'react'
import Sidebar from '../../../Components/Admin/Sidebar'

export default function ListDonHang() {
  return (
    <div>
      <div className="flex">
      <Sidebar/>
        <div className="h-screen flex-1 p-7">
          <div className="div">
            Nếu là đơn hàng chưa duyệt thì mã nhân viên là null
          </div>
        </div>
      </div>
    </div>
  )
}
