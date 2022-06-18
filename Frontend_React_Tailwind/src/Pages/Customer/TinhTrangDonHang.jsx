import React from 'react';
import Footer from '../../Components/Public/Footer';
import PrimarySearchAppBar from '../../Components/Public/Navbar';

export default function TinhTrangDonHang() {
  return (
    <>
      <PrimarySearchAppBar />
      <div className='container  lg:p-9 mx-auto border-2 bg-[#E2EEEC] border-white rounded-lg'>
        <div className='inner border-2 border-white rounded-lg'>
          <div className='items-cart relative w-full   lg:p-6 bg-white space-y-10 '>
            <div className=' title'>
              <p className='text-3xl font-medium leading-6'>Tình trạng đơn hàng</p>
            </div>
            <div className='list_item'>
              <div className='inner grid grid-cols-2 px-8 py-4'>
                <div className='flex justify-start items-center name-and-image-product  pl-6 gap-x-6'>
                  <div className='w-[100px] '>
                    <img src='https://localhost:7216/Resources/Images/SanPham/SP67-1.jpeg' alt='Dell AlienWare m15 ' />
                  </div>
                  <div className='inner'>
                    <h2 className='text-lg font-medium leading-5'>Dell AlienWare m15 </h2>
                  </div>
                </div>
                <div className='flex justify-end items-center function-control-each-items space-x-12'>
                  <div className='control-quantity space-x-4'>
                    <input
                      type='number'
                      className='w-[70px] border-2 border-gray-400 rounded-md'
                      min={1}
                      max={4}
                      defaultValue={1}
                    />
                  </div>
                  <div className='total-money'>
                    <p className='text-lg font-bold leading-5'>242000</p>
                  </div>
                  <div className='delete'>
                    <button className='text-lg font-bold text-red-500 leading-5'>Delete</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
