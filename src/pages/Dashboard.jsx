import React from 'react';
import Sidebar, { SidebarItem, DropdownItem } from '../components/Sidebar';
import { MdDashboardCustomize, MdPeople, MdAccessTime, MdReport, MdSettings, MdBook, MdHelp, MdMessage, MdOutlineQuiz, MdOutlineChatBubbleOutline } from 'react-icons/md';
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { RiArchiveDrawerFill } from "react-icons/ri";
import { IoMdChatbubbles } from "react-icons/io";
import { MdOutlineDatasetLinked } from "react-icons/md";
import Navbar from '../components/Navbar';
import { IoBookOutline } from "react-icons/io5";
import { RiSettings4Line } from "react-icons/ri";
import { IoMdHelpCircleOutline } from "react-icons/io";
import Card from '../components/Dashboard/Card';
import { FaBook, FaChalkboardTeacher, FaCertificate } from "react-icons/fa";
import ResponsiveTable from '../components/Dashboard/ResponsiveTable';
import CourseList from '../components/Dashboard/CourseList';
import { Link } from 'react-router-dom';
import { Calendar, theme } from 'antd';

const onPanelChange = (value, mode) => {
  console.log(value.format('YYYY-MM-DD'), mode);
};

function Dashboard() {
  const { token } = theme.useToken();
  const wrapperStyle = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  const sampleEnrolledUsers = [
    { image: 'https://via.placeholder.com/40' },
    { image: 'https://via.placeholder.com/40' },
    { image: 'https://via.placeholder.com/40' },
    { image: 'https://via.placeholder.com/40' },
  ];

  const sampleChapters = [
    'Introduction',
    'Chapter 1: Getting Started',
    'Chapter 2: Basics',
    'Chapter 3: Advanced Topics',
    'Chapter 4: Conclusion',
  ];

  document.title = 'Dashboard | sidec';

  return (
    <div className="flex h-screen">
      <div className='z-40'>
        <Sidebar>
          <Link to="/dashboard">
            <SidebarItem icon={<MdOutlineDashboardCustomize size={20} />} text="Dashboard" active />
          </Link>
          <Link to="/courses">
            <SidebarItem icon={<IoBookOutline size={20} />} text="Courses" alert />
          </Link>
          <Link to="/quizzes">
            <SidebarItem icon={<MdOutlineQuiz size={20} />} text="Quizzes" alert />
          </Link>
         
          <Link to="/messages">
            <SidebarItem icon={<MdOutlineChatBubbleOutline size={20} />} text="Messages" alert />
          </Link>
          <hr className='my-4' />
          <Link to="/settings">
            <SidebarItem icon={<RiSettings4Line size={20} />} text="Settings" alert />
          </Link>
          <Link to="/support">
            <SidebarItem icon={<IoMdHelpCircleOutline size={20} />} text="Support" />
          </Link>
        </Sidebar>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-10">
          <Navbar />
        </div>
        <div className='flex flex-col px-4 lg:px-9 p-6'>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6 lg:pl-5">
            <Card
              icon={FaBook}
              bgColor="border-[#9835ff] border bg-white"
              title="6"
              description="Courses Owned"
              detailsLink="/courses/enrolled"
              IbgColor="bg-[#9835ff] text-white"
              BtnBgcolor="text-[#9835ff]"
            />
            <Card
              icon={FaChalkboardTeacher}
              bgColor="bg-white border"
              title="357"
              description="Enrolled Users"
              detailsLink="/courses/saved"
              IbgColor="bg-emerald-400 text-white"
              BtnBgcolor="text-gray-400"
            />
            <Card
              icon={FaCertificate}
              bgColor="bg-white border"
              title="27350 XAF"
              description="Earnings"
              detailsLink="/courses/enrolled/certificates"
              IbgColor="bg-fuchsia-500 text-white"
              BtnBgcolor="text-gray-400"
            />
          </div>
          <div className="mb-6 w-full lg:pl-5">
            <ResponsiveTable />
          </div>
          <div className='w-full lg:pl-5'>
            <CourseList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
