import React from 'react';
import { SiListmonk } from "react-icons/si";

const SelectModuleStep = ({ selectedModule, handleModuleSelect, modules = [] }) => {
  return (
    <div className="font-poppins lg:w-5/6 mx-auto bg-white p-4 rounded">
      <p className='text-[#404660] text-base mb-3'>Select the module you want to create a quiz for</p>
      {modules.map((module, index) => (
        <div
          key={module.id}
          className={`p-4 border-b rounded cursor-pointer ${selectedModule === module.id ? 'bg-[#9835ff]/10' : ''}`}
          onClick={() => handleModuleSelect(module.id)}
        >
          <div>
            <h1 className='text-base font-medium text-[#404660] flex items-center gap-2'><SiListmonk size={8} />{module.title}</h1>
            <p className='text-sm text-gray-500 pl-6'>| {module.subModules.length} submodules</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SelectModuleStep;