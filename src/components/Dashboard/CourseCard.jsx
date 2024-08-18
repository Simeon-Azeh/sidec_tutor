import React from 'react';
import { FaStar, FaUsers } from 'react-icons/fa';
import { IoIosTime } from "react-icons/io";

const CourseCard = ({ image, title, description, status, time, rating, ratingCount }) => {
  return (
    <div className="bg-white border rounded-lg overflow-hidden hover:translate-y-[-5px] duration-300 cursor-pointer font-poppins">
      <div className="p-2">
        <div className="relative h-40 bg-cover bg-center rounded overflow-hidden" style={{ backgroundImage: `url(${image})` }}>
          {/* Optional: Add a darker overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-30"></div>
        </div>
      </div>
      <div className="px-4 pb-4">
        <h2 className="text-[16px] font-medium text-[#404660] mb-1">{title}</h2>
        <p className="text-gray-500 font-normal text-justify text-[14px] mb-4 border-b pb-3">{description}</p>
        <div className="flex items-center justify-between mb-2">
          <span className="flex items-center text-sm text-gray-400">
            <span className="mr-2 text-gray-400">{status.icon}</span>
            {status.title}
          </span>
          <span className="flex items-center text-sm text-gray-400">
            <span className="mr-2"><IoIosTime  /></span>
            {time}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center text-sm text-gray-400">
            <span className="mr-2 text-[#FFC107]"><FaStar /></span>
            {rating} ({ratingCount})
          </span>
          <span className="flex items-center text-sm text-gray-500">
            <span className="mr-2"><FaUsers /></span>
            {ratingCount} reviews
          </span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
