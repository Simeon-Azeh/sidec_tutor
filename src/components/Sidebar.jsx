import React, { useContext, createContext, useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import Logo from "/images/SidecLogo.png";
import AlternateLogo from "/images/Asset 6.png";
import ProfileAvatar from "/images/avatartwo.avif";
import { LuChevronFirst, LuChevronLast } from "react-icons/lu";
import { IoMdMore } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { AiOutlineLogin } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Link } from "react-router-dom";

const SidebarContext = createContext();

function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);
  const [actionsVisible, setActionsVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [userData, setUserData] = useState({ firstName: "", lastName: "", email: "", avatar: "" });

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) { // iPad breakpoint (1024px)
        setExpanded(true); // Close sidebar on iPad and smaller screens
      } else {
        setExpanded(true); // Keep sidebar open on larger screens
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      }
    };

    fetchUserData();
  }, []);

  const SidebarContent = () => (
    <nav className="h-full flex flex-col bg-white border-r shadow-sm font-poppins ">
      <div className="relative p-3 pb-1 flex justify-between items-center  ">
        <img
          src={expanded ? Logo : AlternateLogo}
          alt="logo"
          className={`overflow-hidden mt-4 transition-all ${expanded ? "w-28" : "w-10 mt-0"}`}
        />
        {/* Only show this button on larger screens */}
        <button
          onClick={toggleSidebar}
          className={`p-1.5 absolute -right-2.5 top-5 rounded-lg bg-gray-50 text-gray-500 hover:bg-gray-100 duration-300 ${window.innerWidth >= 1024 ? "block" : "hidden"}`}
          style={{ zIndex: 1000 }}
        >
          {expanded ? <LuChevronFirst /> : <LuChevronLast />}
        </button>
      </div>
      <SidebarContext.Provider value={{ expanded }}>
        <div className="flex-1 overflow-y-auto overflow-x-hidden mt-10">
          <ul className="px-3">{children}</ul>
        </div>
      </SidebarContext.Provider>
      <div className="border-t flex p-3 relative mt-auto">
        <img src={userData.avatar || ProfileAvatar} className="w-12 h-12 rounded-full" alt="Avatar" />
        <div
          className={`flex justify-between  items-center ml-3 overflow-hidden transition-all ${expanded ? "w-52" : "w-0"}`}
        >
          <div className="leading-5">
            <h4 className="text-gray-500 font-semibold">{userData.firstName} {userData.lastName}</h4>
            <span className="text-gray-400 text-xs">{userData.email}</span>
          </div>
          <button onClick={() => setActionsVisible(!actionsVisible)}>
            <IoMdMore size={24} className="text-gray-400" />
          </button>
        </div>
        {actionsVisible && (
          <div className="absolute right-0 bottom-12 w-48 bg-white border rounded shadow-lg p-4">
            <ul className="text-gray-500 ">
              <Link to="/settings">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b flex items-center gap-x-2"><CgProfile /> View Profile</li>
              </Link>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b flex items-center gap-x-2"> <IoSettingsOutline /> Settings</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-400 flex items-center gap-x-2"><AiOutlineLogin /> Log Out</li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );

  return (
    <>
      {/* Show toggle button on small screens only */}
      <button
        className="lg:hidden text-[22px]  fixed top-5 bg-white  p-1 left-6 text-[#404660] z-20 rounded"
        onClick={toggleDrawer}
      >
        <MenuOutlined size={30} />
      </button>
      <Drawer
        title="Menu"
        placement="left"
        onClose={toggleDrawer}
        visible={drawerVisible}
        className="lg:hidden"
        width={expanded ? 500 : 80}
        bodyStyle={{ padding: 0 }}  // Remove padding to ensure full-height content
      >
        <SidebarContent />
      </Drawer>
      <aside className={`h-screen ${expanded ? "w-64" : "w-20"} transition-all hidden lg:flex`}>
        <SidebarContent />
      </aside>
    </>
  );
}

export function SidebarItem({ icon, text, active, alert, children }) {
  const { expanded } = useContext(SidebarContext);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <li className="relative flex flex-col">
      <div
        className={`relative flex items-center py-2 px-3 my-1 font-sm rounded-md cursor-pointer transition-colors group ${active ? "bg-gradient-to-tr from-slate-50 to-slate-100 text-[#9835ff]" : "hover:bg-gray-50 text-gray-500"}`}
        onClick={children ? toggleDropdown : null}
      >
        {icon}
        <span
          className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}
        >
          {text}
        </span>
        {alert && (
          <div
            className={`absolute right-2 w-2 h-2 rounded bg-[#9835ff] ${expanded ? "" : "top-2"}`}
          />
        )}
        {children && expanded && (
          <div className="absolute right-2">
            {dropdownVisible ? <IoIosArrowUp size={16} /> : <IoIosArrowDown size={16} />}
          </div>
        )}
        {!expanded && (
          <div className="absolute left-full rounded-md px-2 py-1 ml-6 text-xs text-white bg-[#9835ff] invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
            {text}
          </div>
        )}
      </div>
      {dropdownVisible && expanded && (
        <ul className="ml-6 mt-2 overflow-y-auto" style={{ maxHeight: "200px" }}>
          {children}
        </ul>
      )}
    </li>
  );
}

export function DropdownItem({ text }) {
  return (
    <li className="py-1 px-3 text-gray-500 hover:bg-gray-100 cursor-pointer">{text}</li>
  );
}

export default Sidebar;