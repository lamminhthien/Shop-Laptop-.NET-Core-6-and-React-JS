import React from 'react';
import {useForm} from 'react-hook-form';
import NhanVienApi from '../../../Api/NhanVien/NhanVienApi';

export default function ThemNhanVien() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors}
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange'
  });

  const onSubmit = data => {
    if (data.password !== data.retype_password) alert('Mật khẩu nhập lại không khớp');
    else {
      NhanVienApi.themnhanVien(data)
        .then(res => {
          window.location.href = '/admin/list-nhan-vien/1';
        })
        .catch(err => {
          alert('Thêm nhân viên thất bại');
        });
    }
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
          {...register('tenNhanVien', {
            required: true,
            minLength: 10,
            maxLength: 50
          })}
        />
        {errors?.tenNhanVien?.type === 'required' && <p className={errorStyle}>Tên khách hàng bắt buộc nhập</p>}
        {errors?.tenNhanVien?.type === 'minLength' && <p className={errorStyle}>Tên khách hàng tối thiểu 10 kí tự</p>}
        {errors?.tenNhanVien?.type === 'maxLength' && <p className={errorStyle}>Tên khách hàng tối đa 50 kí tự</p>}
        <br />
        <label className={labelStyle}>So Dien Thoai</label>
        <input
          className={inputStyle}
          {...register('soDienThoai', {
            pattern: /^[0-9]{10}$/
          })}
        />
        {errors?.soDienThoai?.type === 'pattern' && <p className={errorStyle}>Số điện thoại phải 10 số</p>}
        <br />
        <label className={labelStyle}>Username</label>
        <input
          className={inputStyle}
          {...register('username', {
            required: true,
            minLength: 10,
            maxLength: 20
          })}
        />
        {errors?.username?.type === 'required' && <p className={errorStyle}>Username bắt buộc nhập</p>}
        {errors?.username?.type === 'minLength' && <p className={errorStyle}>Username tối thiểu 10 kí tự</p>}
        {errors?.username?.type === 'maxLength' && <p className={errorStyle}>Username tối đa 20 kí tự</p>}
        <br />
        <label className={labelStyle}>Password</label>
        <input
          className={inputStyle}
          {...register('password', {
            required: true,
            minLength: 10,
            maxLength: 20
          })}
        />
        {errors?.password?.type === 'required' && <p className={errorStyle}>Password bắt buộc nhập</p>}
        {errors?.password?.type === 'minLength' && <p className={errorStyle}>Password tối thiểu 10 kí tự</p>}
        {errors?.password?.type === 'maxLength' && <p className={errorStyle}>Password tối đa 20 kí tự</p>}
        <br />
        <label className={labelStyle}>Nhap Lai Password</label>
        <input
          className={inputStyle}
          {...register('retype_password', {
            required: true,
            minLength: 10,
            maxLength: 20
          })}
        />
        {errors?.retype_password?.type === 'required' && <p className={errorStyle}>Password bắt buộc nhập</p>}
        {errors?.retype_password?.type === 'minLength' && <p className={errorStyle}>Password tối thiểu 10 kí tự</p>}
        {errors?.retype_password?.type === 'maxLength' && <p className={errorStyle}>Password tối đa 20 kí tự</p>}
        <br />
        <input type='submit' value='Đăng ký' className='bg-cyan-600 p-3 rounded-xl m-3' />
      </form>
    </div>
  );
}
