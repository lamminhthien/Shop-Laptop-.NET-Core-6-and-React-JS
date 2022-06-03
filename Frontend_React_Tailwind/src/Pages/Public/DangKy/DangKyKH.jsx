import React from 'react';
import { set, useForm } from 'react-hook-form';

export default function DangKyKH() {
  //Set up useForm
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange'
  });

  // When submit
  const onSubmit = data => {
    alert(JSON.stringify(data));
  };

  // Tailwind CSS Reuse style
  const inputStyle = `bg-gray-50 border border-gray-300
   text-gray-900 text-sm rounded-lg focus:ring-blue-500 
   focus:border-blue-500 block w-full p-2.5`;
  const labelStyle = `block mb-2 text-sm font-medium text-gray-900`;
  const errorStyle = `before:content-['⚠'] mt-2 text-sm text-red-600 `;
  const divStyle = `relative z-0 w-full mb-6 group`;
  const formtyle = `mt-2 rounded-xl bg-gradient-to-r bg-white  border 
  border-gray-200  p-2 sm:p-6  drop-shadow-2xl overscroll-contain`;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={formtyle}>
      {/* Input tên sản phẩm */}
      <div className='grid xl:grid-cols-3 xl:gap-6'>
        <div className={divStyle}>
          <label class={labelStyle}>Tên sản phẩm</label>
          <input
            className={inputStyle}
          />
        </div>
         {/* Input tên sản phẩm */}
        <div className={divStyle}>
          <label class={labelStyle}>Tên sản phẩm</label>
          <input
            className={inputStyle}
          />
        </div>
      </div>

            <div className='grid xl:grid-cols-3 xl:gap-6'>
        <div className={divStyle}>
          <label class={labelStyle}>Tên sản phẩm</label>
          <input
            className={inputStyle}
          />
        </div>
         {/* Input tên sản phẩm */}
        <div className={divStyle}>
          <label class={labelStyle}>Tên sản phẩm</label>
          <input
            className={inputStyle}
          />
        </div>
      </div>
            <div className='grid xl:grid-cols-3 xl:gap-6'>
        <div className={divStyle}>
          <label class={labelStyle}>Tên sản phẩm</label>
          <input
            className={inputStyle}
          />
        </div>
         {/* Input tên sản phẩm */}
        <div className={divStyle}>
          <label class={labelStyle}>Tên sản phẩm</label>
          <input
            className={inputStyle}
          />
        </div>
      </div>
            <div className='grid xl:grid-cols-3 xl:gap-6'>
        <div className={divStyle}>
          <label class={labelStyle}>Tên sản phẩm</label>
          <input
            className={inputStyle}
          />
        </div>
         {/* Input tên sản phẩm */}
        <div className={divStyle}>
          <label class={labelStyle}>Tên sản phẩm</label>
          <input
            className={inputStyle}
          />
        </div>
      </div>
        

      {/* Khu vực nút bấm */}
      <div className='flex justify-center'>
        {/* Quan trọng, type = submit */}
        <button
          type='submit'
          class='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
      focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 '>
          Thêm
        </button>
      </div>
    </form>
  );
}
