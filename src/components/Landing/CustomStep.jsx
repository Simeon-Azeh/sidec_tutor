import React from 'react';

const CustomStep = ({ step, index, current, setCurrent }) => (
  <div
    className={`flex flex-col font-poppins items-center font-medium cursor-pointer mb-8 transition-colors ${
      current === index ? 'text-[#9835ff]' : 'text-gray-400'
    } md:items-center`}
  >
    <div
      className={`w-10 h-10 rounded-full flex items-center text-xl justify-center border ${
        current === index ? 'border-[#9835ff] border border-solid' : 'border-gray-300 border-solid'
      }`}
      onClick={() => setCurrent(index)}
    >
      {step.icon}
    </div>
    <span
      className={`mt-2 text-sm ${current === index ? 'text-[#9835ff]' : 'text-gray-600'} hidden md:block`}
    >
      {step.title}
    </span>
  </div>
);

export default CustomStep;
