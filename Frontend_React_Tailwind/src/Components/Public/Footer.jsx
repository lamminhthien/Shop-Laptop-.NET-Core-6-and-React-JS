export default function Footer() {
  return (
    <div className='relative mt-16 bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-500'>
      <svg
        className='absolute top-0 w-full h-6 -mt-5 sm:-mt-10 sm:h-16 text-deep-purple-accent-400'
        preserveAspectRatio='none'
        viewBox='0 0 1440 54'>
        <path
          fill='currentColor'
          d='M0 22L120 16.7C240 11 480 1.00001 720 0.700012C960 1.00001 1200 11 1320 16.7L1440 22V54H1320C1200 54 960 54 720 54C480 54 240 54 120 54H0V22Z'
        />
      </svg>
      <div className='px-4 pt-12 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8'>
        <div className='grid  row-gap-10 mb-8 lg:grid-cols-3'>
          <div className='md:max-w-md'>
            <a href='/' aria-label='Go home' title='Company' className='inline-flex items-center'>
              <svg xmlns='http://www.w3.org/2000/svg' width='32' height='33' viewBox='0 0 32 33' fill='none'>
                <path
                  d='M24.5194 13.4429C24.4453 13.9533 24.1087 14.6468 23.7226 15.2497C23.2354 16.0105 22.4622 16.5433 21.5774 16.7283L17.6797 17.5434C17.0533 17.6744 16.4852 18.0022 16.0587 18.479L13.503 21.3357C13.0227 21.8725 12.687 21.7445 12.687 21.0244C12.6812 21.0511 11.4186 24.3072 14.7646 26.2371C16.0502 26.9787 17.9009 26.7122 19.1865 25.9707L25.9983 22.0416C28.5458 20.5722 30.3445 18.0863 30.9424 15.2089C30.966 15.095 30.9843 14.9808 31.004 14.8667L24.5194 13.4429Z'
                  fill='url(#paint0_linear_2484_3243)'
                />
                <path
                  d='M22.7528 9.51774C24.0384 10.2593 24.5637 11.3633 24.5637 12.8464C24.5637 13.0477 24.5479 13.2466 24.5194 13.4425L27.2641 14.6215L31.004 14.8663C31.4829 12.0948 30.5444 9.24202 28.862 6.97445C27.5959 5.268 25.9667 3.78714 24.0081 2.65738C22.417 1.73966 20.7636 1.13501 19.1025 0.803223L17.2361 3.22023L16.6465 5.99559L22.7528 9.51774Z'
                  fill='url(#paint1_linear_2484_3243)'
                />
                <path
                  d='M0.783597 11.5518C0.782899 11.554 0.784832 11.5546 0.78556 11.5524C0.929583 11.1205 1.11018 10.6385 1.33564 10.1237C2.51334 7.4343 4.78286 5.64062 7.57492 4.72608C10.367 3.81156 13.4155 4.13212 15.9601 5.59988L16.6465 5.99578L19.1025 0.803412C11.291 -0.756765 3.30728 3.83253 0.793528 11.5217C0.792327 11.5254 0.787957 11.5382 0.783597 11.5518Z'
                  fill='url(#paint2_linear_2484_3243)'
                />
                <path
                  d='M18.9199 25.9704C17.6343 26.712 16.0503 26.712 14.7647 25.9704C14.5902 25.8697 14.4257 25.7566 14.2701 25.634L12.0091 27.1885L10.0603 30.3376C12.2233 32.1377 15.0321 32.7164 17.839 32.3945C19.9513 32.1523 22.0495 31.4832 24.0082 30.3534C25.5992 29.4357 26.9501 28.3075 28.0682 27.0361L26.9063 24.2128L25.0262 22.4482L18.9199 25.9704Z'
                  fill='url(#paint3_linear_2484_3243)'
                />
                <path
                  d='M14.2701 25.6341C13.2796 24.8539 12.6872 23.6572 12.6872 22.3754V22.2476V11.5724C12.6872 10.9687 12.865 10.8661 13.3884 11.168C12.5823 10.703 10.7203 9.10701 8.42118 10.4331C7.13557 11.1747 6.0769 12.8116 6.0769 14.2946V22.1529C6.0769 25.0917 7.59906 28.1573 9.79448 30.1133C9.88132 30.1906 9.97122 30.2636 10.0603 30.3377L14.2701 25.6341Z'
                  fill='url(#paint4_linear_2484_3243)'
                />
                <path
                  d='M27.9105 5.8123C27.909 5.8106 27.9075 5.81197 27.909 5.81368C28.2114 6.15428 28.5389 6.5515 28.8725 7.00399C30.6149 9.36765 31.2659 12.3613 30.6627 15.2343C30.0594 18.1072 28.2573 20.5846 25.7126 22.0523L25.0262 22.4482L28.0683 27.0361C33.3265 21.0576 33.3401 11.8554 27.9316 5.83594C27.9291 5.83306 27.9201 5.82287 27.9105 5.8123Z'
                  fill='url(#paint5_linear_2484_3243)'
                />
                <path
                  d='M6.34355 14.2944C6.34354 12.8113 7.13552 11.4408 8.42113 10.6993C8.59565 10.5986 8.77601 10.5129 8.96002 10.4395L8.74304 7.70603L7.21862 4.57861C4.57671 5.55005 2.4397 7.55766 1.31528 10.1471C0.469097 12.0957 9.792e-06 14.2458 0 16.5052C0 18.3407 0.302549 20.0735 0.845533 21.6767L3.87391 22.083L6.34355 21.3387V14.2944V14.2944Z'
                  fill='url(#paint6_linear_2484_3243)'
                />
                <path
                  d='M8.96003 10.4395C10.1316 9.97264 11.4652 10.0584 12.5763 10.6993L12.6871 10.7632L21.5825 15.8941C22.2065 16.254 22.1498 16.6082 21.4445 16.7557L21.9577 16.6484C22.6329 16.5072 23.2498 16.1621 23.7216 15.6592C24.5327 14.7946 24.8305 13.7515 24.8305 12.8463C24.8304 11.3632 24.0385 9.99274 22.7529 9.2512L15.941 5.32209C13.3935 3.85267 10.3394 3.53934 7.5461 4.46083C7.4356 4.49727 7.32744 4.5386 7.21863 4.57861L8.96003 10.4395Z'
                  fill='url(#paint7_linear_2484_3243)'
                />
                <path
                  d='M19.3222 32.1523C19.3245 32.1518 19.3241 32.1498 19.3218 32.1503C18.8753 32.2417 18.3673 32.3264 17.8083 32.3888C14.8881 32.7145 11.9676 31.781 9.77876 29.8225C7.58999 27.8641 6.3436 25.0662 6.3436 22.1307L6.34359 21.3389L0.845581 21.6769C3.39893 29.2156 11.369 33.8285 19.2912 32.1588C19.295 32.158 19.3083 32.1553 19.3222 32.1523Z'
                  fill='url(#paint8_linear_2484_3243)'
                />
                <defs>
                  <linearGradient
                    id='paint0_linear_2484_3243'
                    x1='20.0599'
                    y1='24.2701'
                    x2='23.2075'
                    y2='13.307'
                    gradientUnits='userSpaceOnUse'>
                    <stop stop-color='#1724C9' />
                    <stop offset='1' stop-color='#1C64F2' />
                  </linearGradient>
                  <linearGradient
                    id='paint1_linear_2484_3243'
                    x1='27.3093'
                    y1='10.9001'
                    x2='19.0297'
                    y2='2.64962'
                    gradientUnits='userSpaceOnUse'>
                    <stop stop-color='#1C64F2' />
                    <stop offset='1' stop-color='#0092FF' />
                  </linearGradient>
                  <linearGradient
                    id='paint2_linear_2484_3243'
                    x1='16.1645'
                    y1='5.52115'
                    x2='3.67432'
                    y2='6.3104'
                    gradientUnits='userSpaceOnUse'>
                    <stop stop-color='#0092FF' />
                    <stop offset='1' stop-color='#45B2FF' />
                  </linearGradient>
                  <linearGradient
                    id='paint3_linear_2484_3243'
                    x1='15.3198'
                    y1='29.1626'
                    x2='26.5366'
                    y2='26.1359'
                    gradientUnits='userSpaceOnUse'>
                    <stop stop-color='#1C64F2' />
                    <stop offset='1' stop-color='#0092FF' />
                  </linearGradient>
                  <linearGradient
                    id='paint4_linear_2484_3243'
                    x1='7.26881'
                    y1='16.1827'
                    x2='15.2325'
                    y2='24.4347'
                    gradientUnits='userSpaceOnUse'>
                    <stop stop-color='#1724C9' />
                    <stop offset='1' stop-color='#1C64F2' />
                  </linearGradient>
                  <linearGradient
                    id='paint5_linear_2484_3243'
                    x1='25.4505'
                    y1='22.1356'
                    x2='31.007'
                    y2='10.9345'
                    gradientUnits='userSpaceOnUse'>
                    <stop stop-color='#0092FF' />
                    <stop offset='1' stop-color='#45B2FF' />
                  </linearGradient>
                  <linearGradient
                    id='paint6_linear_2484_3243'
                    x1='5.36387'
                    y1='9.63067'
                    x2='2.39054'
                    y2='20.8063'
                    gradientUnits='userSpaceOnUse'>
                    <stop stop-color='#1C64F2' />
                    <stop offset='1' stop-color='#0092FF' />
                  </linearGradient>
                  <linearGradient
                    id='paint7_linear_2484_3243'
                    x1='20.5431'
                    y1='9.09912'
                    x2='9.67768'
                    y2='11.8044'
                    gradientUnits='userSpaceOnUse'>
                    <stop stop-color='#1724C9' />
                    <stop offset='1' stop-color='#1C64F2' />
                  </linearGradient>
                  <linearGradient
                    id='paint8_linear_2484_3243'
                    x1='6.40679'
                    y1='21.8566'
                    x2='13.3326'
                    y2='32.2745'
                    gradientUnits='userSpaceOnUse'>
                    <stop stop-color='#0092FF' />
                    <stop offset='1' stop-color='#45B2FF' />
                  </linearGradient>
                </defs>
              </svg>
              <span className='ml-2 text-xl font-bold tracking-wide text-gray-100 uppercase'>Đức Thịnh Laptop</span>
            </a>
          </div>
          <div className='grid grid-cols-2 justify-between gap-28  lg:col-span-3 md:grid-cols-3'>
            <div className='div'>
              <ul className='mt-2 space-y-2'>
                <p className='text-sm text-deep-purple-50'>
                  Đến với Shop Laptop Đức Thịnh, nơi chúng tôi cung cấp mọi sản phẩm, phụ kiện chất lượng cao, giá rẻ
                  liên quan đến những chiếc Laptop bạn đang sử dụng hằng ngày.
                </p>
                <p className='mt-4 text-sm text-deep-purple-50'>
                  Mọi vấn đề thắc mắc, góp ý khiếu nại dịch vụ (8h00-22h00) Liên hệ 1800 6616
                </p>
              </ul>
            </div>
            <div className=''>
              <ul className='mt-2 space-y-2'>
                <li>
                  <a href='/' className='transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400'>
                    Giới thiệu về công ty
                  </a>
                </li>
                <li>
                  <a href='/' className='transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400'>
                    Câu hỏi thường gặp mua hàng
                  </a>
                </li>
                <li>
                  <a href='/' className='transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400'>
                    Chính sách bảo mật
                  </a>
                </li>
                <li>
                  <a href='/' className='transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400'>
                    Quy chế hoạt động
                  </a>
                </li>
                <li>
                  <a href='/' className='transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400'>
                    Kiểm tra hóa đơn điện tử
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <ul className='mt-2 space-y-2'>
                <li>
                  <a href='/' className='transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400'>
                    Hướng dẫn mua online
                  </a>
                </li>
                <li>
                  <a href='/' className='transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400'>
                    Chính sách trả góp
                  </a>
                </li>
                <li>
                  <a href='/' className='transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400'>
                    Hệ thống cửa hàng
                  </a>
                </li>
                <li>
                  <a href='/' className='transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400'>
                    Educational
                  </a>
                </li>
                <li>
                  <a href='/' className='transition-colors duration-300 text-deep-purple-50 hover:text-teal-accent-400'>
                    Projects
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='flex flex-col justify-between pt-5 pb-10 border-t border-deep-purple-accent-200 sm:flex-row'>
          <p className='text-sm text-gray-600'>© Copyright 2022 All rights reserved.</p>
          <div className='flex items-center mt-4 space-x-4 sm:mt-0'>
            <a href='/' className='transition-colors duration-300 text-deep-purple-100 hover:text-teal-accent-400'>
              <svg viewBox='0 0 24 24' fill='currentColor' className='h-5'>
                <path d='M24,4.6c-0.9,0.4-1.8,0.7-2.8,0.8c1-0.6,1.8-1.6,2.2-2.7c-1,0.6-2,1-3.1,1.2c-0.9-1-2.2-1.6-3.6-1.6 c-2.7,0-4.9,2.2-4.9,4.9c0,0.4,0,0.8,0.1,1.1C7.7,8.1,4.1,6.1,1.7,3.1C1.2,3.9,1,4.7,1,5.6c0,1.7,0.9,3.2,2.2,4.1 C2.4,9.7,1.6,9.5,1,9.1c0,0,0,0,0,0.1c0,2.4,1.7,4.4,3.9,4.8c-0.4,0.1-0.8,0.2-1.3,0.2c-0.3,0-0.6,0-0.9-0.1c0.6,2,2.4,3.4,4.6,3.4 c-1.7,1.3-3.8,2.1-6.1,2.1c-0.4,0-0.8,0-1.2-0.1c2.2,1.4,4.8,2.2,7.5,2.2c9.1,0,14-7.5,14-14c0-0.2,0-0.4,0-0.6 C22.5,6.4,23.3,5.5,24,4.6z' />
              </svg>
            </a>
            <a href='/' className='transition-colors duration-300 text-deep-purple-100 hover:text-teal-accent-400'>
              <svg viewBox='0 0 30 30' fill='currentColor' className='h-6'>
                <circle cx='15' cy='15' r='4' />
                <path d='M19.999,3h-10C6.14,3,3,6.141,3,10.001v10C3,23.86,6.141,27,10.001,27h10C23.86,27,27,23.859,27,19.999v-10   C27,6.14,23.859,3,19.999,3z M15,21c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S18.309,21,15,21z M22,9c-0.552,0-1-0.448-1-1   c0-0.552,0.448-1,1-1s1,0.448,1,1C23,8.552,22.552,9,22,9z' />
              </svg>
            </a>
            <a href='/' className='transition-colors duration-300 text-deep-purple-100 hover:text-teal-accent-400'>
              <svg viewBox='0 0 24 24' fill='currentColor' className='h-5'>
                <path d='M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z' />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
