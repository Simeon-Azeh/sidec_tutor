import React from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { IoLogoJavascript, IoLogoReact } from "react-icons/io5";
import { MdWorkHistory } from "react-icons/md";
import { FaCheckCircle } from 'react-icons/fa';
import { FaCalendarAlt, FaUsers } from 'react-icons/fa';

const ResponsiveTable = () => {
  const courses = [
    {
      icon: <IoLogoJavascript size={25} className='text-white p-2 rounded bg-teal-500' />,
      title: 'Advanced Js',
      description: 'Advanced • 5 hours ',
      enrolled: 30,
      nextSession: '2024-08-25',
      status: { title: 'Active', icon: <FaCheckCircle size={16} className="text-[#9835ff]" /> },
    },
    {
      icon: <IoLogoReact size={25} className='text-white p-1 rounded bg-[#00A7E1]' />,
      title: 'React Basics',
      description: 'Beginner • 3 hours',
      enrolled: 0,
      nextSession: '2024-08-30',
      status: { title: 'Pending Approval', icon: <FaCalendarAlt size={16} className="text-yellow-500" /> },
    },
    {
      icon: <MdWorkHistory size={25} className='text-white p-1 rounded bg-teal-500' />,
      title: 'History for Alevels',
      description: 'Beginner • 4 hours',
      enrolled: 25,
      nextSession: '2024-09-05',
      status: { title: 'Active', icon: <FaCheckCircle size={16} className="text-[#9835ff]" /> },
    },
  ];

  return (
    <div className='bg-white py-6 mt-6 font-poppins border rounded-md'>
      <div className='flex justify-between px-4 mb-2'>
        <h1 className='text-lg font-medium text-[#404660]'>Your Hosted Courses</h1> 
        <a href='' className='text-sm text-gray-500 border py-1 px-3 cursor-pointer rounded hover:translate-y-[-5px] duration-300'>View all</a>
      </div>
      <div className="overflow-x-auto px-4">
        <table className="min-w-full">
          <thead>
            <tr className="w-full bg-[#F9feff] rounded-lg text-[#404660] text-left text-sm">
              <th className="py-3 px-4 font-medium">Course Name</th>
              <th className="py-3 px-4 font-medium">Enrolled Students</th>
              <th className="py-3 px-4 font-medium">Next Session</th>
              <th className="py-3 px-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={index} className="border-t hover:bg-gray-50 cursor-pointer">
                <td className="py-4 px-4 flex items-center">
                  {course.icon}
                  <div className="ml-4">
                    <h1 className="font-medium text-[#404660] text-sm md:text-[16px]">{course.title}</h1>
                    <div className="text-gray-500 text-sm hidden md:block">{course.description}</div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <FaUsers size={16} className="text-gray-500" />
                    <span className="ml-2 text-sm font-medium text-gray-700">{course.enrolled}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <FaCalendarAlt size={16} className="text-gray-500" />
                    <span className="ml-2 text-sm font-medium text-gray-700">{course.nextSession}</span>
                  </div>
                </td>
                <td className="py-4 px-4 flex items-center justify-between">
                  <div className="flex items-center border py-1 px-3 rounded">
                    {course.status.icon}
                    <span className="ml-2 text-sm font-medium">{course.status.title}</span>
                  </div>
                  <FiChevronRight size={20} className="text-gray-500" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResponsiveTable;
