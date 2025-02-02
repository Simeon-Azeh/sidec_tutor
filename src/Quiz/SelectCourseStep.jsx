import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";

const SelectCourseStep = ({ selectedCourse, handleCourseSelect, courses }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const stripHtmlTags = (html) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="font-poppins lg:w-5/6 mx-auto bg-white p-4 rounded">
      <div className='font-poppins relative'>
        <p className='text-[#404660] text-base mb-3'>Select the course you want to create a quiz for</p>
        <CiSearch size={40} className='text-[#404660] absolute top-10 left-0 font-medium bg-[#F2F2F2] p-2 rounded' />
        <input
          type="text"
          placeholder="Search courses..."
          className="w-full py-3 mb-4 border rounded px-12 outline-none text-[#404660]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <p className='text-gray-500 mb-4 text-sm'>{filteredCourses.length} active courses found</p>
      <div className="">
        {filteredCourses.map(course => (
          <div
            key={course.id}
            className={`p-4 cursor-pointer border-b rounded border-b-[#404660]/20 flex ${selectedCourse === course.id ? 'bg-[#9835ff]/10' : ''}`}
            onClick={() => handleCourseSelect(course)}
          >
            <div className='w-14 h-14 '>
              <img src={course.cover} alt={course.title} className='w-full object-cover h-full rounded' />
            </div>
            <div className='ml-4'>
              <h1 className="text-base font-medium text-[#404660]">{course.title}</h1>
              <p className="text-sm text-gray-500">{stripHtmlTags(course.description)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectCourseStep;