import React from 'react';
import Sidebar from '../../../Components/Admin/Sidebar';

export default function ThongKePage() {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='h-screen flex-1 p-7'>
        <div className='content-header pt-4 pr-2'>
          <div className='container pl-2 pr-2 w-full mx-auto'>
            <div className='flex mx-[-7.5px] flex-wrap mb-2'>
              <div className=' px-2'>
                <h1 className='m-0 font-medium leading-3 text-xl'>Thống kê</h1>
              </div>
            </div>
          </div>
        </div>
        <section className='content p-2'>
          <div className='container-fluid w-[100%] px-2 mx-auto'>
            <div className='row text-white'>
              <div className='grid grid-cols-6 lg:grid-cols-8 gap-x-6'>
                <div className='md:col-span-3 lg:col-span-2 col-span-6'>
                  <div className='small-box flex justify-between rounded shadow block  bg-[#17a2b8] mb-5'>
                    <div className='inner p-[10px]'>
                      <h3 className='text-4xl font-bold mb-[10px] whitespace-nowrap'>150</h3>
                      <p className='mb-4 text-base'>Đơn hàng đã lập</p>
                    </div>
                    <div className='icon'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        xmlnsXlink='http://www.w3.org/1999/xlink'
                        version='1.1'
                        id='Capa_1'
                        x='0px'
                        y='0px'
                        width='425.832px'
                        height='425.833px'
                        viewBox='0 0 425.832 425.833'
                        xmlSpace='preserve'
                        style={{width: 57, height: 95}}>
                        <g>
                          <path d='M377.763,83.169l-86.238-80.33c-1.957-1.83-4.54-2.839-7.21-2.839H55.291c-5.855,0-10.597,4.742-10.597,10.59v404.647   c0,5.843,4.742,10.595,10.597,10.595H370.54c5.854,0,10.599-4.74,10.599-10.595V90.92   C381.134,87.979,379.915,85.172,377.763,83.169z M108.599,388.26c0-8.273,6.735-15.011,15.018-15.011   c8.282,0,15.012,6.737,15.012,15.011c0,8.284-6.73,15.016-15.012,15.016C115.334,403.276,108.599,396.544,108.599,388.26z    M185.611,388.26c0-8.273,6.736-15.011,15.019-15.011c8.275,0,15.003,6.737,15.003,15.011c0,8.284-6.728,15.016-15.003,15.016   C192.347,403.276,185.611,396.544,185.611,388.26z M360.118,404.654l-135.527-0.131c3.152-4.641,5.007-10.238,5.007-16.258   c0-15.983-12.993-28.974-28.968-28.974c-15.981,0-28.983,12.99-28.983,28.974c0,6.003,1.839,11.574,4.972,16.214l-28.979-0.031   c3.126-4.618,4.952-10.191,4.952-16.183c0-15.983-12.994-28.974-28.975-28.974c-15.98,0-28.98,12.99-28.98,28.974   c0,5.971,1.814,11.519,4.925,16.132l-33.844-0.033l0.252-134.205L87.207,355.1h144.215l69.822-160.598h21.06   c5.79,0,10.476-4.69,10.476-10.473c0-5.782-4.686-10.471-10.476-10.471h-34.79l-69.828,160.589h-114.13l-17.453-69.821h108.77   c5.79,0,10.473-4.691,10.473-10.468c0-5.791-4.684-10.486-10.473-10.486H66.021l0.005-3.951V21.17h197.629v79.471   c0,5.844,4.738,10.585,10.583,10.585h85.88V404.654z' />
                        </g>
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className='md:col-span-3 lg:col-span-2 col-span-6'>
                  <div className='small-box rounded shadow block  bg-[#28a745] mb-5'>
                    <div className='inner p-[10px]'>
                      <h3 className='text-4xl font-bold mb-[10px] whitespace-nowrap'>4</h3>
                      <p className='mb-4 text-base'>Sản phẩm đang bán</p>
                    </div>
                  </div>
                </div>
                <div className='md:col-span-3 lg:col-span-2 col-span-6'>
                  <div className='small-box rounded shadow block  bg-[#ffc107] mb-5'>
                    <div className='inner p-[10px]'>
                      <h3 className='text-4xl font-bold mb-[10px] whitespace-nowrap'>2</h3>
                      <p className='mb-4 text-base'>Khách hàng đã đăng ký</p>
                    </div>
                  </div>
                </div>
                <div className='md:col-span-3 lg:col-span-2 col-span-6'>
                  <div className='small-box rounded shadow block  bg-[#dc3545] mb-5'>
                    <div className='inner p-[10px]'>
                      <h3 className='text-4xl font-bold mb-[10px] whitespace-nowrap'>88</h3>
                      <p className='mb-4 text-base'>Lượt truy cập</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
