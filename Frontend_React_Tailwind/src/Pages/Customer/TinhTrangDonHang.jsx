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
            <div className='list_don_hang'>
              <div className='inner px-8 py-4'>
                <div className="don-hang space-y-10">
                  <div className="don-hang-1">
                    <h2>Đơn hàng 1</h2>
                    <div className="list_item_in_don_hang  space-y-4 pl-5">
                      <div className="item flex justify-between space-x-9">
                        <h2>Ảnh</h2>
                        <h2>Dell Alien Ware</h2>
                        <p>16</p>
                        <p>5000000</p>
                        <p>Đang chờ duyệt đơn</p>
                      </div>
                      <div className="item flex space-x-9 justify-between">
                        <h2>Ảnh</h2>
                        <h2>Dell Alien Ware</h2>
                        <p>16</p>
                        <p>5000000</p>
                        <p>Đang chờ duyệt đơn</p>
                      </div>
                      <div className="item flex space-x-9 justify-between">
                        <h2>Ảnh</h2>
                        <h2>Dell Alien Ware</h2>
                        <p>16</p>
                        <p>5000000</p>
                        <p>Đang chờ duyệt đơn</p>
                      </div>
                    </div>
                  </div>
                  <div className="don-hang-2">
                    <h2>Đơn hàng 2</h2>
                    <div className="list_item_in_don_hang  space-y-4 pl-5">
                      <div className="item flex space-x-9 justify-between">
                        <h2>Ảnh</h2>
                        <h2>Dell Alien Ware</h2>
                        <p>16</p>
                        <p>5000000</p>
                        <p>Đang chờ duyệt đơn</p>
                      </div>
                      <div className="item flex space-x-9 justify-between">
                        <h2>Ảnh</h2>
                        <h2>Dell Alien Ware</h2>
                        <p>16</p>
                        <p>5000000</p>
                        <p>Đang chờ duyệt đơn</p>
                      </div>
                      <div className="item flex space-x-9 justify-between">
                        <h2>Ảnh</h2>
                        <h2>Dell Alien Ware</h2>
                        <p>16</p>
                        <p>5000000</p>
                        <p>Đang chờ duyệt đơn</p>
                      </div>
                    </div>
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
