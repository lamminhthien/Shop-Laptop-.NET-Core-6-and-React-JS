import { useEffect, useState } from "react";
import {
  FcPrevious,
  FcOrganization,
  FcBarChart,
  FcAssistant,
  FcBusinessman,
  FcCalendar,
  FcSearch,
  FcFolder,
  FcSettings
} from 'react-icons/fc';
import { Link } from "react-router-dom";
const Sidebar = () => {
  // Set state for button to open sidebar
  const [open, setOpen] = useState(true);
  // List of menu items
  const Menus = [
    { title: "Dashboard", icon: <FcOrganization size={30} />, },
    { title: "Inbox", icon: <FcAssistant size={30} />, },
    { title: "Accounts", icon: <FcBusinessman size={30} />, },
    { title: "Schedule ", icon: <FcCalendar size={30} />, },
    { title: "Search", icon: <FcSearch size={30} />, },
    { title: "Analytics", icon: <FcBarChart size={30} />, },
    { title: "Files ", icon: <FcFolder size={30} />, },
    { title: "Setting", icon: <FcSettings size={30} />, },
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

  return (
    <div
      className={` ${open ? "w-72" : "w-20 "
        } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
    >
      <FcPrevious size={70}
        className={`absolute cursor-pointer right-1 top-7 w-10 border-light-green
          border-2 rounded-full  ${!open && "rotate-180"}`}
        onClick={() => setOpen(!open)}
      />
      <div className="flex gap-x-4 items-center">
        <FcOrganization size={80}

          className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"
            }`}
        />
        <h1
          className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"
            }`}
        >
          Designer
        </h1>
      </div>
      <ul className="pt-6">
        {Menus.map((Menu, index) => (
          <li
            key={index}
            className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"
              } `}
          >
            {Menu.icon}
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              <Link to="/table" >{Menu.title}</Link>
            </span>

          </li>
        ))}
      </ul>
    </div>
  );
};
export default Sidebar;