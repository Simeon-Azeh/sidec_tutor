import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ListInput from './ListInput';

const BasicInfoStep = ({ quizInstructions, setQuizInstructions }) => {
  return (
    <div className='font-poppins lg:w-5/6 mx-auto bg-white p-4 rounded'>
      <div className="mb-4">
        <label className="block mb-2 text-base font-medium text-[#404660]">Quiz title</label>
        <input type="text" className="w-full p-2 border rounded border-[#404660]/20 outline-none" />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-base font-medium text-[#404660]">Description</label>
        <ReactQuill theme="snow" />
      </div>
      <div className="mb-4">
        <label className="text-[#404660] font-medium text-base">What students will learn:</label>
        <ListInput value={quizInstructions} onChange={(newInstructions) => setQuizInstructions(newInstructions)} />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Time (in minutes)</label>
        <input type="number" className="w-full p-2 border rounded outline-none text-[#404660] font-medium" />
      </div>
    </div>
  );
};

export default BasicInfoStep;