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
import { useNavigate } from 'react-router-dom';
import { MdAddCircleOutline } from "react-icons/md";

const onPanelChange = (value, mode) => {
  console.log(value.format('YYYY-MM-DD'), mode);
};

function Quiz() {
    const navigate = useNavigate();

  const { token } = theme.useToken();
  const wrapperStyle = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };
  const handleCreateNewQuiz = () => {
    navigate('/create-quiz'); // Navigate to the create course page
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

  document.title = 'Quiz | sidec';

  return (
    <div className="flex h-screen">
      <div className='z-40'>
        <Sidebar>
          <Link to="/dashboard">
            <SidebarItem icon={<MdOutlineDashboardCustomize size={20} />} text="Dashboard"  />
          </Link>
          <Link to="/courses">
            <SidebarItem icon={<IoBookOutline size={20} />} text="Courses" alert active />
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
        <div className='w-full lg:pl-5'>
        <button 
              onClick={handleCreateNewQuiz} 
              className="bg-[#9835ff] text-white font-medium py-2 px-4 rounded-md hover:translate-y-[-5px] transition duration-300 my-4 font-poppins flex items-center gap-2">
                <MdAddCircleOutline size={20}/>
              Create New Quiz
            </button>
          
          </div>
          <div className="mb-6 w-full lg:pl-5">
           
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Quiz;
