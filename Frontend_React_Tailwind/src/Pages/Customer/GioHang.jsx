import React from 'react';
import PrimarySearchAppBar from '../../Components/Public/Navbar';
import Footer from '../../Components/Public/Footer';
export default function GioHang() {
  return (
    <div>
      <PrimarySearchAppBar />
      <div className='container  p-9 mx-auto border-2 bg-[#E2EEEC] border-white rounded-lg'>
        {/* Area List Item */}
        <div className="inner border-2 border-white rounded-lg flex">
          <div className='items-cart w-2/3 p-6 bg-white space-y-10 '>
            <div className='title'>
              <p className='text-3xl font-medium leading-6'>Shopping Cart</p>
            </div>
            <div className='list_item'>
              <div className='inner grid grid-cols-2 px-8 py-4'>
                {/* left */}
                <div className='flex justify-start items-center name-and-image-product  pl-6 gap-x-6'>
                  <div className='w-[100px] '>
                    <img
                      src='https://offautan-uc1.azureedge.net/-/media/images/off/ph/products-en/products-landing/landing/off_overtime_product_collections_large_2x.jpg?la=en-ph'
                      alt=''
                    />
                  </div>
                  <h2 className='text-lg font-medium leading-5'>EarthQuaker Devices Afterneath</h2>
                </div>
                {/* right */}
                <div className='flex justify-end items-center function-control-each-items space-x-12'>
                  <div className='control-quantity space-x-4'>
                    <button className='text-2xl font-bold'>-</button>
                    <input type='number' className='w-[50px] border-2 border-gray-400 rounded-md' defaultValue={1} />
                    <button className='text-2xl font-bold'>+</button>
                  </div>
                  <div className='total-money'>
                    <p className='text-lg font-bold leading-5'>$229.0</p>
                  </div>
                  <div className='delete'>
                    <button className='text-lg font-bold text-red-500 leading-5'>Delete</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Order Details */}
          <div className='order-details pl-8 p-6  bg-[#F0F6F5] w-1/3 text-center'>
            <div className='title'>
              <p className='text-3xl font-medium leading-6 mb-12'>Order Details</p>
              <div className="subtotal mb-6">
                <h2 className='text-lg font-medium'>Subtotal</h2>
                <p className='text-3xl font-medium '>$76.00</p>
              </div>
              <div className="shipping-fee mb-6">
                <h2 className='text-lg font-medium'>Shipping Fee</h2>
                <p className='text-3xl font-medium '>
                  <select className='w-full  h-16 text-center text text-3xl font-medium bg-[#D0D7DA] border-t-2 border-0 border-[#D0D7DA]-500 rounded-lg '>
                    <option value="1">Ninh Hòa</option>
                    <option value="">Nha Trang</option>
                    <option value="">Vạn Giã</option>
                    <option value="">Vạn Ninh</option>
                    <option value="">Khánh Sơn</option>
                    <option value="">Đắc Lắc</option>
                  </select>
                </p>
              </div>
              <div className="total-cost mb-12">
                <h2 className='text-lg font-medium my-2'>Total Cost</h2>
                <h2 className='text-3xl font-medium my-2'>$778.00</h2>
                <button className='p-2 border-2  w-full bg-[#6E7EA3] text-white text-lg font-medium my-2 rounded-md'>Checkout</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
