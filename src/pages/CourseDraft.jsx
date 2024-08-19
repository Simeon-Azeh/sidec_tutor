import React from 'react';
import Sidebar, { SidebarItem } from '../components/Sidebar';
import {
  MdDashboardCustomize,
  MdPeople,
  MdAccessTime,
  MdReport,
  MdSettings,
  MdBook,
  MdHelp,
  MdMessage,
  MdOutlineQuiz,
  MdOutlineChatBubbleOutline,
  MdOutlineDashboardCustomize,
  MdDragIndicator,
} from 'react-icons/md';
import { RiSettings4Line } from 'react-icons/ri';
import { IoBookOutline } from "react-icons/io5";
import { MdEditNote } from "react-icons/md";
import { GiClockwiseRotation } from "react-icons/gi";
import { IoMdHelpCircleOutline, IoMdMore, IoMdAdd  } from "react-icons/io";
import { FaEdit, FaChevronDown } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Dropdown, Menu } from 'antd'; // Add this import for Ant Design's Dropdown
import { IoEllipsisHorizontalOutline } from "react-icons/io5";
import { MdOutlineLibraryAddCheck } from "react-icons/md";
import { MdBroadcastOnHome } from "react-icons/md";
import { LuUsers } from "react-icons/lu";

function CourseDraft() {
  const navigate = useNavigate();

  const modules = [
    {
      title: 'Module 1',
      submodules: [
        { title: 'Submodule 1.1' },
        { title: 'Submodule 1.2' },
      ],
    },
    {
      title: 'Module 2',
      submodules: [
        { title: 'Submodule 2.1' },
        { title: 'Submodule 2.2' },
      ],
    },
    {
      title: 'Module 3',
      submodules: [
        { title: 'Submodule 3.1' },
        { title: 'Submodule 3.2' },
      ],
    },
  ];

  document.title = 'Courses | sidec';

  return (
    <div className="flex h-screen">
      <div className="z-40">
        <Sidebar>
          <Link to="/dashboard">
            <SidebarItem
              icon={<MdOutlineDashboardCustomize size={20} />}
              text="Dashboard"
            />
          </Link>
          <Link to="/courses">
            <SidebarItem icon={<IoBookOutline size={20} />} text="Courses" alert active />
          </Link>
          <Link to="/quizzes">
            <SidebarItem icon={<MdOutlineQuiz size={20} />} text="Quizzes" alert />
          </Link>
          <Link to="/messages">
            <SidebarItem
              icon={<MdOutlineChatBubbleOutline size={20} />}
              text="Messages"
              alert
            />
          </Link>
          <hr className="my-4" />
          <Link to="/settings">
            <SidebarItem icon={<RiSettings4Line size={20} />} text="Settings" alert />
          </Link>
          <Link to="/support">
            <SidebarItem
              icon={<IoMdHelpCircleOutline size={20} />}
              text="Support"
            />
          </Link>
        </Sidebar>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-10">
          <Navbar />
        </div>
        <div className="flex flex-col px-4 lg:px-9 p-6 lg:pl-16">
          <div className="flex justify-between font-poppins">
            <h1 className="text-2xl font-medium font-poppins text-[#404660]">
              Advanced Javascript
            </h1>
            <div className="flex gap-4">
              <button className="bg-transparent border border-[#404660]/50 font-medium border-solid text-[#404660] rounded-md px-4 py-2 hover:translate-y-[-5px] duration-300">
                Cancel
              </button>
              <button className="bg-[#9835ff] text-white rounded-md px-4 py-2 hover:translate-y-[-5px] duration-300">
                Save Draft
              </button>
            </div>
          </div>
          <div className="flex gap-4 font-poppins mt-8">
            <div className="w-[65%]">
              <h1 className="text-lg text-[#404660] font-medium">Basic info</h1>
              <div className="flex flex-col gap-2 mt-4">
                <p className="text-base text-gray-500 font-medium">Course title</p>
                <input
                  type="text"
                  className="w-full border border-[#404660]/50 rounded-md py-1 px-4 outline-none text-[#404660] font-medium"
                  value={'Advanced Javascript'}
                />
              </div>
              <div className="flex flex-col gap-2 mt-4">
                <p className="text-base text-gray-500 font-medium">Description</p>
                <div className="w-full bg-white p-1 rounded">
                  <ReactQuill
                    value={'Course description'}
                    className=" rounded-md mb-2"
                  />
                  <p className="text-sm text-gray-500">274 characters left</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <p className="text-base text-gray-500 font-medium">Cover Image</p>
                <button className="flex items-center gap-1 text-[#9835ff] rounded-md hover:translate-y-[-5px] duration-300 font-medium text-base">
                  <GiClockwiseRotation /> Click to change
                </button>
              </div>
              <div className="w-full h-[300px] mt-2">
                <img
                  src="https://i.pinimg.com/736x/71/ee/32/71ee32577432648f9e45fbd63b2cf261.jpg"
                  alt=""
                  className="w-full object-contain h-[auto] rounded"
                />
              </div>
              <div className="flex flex-col gap-2 mt-4">
                <p className="text-base text-gray-500 font-medium">Content</p>
                <div className="flex flex-col gap-2">
                  {modules.map((module, index) => (
                    <div
                      key={index}
                      className="w-full bg-white rounded-md p-4 border border-[#404660]/50"
                    >
                      <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                          <MdDragIndicator size={20} className='text-gray-400' />
                          <div className="">
                        <Dropdown
                          overlay={
                            <Menu>
                              {module.submodules.map((submodule, subIndex) => (
                                <Menu.Item key={subIndex}>
                                  {submodule.title}
                                </Menu.Item>
                              ))}
                            </Menu>
                          }
                        >
                          <button className="flex items-center gap-1 text-gray-400 rounded-md hover:translate-y-[-5px] duration-300 font-medium text-base">
                            <FaChevronDown />
                          </button>
                        </Dropdown>
                      </div>
                          <p className="text-lg font-medium text-[#404660]">{module.title}</p>

                        </div>
                        <div className="flex items-center gap-2">
                        <button className="text-[#404660] border px-3 py-1 rounded border-[#404660]/50 hover:translate-y-[-5px] duration-300 flex items-center gap-1">
                            Edit
                            <MdEditNote />
                          </button>
                          <button className="text-gray-500">
                          <IoEllipsisHorizontalOutline size={20} />
                          </button>
                         
                        </div>
                      </div>
                    
                    </div>
                  ))}
                </div>
                <button className="flex items-center gap-1 text-[#9835ff] rounded-md hover:translate-y-[-5px] duration-300 font-medium text-base">
                  <IoMdAdd /> Add new module
                </button>
              </div>
            </div>
            <div className='w-[35%] bg-white p-4 rounded-md'>
                <div className='bg-[#9835ff] p-4 rounded-md w-full'>
                    <h1 className="text-lg text-white font-medium">Get Verified</h1>
                    <p className='text-xs mb-2 text-white'>Reach more people with a verified batch</p>
                    <button className="text-[#9835ff] text-sm font-medium shadow-sm px-3 py-1 rounded bg-white border-solid hover:translate-y-[-5px] duration-300 flex items-center gap-1">
                      Get Verified
                       
                      </button>
                </div>
                <div className='w-full'>
                    <h1 className="text-base text-gray-500 font-medium mt-4">Course Status</h1>
                    <div className='flex items-center gap-2 w-full'>
                    <p className="bg-[#9835ff] text-sm text-white font-medium px-3 py-1 rounded mt-1 flex items-center gap-1">
                    <MdOutlineLibraryAddCheck size={20} />Approved</p>
                    <p className="bg-[#9835ff] text-sm text-white font-medium px-3 py-1 rounded mt-1 flex items-center gap-1"><MdBroadcastOnHome size={20} />Live</p>
                    <p className="bg-[#9835ff] text-sm text-white font-medium px-3 py-1 rounded mt-1 flex items-center gap-1"><LuUsers size={20} /> 34 </p>
                    </div>
                   <button className='text-white bg-red-400 text-sm font-medium shadow-sm px-3 py-2 rounded  flex items-center gap-1 mt-4 hover:translate-y-[-5px] duration-300'>
                    Unpublish Course
                   </button>
                 
                </div>
                <div>
                    <h1 className="text-base text-gray-500 font-medium mt-4">Course Level</h1>
                    <div>
                        <select className="w-full p-2 border border-[#404660]/50 rounded-md mt-1 outline-none text-[#404660] font-medium">
                            <option>Advanced Level</option>
                            <option>Ordinary Level</option>
                            <option>Beginner</option>
                            <option>Intermediate</option>
                            <option selected>Advanced</option>
                        </select>
                    </div>
                </div>
                <div>
                <h1 className="text-base text-gray-500 font-medium mt-4">Course Category</h1>
                    <div>
                        <select className="w-full p-2 border border-[#404660]/50 rounded-md mt-1 outline-none text-[#404660] font-medium">
                            <option>Science</option>
                            <option>Arts</option>
                            <option selected>Technology</option>
                        </select>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDraft;
