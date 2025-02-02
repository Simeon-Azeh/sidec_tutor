import React from 'react';
import Sidebar, { SidebarItem } from '../Sidebar';
import { MdOutlineDashboardCustomize, MdOutlineQuiz, MdOutlineChatBubbleOutline } from 'react-icons/md';
import { IoBookOutline } from 'react-icons/io5';
import { RiSettings4Line } from 'react-icons/ri';
import { IoMdHelpCircleOutline } from 'react-icons/io';
import { Link } from 'react-router-dom';

const SidebarMenu = () => (
  <Sidebar>
    <Link to="/dashboard">
      <SidebarItem icon={<MdOutlineDashboardCustomize size={20} />} text="Dashboard" />
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
    <hr className="my-4" />
    <Link to="/settings">
      <SidebarItem icon={<RiSettings4Line size={20} />} text="Settings" alert />
    </Link>
    <Link to="/support">
      <SidebarItem icon={<IoMdHelpCircleOutline size={20} />} text="Support" />
    </Link>
  </Sidebar>
);

export default SidebarMenu;