import { useEffect, useState } from "react";
import {
  FcPrevious,
  FcMultipleDevices,
  FcDataSheet,
  FcConferenceCall,
  FcSms,
  FcPaid,
  FcShop,
  FcOrgUnit,
  FcCurrencyExchange,
  FcButtingIn,
  FcGallery
} from 'react-icons/fc';
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

const Sidebar = (props) => {
  // Set state for button to open sidebar
  const [open, setOpen] = useState(true);
  // List of menu items 
  const Menus = [
    { title: "Sản phẩm", icon: <FcMultipleDevices size={30} />, href: "/admin/san-pham/1" },
    { title: "Loại sản phẩm", icon: <FcOrgUnit size={30} />, href: "/admin/danh-muc-san-pham/1" },
    { title: "Bình luận sản phẩm", icon: <FcSms size={30} />, href: "/admin/binh-luan-san-pham" },
    { title: "Hóa đơn ", icon: <FcPaid size={30} />, href: "admin/list-hoa-don/" },
    { title: "Hãng sản xuất", icon: <FcShop size={30} />, href: "/admin/list-hang-san-xuat/1" },
    { title: "Khách hàng", icon: <FcConferenceCall size={30} />, href: "/admin/list-khach-hang/1" },
    { title: "Biến động giá sản phẩm", icon: <FcCurrencyExchange size={30} />, href: "/admin/list-bien-dong-gia-ca/1" },
    { title: "Nhân viên !!", icon: <FcButtingIn size={30} />, href: "/admin/list-nhan-vien/1" },
    { title: "Quảng Cáo", icon: <FcGallery   size={30} />, href: "/admin/list-banner" },
  ];
  // Auto close menu when on mobile
  const handleResize = () => {
    if (window.innerWidth < 720) {
      setOpen(false)
    } else {
      setOpen(true)
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize)
  })

  // UseLocation lấy đường dẫn của trang đang xem
  let location = useLocation();
  return (
    <div
      className={` ${open ? "w-72" : "w-20"
        } bg-slate-600  overscroll-y-contain p-5  pt-8 relative duration-300`}
    >
      <FcPrevious size={70}
        className={`absolute cursor-pointer right-1 top-7 w-10 border-light-green
          border-2 rounded-full  ${!open && "rotate-180"}`}
        onClick={() => setOpen(!open)}
      />
      <div className="flex gap-x-4 items-center">
        <FcDataSheet size={80}

          className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"
            }`}
        />
        <h1
          className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"
            }`}
        >
          Dashboard
        </h1>
      </div>
      <ul className="pt-6">
        {Menus.map((Menu, index) => (
          <span className={`${!open && "hidden"} origin-left duration-200`}>
            <Link to={Menu.href} >
              <li
                key={index}
                className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white hover:scale-125 ease-in-out duration-150 text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${location.pathname == Menu.href && "bg-light-white scale-x-125 scale-y-125"
                  } `}
              >
                {Menu.icon}
                {Menu.title}
              </li>
            </Link>
          </span>
        ))}
      </ul>
    </div>
  );
};
export default Sidebar;
