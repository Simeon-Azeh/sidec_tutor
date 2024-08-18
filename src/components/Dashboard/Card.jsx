import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Card = ({ icon: Icon, bgColor, title, description, detailsLink, IbgColor, BtnBgcolor }) => {
  return (
    <div
      className={`w-full p-4 rounded-md font-poppins cursor-pointer hover:translate-y-[-5px] duration-300 ${bgColor} `}
    >
      <div className="flex items-center gap-4">
        <p className={`p-1 rounded-md ${IbgColor}`}> <Icon size={20} /></p>
        <div className=''>
        <h1 className="text-lg font-semibold text-[#404660]">{title}</h1>
        <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <hr className='my-3' />
      <div className={`flex items-center justify-between ${BtnBgcolor}`}>
        <Link to={detailsLink} className="flex items-center text-sm font-medium">
          View Details
          <FaArrowRight className='text-sm ml-2' />
        </Link>
      </div>
    </div>
  );
};

export default Card;
