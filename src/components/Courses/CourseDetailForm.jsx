import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ListInput from './ListInput';
import { MdOutlineAddCircleOutline } from "react-icons/md";

const CourseDetailsForm = ({ courseDetails, setCourseDetails, handleNextStep, handleFileChange }) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!courseDetails.title) newErrors.title = 'Course title is required';
    if (!courseDetails.category) newErrors.category = 'Category is required';
    if (!courseDetails.level) newErrors.level = 'Level is required';
    if (!courseDetails.description) newErrors.description = 'Description is required';
    if (courseDetails.learningOutcomes.length === 0) newErrors.learningOutcomes = 'At least one learning outcome is required';
    if (!courseDetails.cover) newErrors.cover = 'Course cover is required';
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      handleNextStep();
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="| Your course title goes here..."
        value={courseDetails.title}
        onChange={(e) => setCourseDetails({ ...courseDetails, title: e.target.value })}
        className="mb-4 p-4 w-full bg-[#9835ff] rounded-md text-lg outline-none font-normal placeholder-white text-white"
      />
      {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
      
      <div className="flex flex-col gap-4 items-center lg:flex-row">
        <div className="w-[40%]">
          <label className="text-[#404660] font-medium text-base">Category:</label>
          <select
            value={courseDetails.category}
            onChange={(e) => setCourseDetails({ ...courseDetails, category: e.target.value })}
            className="p-2 w-full border rounded-md outline-none mt-2"
          >
            <option value="">Select Category</option>
            <option value="science">Science</option>
            <option value="arts">Arts</option>
            <option value="technology">Technology</option>
            <option value="freelance">Freelance</option>
          </select>
          {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
        </div>
        <div className="w-[60%]">
          <label className="text-[#404660] font-medium text-base">Level:</label>
          <div className="flex flex-wrap mt-2">
            {['Advanced Level', 'Ordinary Level', 'Advanced Freelance', 'Beginner Freelance', 'Intermediate Freelance'].map(level => (
              <label className="custom-radio" key={level}>
                <input
                  type="radio"
                  name="level"
                  value={level}
                  checked={courseDetails.level === level}
                  onChange={(e) => setCourseDetails({ ...courseDetails, level: e.target.value })}
                />
                <span className="custom-radio-box"></span>
                {level}
              </label>
            ))}
          </div>
          {errors.level && <p className="text-red-500 text-sm">{errors.level}</p>}
        </div>
      </div>

      <div className="mb-4">
        <label className="text-[#404660] font-medium text-base ">Description:</label>
        <div className='w-full bg-white p-1 mt-2'>
          <ReactQuill
            value={courseDetails.description}
            onChange={(value) => setCourseDetails({ ...courseDetails, description: value })}
            className="border rounded-md  outline-none font-poppins text-[#404660] bg-white "
          />
        </div>
        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
      </div>
      
      <div className="mb-4">
        <label className="text-[#404660] font-medium text-base">What students will learn:</label>
        <ListInput
          value={courseDetails.learningOutcomes}
          onChange={(value) => setCourseDetails({ ...courseDetails, learningOutcomes: value })}
          className="mt-2"
        />
        {errors.learningOutcomes && <p className="text-red-500 text-sm">{errors.learningOutcomes}</p>}
      </div>
      
      <div className="mb-4">
        <div className="upload-box border-2 border-dashed border-gray-300 p-4 rounded-md gap-1">
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id="course-cover"
          />
          <label htmlFor="course-cover" className="cursor-pointer text-[#404660] font-medium">
            {courseDetails.cover ? courseDetails.cover.name : 'Upload Course Cover'}
          </label>
          <MdOutlineAddCircleOutline className="text-[#9835ff]" />
        </div>
        {errors.cover && <p className="text-red-500 text-sm">{errors.cover}</p>}
      </div>
      
      <button onClick={handleSubmit} className="bg-[#9835ff] text-white py-2 px-4 rounded-md flex justify-end ">
        Next 
      </button>
    </div>
  );
};

export default CourseDetailsForm;