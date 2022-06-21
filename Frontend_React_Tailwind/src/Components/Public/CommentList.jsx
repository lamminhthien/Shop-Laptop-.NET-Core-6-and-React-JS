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
        <div className='container p-20 m-auto'>
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
                        console.log('This is log for event handleing');
                        console.log(e);
                        let noiDung = prompt("Nhập nôi dung phản hồi bình luận, tối thiểu 10 ký tự, tối đa 255 ky")
                        if (noiDung != null) {
                          axios.post(`https://localhost:7216/api/QuanLyBinhLuanSanPham/PhanHoiBinhLuanSP?maBinhLuan=${item.maBinhLuan}&noiDung=${noiDung}`,null,configJWT)
                          .then(res => {
                            alert(res.data)
                          }).catch(err => {
                            alert(err.response.data)
                          })
                        }
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
