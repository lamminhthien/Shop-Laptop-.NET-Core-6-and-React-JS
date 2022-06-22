import React from 'react';
import Sidebar from '../../../Components/Admin/Sidebar';
import BieuDoBienDongGia from './Components/BieuDoBienDongGia';
import ThongKeChung from './Components/ThongKeChung';

export default function ThongKePage() {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='h-screen flex-1 p-7'>
        <ThongKeChung/>
        <BieuDoBienDongGia/>
      </div>
    </div>
  );
}
