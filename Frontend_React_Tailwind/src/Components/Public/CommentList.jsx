import {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';

export default function CommentList() {
  const [listBinhLuan, setListBinhLuan] = useState([]);
  const [state, setState] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  let {id} = useParams();
  const configJWT = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  };
  useEffect(() => {
    axios
      .get(`https://localhost:7216/api/TrangChiTietSanPham/ListBinhLuanSanPham?id=${id}`)
      .then(res => {
        console.log('%cThis is a green text', 'color:green');
        setListBinhLuan(res.data);
        setState(true);
      })
      .catch(err => {
        console.log('%cThis is a red text', 'color:red');
      });

    axios
      .get(`https://localhost:7216/api/LoginNhanVien/validateToken`, configJWT)
      .then(res => {
        setIsAdmin(true);
      })
      .catch(err => {
        setIsAdmin(false);
      });
  }, [isAdmin]);
  const renderData = () => {
    console.log(listBinhLuan);
    if (state === true) {
      return (
        <div className='container max-w-[1920px] p-20  m-auto h-[1200px]'>
          <div className='justify-between'>
            <div className='flex justify-between space-y-5 mb-16'>
              <div className='title-left '>
                <h1 className='text-3xl leading-6 font-semibold'>Phản hồi của khách hàng</h1>
                <p className='text-lg font-normal'>Don't take our word for it. Trust our customers</p>
              </div>
              <div className='title-right flex gap-3'>
                <a href='#'>
                  <div className='button border-2 border-gray-400 p-2 rounded-2xl text-base'>Previous</div>
                </a>
                <a href='#'>
                  <div className='button border-2 border-gray-400 p-2 rounded-2xl text-base'>Next</div>
                </a>
              </div>
            </div>
            {/* Comment List */}
            <div className='comment-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-5'>
              {listBinhLuan.map(item => (
                <div className='comment-card border-2 border-gray-300  min-h-[283px] p-6 overflow-auto space-y-6'>
                  <div className='avatar rounded-full border-4 w-[60px] h-[60px] bg-gradient-to-t'>
                    <img
                      src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0BaxevbHsera-I9b57I40phEGm3caprMeLA&usqp=CAU'
                      alt=''
                    />
                  </div>
                  <div className='customer-name'>
                    <h2 className='text-2xl font-bold'>{item.tenKhachHang}</h2>
                  </div>
                  <div className='content break-all'>{item.noiDung}</div>
                  {isAdmin ? (
                    <button
                      className='text-white px-5 bg-blue-500 rounded-2xl'
                      onClick={e => {
                        const scriptHTML =
                          '<div class=`code-preview rounded-xl bg-gradient-to-r bg-white  border-gray-200 p-2 sm:p-6"><label for="message" class="block mb-2 text-sm font-medium text-gray-900">Bình luận sản phẩm</label><textarea name="noiDung" id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Để lại bình luận, ý kiến về sản phẩm này"></textarea><input type="submit" class="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" value="Gửi ý kiến"></div>';
                        console.log('This is log for event handleing');
                        console.log(e.target);
                        e.target.innerHTML = scriptHTML;
                      }}>
                      Phản hồi
                    </button>
                  ) : (
                    ''
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    } else return <>No data</>;
  };

  return renderData();
}
