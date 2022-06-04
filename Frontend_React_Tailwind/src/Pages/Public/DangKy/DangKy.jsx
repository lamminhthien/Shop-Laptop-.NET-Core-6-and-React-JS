import React from 'react';
import { set, useForm } from 'react-hook-form';

export default function DangKy() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange'
  });

  const onSubmit = data => {
    alert(JSON.stringify(data));
  };

  const inputStyle = `bg-gray-50 border border-gray-300
  text-gray-900 text-sm rounded-lg focus:ring-blue-500 
  focus:border-blue-500 block w-full p-2.5`;
  const labelStyle = `block mb-2 text-sm font-medium text-gray-900`;
  const errorStyle = `before:content-['⚠'] mt-2 text-sm text-red-600 `;
  const divStyle = `relative z-0 w-full mb-6 group`;
  const formStyle = `mt-2 rounded-xl bg-gradient-to-r bg-white border 
 border-gray-200  p-2 sm:p-6  drop-shadow-2xl overscroll-contain`;

  return (
    <div>
      <form className={formStyle} onSubmit={handleSubmit(onSubmit)}>
        <label className={labelStyle}>Ho va Ten</label>
        <input
          className={inputStyle}
          {...register('hoTen', {
            required: true
          })}
        />
        <br />
        <label className={labelStyle}>Dia Chi</label>
        <input
          className={inputStyle}
          {...register('diaChi', {
            required: true
          })}
        />{' '}
        <br />
        <label className={labelStyle}>So Dien Thoai</label>
        <input
          className={inputStyle}
          {...register('soDienThoai', {
            required: true
          })}
        />{' '}
        <br />
        <label className={labelStyle}>Gioi Tinh</label>
        <input
          className={inputStyle}
          {...register('gioiTinh', {
            required: true
          })}
        />{' '}
        <br />
        <label className={labelStyle}>Username</label>
        <input
          className={inputStyle}
          {...register('username', {
            required: true
          })}
        />{' '}
        <br />
        <label className={labelStyle}>Password</label>
        <input
          className={inputStyle}
          {...register('retype-password', {
            required: true
          })}
        />{' '}
        <br />
        <label className={labelStyle}>Nhap Lai Password</label>
        <input
          className={inputStyle}
          {...register('password', {
            required: true
          })}
        />{' '}
        <br />
        <lable>Email</lable>{' '}
        <input
          className={inputStyle}
          {...register('email', {
            required: true
          })}
        />
        <input type="submit" value="Dang Ky"/>
      </form>
    </div>
  );
}
