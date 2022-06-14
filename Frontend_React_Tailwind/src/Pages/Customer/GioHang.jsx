import React from 'react';
import PrimarySearchAppBar from '../../Components/Public/Navbar';
import Footer from '../../Components/Public/Footer';
export default function GioHang() {
  return (
    <div>
      <PrimarySearchAppBar />
      <div className='container flex p-7 mx-auto bg-fuchsia-300'>
        <div className='items-cart w-2/3 bg-slate-600 space-y-10'>
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
      </div>
      <Footer />
    </div>
  );
}
