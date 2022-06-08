import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { set, useForm } from 'react-hook-form';

export default function CommentForm(props) {
  const configJWT = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  };
  const errorStyle = `before:content-['⚠'] mt-2 text-sm text-red-600 `;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange'
  });
  const onSubmit = (data) => {
    axios
      .post('https://localhost:7216/api/LoginKhachHang/GetMaKhachHang', null, configJWT)
      .then(res => {
        const formData = new FormData();
        formData.append('maKhachHang', res.data);
        formData.append('maSanPham', props.maSanPham);
        formData.append('noiDung', data.noiDung);
        formData.append('trangThai', "false");
        axios.post('https://localhost:7216/api/KhachHang/BinhLuanSanPham',formData,configJWT).then(res => {
          alert('Cảm ởn bạn đã gửi ý kiến phản hồi, ý kiến của bạn sẽ được duyệt và phản hồi sớm');
        });
      })
      .catch(err => {
        alert('Bạn chưa đăng nhập');
      });
  };
  return (
    <form className='pl-44 pr-44 mb-7 h-[200px]' onSubmit={handleSubmit(onSubmit)}>
      <div class='code-preview-wrapper'>
        <div class='code-preview rounded-xl bg-gradient-to-r bg-white  border-gray-200 p-2 sm:p-6'>
          <label for='message' class='block mb-2 text-sm font-medium text-gray-900'>
            Bình luận sản phẩm
          </label>
          <textarea
            {...register('noiDung', {
              required: true,
              minLength: 70,
              maxLength: 255
            })}
            id='message'
            rows='4'
            class='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='Để lại bình luận, ý kiến về sản phẩm này'></textarea>
          {errors?.noiDung?.type === 'required' && <p className={errorStyle}>Nội dung bắt buộc nhập</p>}
          {errors?.noiDung?.type === 'minLength' && <p className={errorStyle}>Nội dung tối thiểu 70 kí tự</p>}
          {errors?.noiDung?.type === 'maxLength' && <p className={errorStyle}>Nội dung tối đa 255 kí tự</p>}
          <input
            type='submit'
            class='mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
            value="Gửi ý kiến"/>
        </div>
      </div>
    </form>
  );
}
