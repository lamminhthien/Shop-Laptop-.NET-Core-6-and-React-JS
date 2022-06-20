import {useForm} from 'react-hook-form';
import {useEffect, useState} from 'react';
import axios from 'axios';
export default function Navbar() {
  const [isCustomer, setisCustomer] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState('');
  const {register} = useForm();
  const configJWT = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  };
  useEffect(() => {
    axios
      .post('https://localhost:7216/api/LoginKhachHang/GetKhachHangName', null, configJWT)
      .then(res => {
        setUserName(res.data);
        setisCustomer(true);
        setIsLogin(true);
      })
      .catch(err => {
        axios.get('https://localhost:7216/api/LoginNhanVien/validateToken', configJWT).then(res => {
          setUserName(res.data);
          setIsAdmin(true);
          setIsLogin(true);
        });
      });
  }, []);
  const checkLogin = () => {
    if (!isLogin)
      return (
        <>
          <li>
            <a
              href='/public/dang-ky'
              className='block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 '>
              Đăng ký
            </a>
          </li>
          <li>
            <a
              href='/public/dang-nhap'
              className='block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 '>
              Đăng nhập
            </a>
          </li>
        </>
      );
    else
      return (
        <>
          {isCustomer ? (
            <>
              <li>
                <a
                  href='/khach-hang/gio-hang'
                  className='block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 '>
                  Giỏ hàng
                </a>
              </li>
              <li>
                <a
                  href='/khach-hang/don-hang'
                  className='block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 '>
                  Tình trạng đơn hàng
                </a>
              </li>
            </>
          ) : {isAdmin} ? (
            <li>
              <a
                href='/admin'
                className='block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 '>
                Trang quản lý
              </a>
            </li>
          ) : (
            ''
          )}
          <li>
            <p className='block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 '>
              Xin chào {isAdmin ? `${userName} (Nhân viên)` : `${userName}`} 
            </p>
          </li>
          <li>
            <a
              href='/'
              onClick={() => {
                localStorage.removeItem('token');
              }}
              className='block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 '>
              Đăng xuất
            </a>
          </li>
        </>
      );
  };
  return (
    <nav className='bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800'>
      <div className='container flex flex-wrap justify-between items-center mx-auto'>
        <a href='/' className='flex items-center'>
          <img src='/logo.svg' className='mr-3 h-6 sm:h-9' alt='Flowbite Logo' />
          <span className='self-center text-xl font-semibold whitespace-nowrap dark:text-white'>ĐỨC THỊNH LAPTOP</span>
        </a>
        <button
          data-collapse-toggle='mobile-menu'
          type='button'
          className='inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
          aria-controls='mobile-menu'
          aria-expanded='false'>
          <span className='sr-only'>Open main menu</span>
          <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
            <path
              fillRule='evenodd'
              d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
              clipRule='evenodd'
            />
          </svg>
          <svg className='hidden w-6 h-6' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
            <path
              fillRule='evenodd'
              d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
              clipRule='evenodd'
            />
          </svg>
        </button>
        <div className='hidden w-full md:block md:w-auto' id='mobile-menu'>
          <ul className='flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-3 md:text-sm md:font-medium'>
            <li>
              <a
                href='/'
                className='block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white'
                aria-current='page'>
                Trang chủ
              </a>
            </li>
            <li>
              <a
                href='/'
                className='block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 '>
                Giới thiệu{' '}
              </a>
            </li>
            {checkLogin()}
            <li>
              <form className='mt-[-3px] w-max'>
                <input
                  type='text'
                  {...register('searchKey')}
                  class=' text-gray-900 bg-gray-50 rounded-lg border
                  border-gray-300 sm:text-sm focus:ring-blue-500
                   focus:border-blue-500 dark:bg-gray-700'
                  placeholder='Từ khóa'
                />
                <button
                  type='submit'
                  class='text-white bg-blue-700 
                  hover:bg-blue-800 focus:ring-4 focus:outline-none 
                  focus:ring-blue-300 font-medium rounded-lg text-sm px-5
                  py-2.5 text-center mr-3 md:mr-0 '>
                  Tìm kiếm
                </button>
              </form>
            </li>
            <li></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
