import React, { useState } from 'react';
import Sidebar, { SidebarItem } from '../components/Sidebar';
import { MdOutlineDashboardCustomize, MdOutlineQuiz, MdOutlineChatBubbleOutline } from 'react-icons/md';
import { IoBookOutline } from 'react-icons/io5';
import { RiSettings4Line } from 'react-icons/ri';
import { IoMdHelpCircleOutline } from 'react-icons/io';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { Steps } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FaRegCheckCircle } from 'react-icons/fa';
import { MdOutlineAddCircleOutline } from "react-icons/md";

function CreateCourse() {
  const [step, setStep] = useState(1);
  const [courseDetails, setCourseDetails] = useState({
    title: '',
    category: '',
    price: '',
    description: '',
    learningOutcomes: [],
    level: '',
    cover: null,
  });
  const [curriculum, setCurriculum] = useState([]);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleFileChange = (e) => {
    setCourseDetails({
      ...courseDetails,
      cover: e.target.files[0],
    });
  };

  const steps = [
    {
      title: 'Course Details',

    },
    {
      title: 'Curriculum',
    
    },
    {
      title: 'Review & Publish',
     
    },
  ];

  return (
    <div className="flex h-screen">
      <div className="z-40">
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
      </div>

      <div className="flex-1 overflow-y-auto font-poppins">
        <div className="sticky top-0 z-10">
          <Navbar />
        </div>
        <div className="flex flex-col px-4 lg:px-9 p-6 lg:pl-16 ">
          <Steps current={step - 1} className="custom-steps mb-6">
            {steps.map((item, index) => (
              <Steps.Step key={index} title={item.title} description={item.description} />
            ))}
          </Steps>

          {step === 1 && (
            <div>
             
                        <input
            type="text"
            placeholder="| Your course title goes here..."
            value={courseDetails.title}
            onChange={(e) => setCourseDetails({ ...courseDetails, title: e.target.value })}
            className="mb-4 p-4 w-full bg-[#9835ff] rounded-md text-lg outline-none font-normal placeholder-white text-white"  />
            <div className='flex flex-col gap-4 items-center lg:flex-row'>
            <div className="w-[40%]">
                <label className='text-[#404660] font-medium text-base '>Category:</label>
                <select
                  value={courseDetails.category}
                  onChange={(e) => setCourseDetails({ ...courseDetails, category: e.target.value })}
                  className="p-2 w-full border rounded-md outline-none mt-2"
                >
                
                  <option value="science">Science</option>
                  <option value="arts">Arts</option>
                  <option value="technology">Technology</option>
                  <option value="freelance">Freelance</option>
                </select>
              </div>
              <div className="w-[60%]">
                <label className='text-[#404660] font-medium text-base '>Level:</label>
                <div className="flex flex-wrap mt-2">
                  <label className="custom-radio">
                    <input
                      type="radio"
                      name="level"
                      value="Advanced Level"
                      checked={courseDetails.level === 'Advanced Level'}
                      onChange={(e) => setCourseDetails({ ...courseDetails, level: e.target.value })}
                    />
                    <span className="custom-radio-box"></span>
                    A Level
                  </label>
                  <label className="custom-radio">
                    <input
                      type="radio"
                      name="level"
                      value="Ordinary Level"
                      checked={courseDetails.level === 'Ordinary Level'}
                      onChange={(e) => setCourseDetails({ ...courseDetails, level: e.target.value })}
                    />
                    <span className="custom-radio-box"></span>
                    O Level
                  </label>
                  <label className="custom-radio">
                    <input
                      type="radio"
                      name="level"
                      value="Advanced Freelance"
                      checked={courseDetails.level === 'Advanced Freelance'}
                      onChange={(e) => setCourseDetails({ ...courseDetails, level: e.target.value })}
                    />
                    <span className="custom-radio-box"></span>
                    Advanced 
                  </label>
                  <label className="custom-radio">
                    <input
                      type="radio"
                      name="level"
                      value="Beginner Freelance"
                      checked={courseDetails.level === 'Beginner Freelance'}
                      onChange={(e) => setCourseDetails({ ...courseDetails, level: e.target.value })}
                    />
                    <span className="custom-radio-box"></span>
                    Beginner 
                  </label>
                  <label className="custom-radio">
                    <input
                      type="radio"
                      name="level"
                      value="Beginner Freelance"
                      checked={courseDetails.level === 'Beginner Freelance'}
                      onChange={(e) => setCourseDetails({ ...courseDetails, level: e.target.value })}
                    />
                    <span className="custom-radio-box"></span>
                    Intermediate 
                  </label>
                </div>
              </div>
            </div>
              
           
              <div className="mb-4">
                <label className='text-[#404660] font-medium text-base '>Description:</label>
                <ReactQuill
                  value={courseDetails.description}
                  onChange={(value) => setCourseDetails({ ...courseDetails, description: value })}
                  className="border rounded-md mt-2 outline-none font-poppins text-[#404660] "
                />
              </div>
              <div className="mb-4">
                <label className='text-[#404660] font-medium text-base'>What students will learn:</label>
                <ListInput
                  value={courseDetails.learningOutcomes}
                  onChange={(value) => setCourseDetails({ ...courseDetails, learningOutcomes: value })}
                  className="mt-2" 
                />
              </div>
              <div className="mb-4">
                <div className="upload-box border-2 border-dashed border-gray-300 p-4 rounded-md gap-1">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="course-cover"
                  />
                  <label htmlFor="course-cover" className="cursor-pointer text-[#404660] font-medium ">
                    {courseDetails.cover ? courseDetails.cover.name : 'Upload Course Cover'}
                  </label>
                  <MdOutlineAddCircleOutline className='text-[#9835ff] ' />  
                </div>
              </div>
              <button onClick={handleNextStep} className="bg-[#9835ff] text-white py-2 px-4 rounded-md">
                Next
              </button>
            </div>
          )}

          {/* ... rest of the steps ... */}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Curriculum</h2>
              <button
                onClick={() => setCurriculum([...curriculum, { title: '', subModules: [] }])}
                className="bg-green-500 text-white py-2 px-4 rounded-md mb-4"
              >
                Add Module
              </button>
              {curriculum.map((module, index) => (
                <div key={index} className="mb-4 border p-4 rounded">
                  <input
                    type="text"
                    placeholder="Module Title"
                    value={module.title}
                    onChange={(e) => {
                      const updatedModules = [...curriculum];
                      updatedModules[index].title = e.target.value;
                      setCurriculum(updatedModules);
                    }}
                    className="mb-2 p-2 w-full border rounded"
                  />
                  <button
                    onClick={() => {
                      const updatedModules = [...curriculum];
                      updatedModules[index].subModules.push({ type: '', content: '' });
                      setCurriculum(updatedModules);
                    }}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md"
                  >
                    Add Sub-Module
                  </button>
                  {module.subModules.map((subModule, subIndex) => (
                    <div key={subIndex} className="mt-2">
                      <select
                        value={subModule.type}
                        onChange={(e) => {
                          const updatedModules = [...curriculum];
                          updatedModules[index].subModules[subIndex].type = e.target.value;
                          setCurriculum(updatedModules);
                        }}
                        className="mb-2 p-2 w-full border rounded"
                      >
                        <option value="">Select Sub-Module Type</option>
                        <option value="video">Video Lesson</option>
                        <option value="text">Text Lesson</option>
                      </select>
                      {subModule.type === 'video' && (
                        <div className="mt-2">
                          <input type="file" className="mb-2 p-2 w-full border rounded" />
                          <textarea
                            placeholder="Transcripts (with timestamps)"
                            className="mb-2 p-2 w-full border rounded"
                          />
                          <label className="block mb-2">
                            <input type="checkbox" /> Allow video download
                          </label>
                        </div>
                      )}
                      {subModule.type === 'text' && (
                        <div className="mt-2">
                          <button
                            onClick={() => {
                              const updatedModules = [...curriculum];
                              updatedModules[index].subModules[subIndex].content += 'Title\n';
                              setCurriculum(updatedModules);
                            }}
                            className="bg-gray-300 text-gray-800 py-1 px-2 rounded-md"
                          >
                            Add Title
                          </button>
                          <button
                            onClick={() => {
                              const updatedModules = [...curriculum];
                              updatedModules[index].subModules[subIndex].content += 'Paragraph\n';
                              setCurriculum(updatedModules);
                            }}
                            className="bg-gray-300 text-gray-800 py-1 px-2 rounded-md ml-2"
                          >
                            Add Paragraph
                          </button>
                          <button
                            onClick={() => {
                              const updatedModules = [...curriculum];
                              updatedModules[index].subModules[subIndex].content += 'Image\n';
                              setCurriculum(updatedModules);
                            }}
                            className="bg-gray-300 text-gray-800 py-1 px-2 rounded-md ml-2"
                          >
                            Add Image
                          </button>
                          <textarea
                            value={subModule.content}
                            onChange={(e) => {
                              const updatedModules = [...curriculum];
                              updatedModules[index].subModules[subIndex].content = e.target.value;
                              setCurriculum(updatedModules);
                            }}
                            className="mt-2 p-2 w-full border rounded"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
              <div className="flex justify-between">
                <button onClick={handlePreviousStep} className="bg-gray-500 text-white py-2 px-4 rounded-md">
                  Previous
                </button>
                <button onClick={handleNextStep} className="bg-[#9835ff] text-white py-2 px-4 rounded-md">
                  Save & Continue
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

// ListInput component definition
const ListInput = ({ value, onChange }) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onChange([...value, inputValue]);
      setInputValue('');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        className="p-2 w-full border rounded-md mt-2 text-sm font-light outline-none"
        placeholder="Add learning outcomes (press Enter to add)"
      />
      <ul>
        {value.map((item, index) => (
          <li key={index} className="flex items-center mb-2 mt-2 text-[#404660]">
            <FaRegCheckCircle  className="mr-2 text-[#9835ff]" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CreateCourse;
