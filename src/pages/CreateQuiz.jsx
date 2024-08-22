import React, { useState } from 'react';
import { Steps } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Sidebar, { SidebarItem } from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { MdOutlineDashboardCustomize, MdOutlineQuiz, MdOutlineChatBubbleOutline } from 'react-icons/md';
import { IoBookOutline } from 'react-icons/io5';
import { RiSettings4Line } from 'react-icons/ri';
import { IoMdHelpCircleOutline } from 'react-icons/io';
import { CiSearch } from "react-icons/ci";
import { SiListmonk } from "react-icons/si";
import { FaRegCheckCircle } from 'react-icons/fa';
import { RiAddCircleLine } from "react-icons/ri";

function CreateQuiz() {
    const navigate = useNavigate();
    const [current, setCurrent] = useState(0);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedModule, setSelectedModule] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [quizInstructions, setQuizInstructions] = useState([]);

    const steps = [
        { title: 'Select Course' },
        { title: 'Select Module' },
        { title: 'Basic Info' },
        { title: 'Add Questions' },
        { title: 'Publishing Settings' }
    ];

    const next = () => setCurrent(current + 1);
    const prev = () => setCurrent(current - 1);

    const addQuestion = () => {
        setQuestions([...questions, { title: '', points: 0, type: 'mcq', options: [], correctAnswer: '' }]);
    };

    const handleCourseSelect = (course) => {
        setSelectedCourse(course);
    };

    const handleModuleSelect = (module) => {
        setSelectedModule(module);
    };

    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <div className=" font-poppins lg:w-5/6 mx-auto bg-white p-4 rounded ">
                        <div className='font-poppins relative'>
                           
                            <p className='text-[#404660] text-base mb-3'>Select the course you want to create a quiz for</p>
                            <CiSearch size={40} className='text-[#404660] absolute top-10 left-0 font-medium bg-[#F2F2F2] p-2 rounded' />
                        <input type="text" placeholder="Search courses..." className="w-full py-3 mb-4 border rounded px-12 outline-none text-[#404660]" />
                        </div>
                        <p className='text-gray-500 mb-4 text-sm'>2 active courses found</p>
                     
                        <div className="">
                            <div
                                className={`p-4  cursor-pointer border-b rounded border-b-[#404660]/20 flex ${selectedCourse === 'Course 1' ? 'bg-[#9835ff]/10' : ''}`}
                                onClick={() => handleCourseSelect('Course 1')}
                            >
                                <div className='w-14 h-14 '>
                                    <img src="https://i.pinimg.com/736x/71/ee/32/71ee32577432648f9e45fbd63b2cf261.jpg" alt="" className='w-full object-cover h-full rounded' />
                                </div>
                               <div className='ml-4'>
                                    <h1 className="text-base font-medium text-[#404660]">Advanced Javascript</h1>
                                    <p className="text-sm text-gray-500">Dive deeper into web development with Javascrip...</p>
                               </div>
                            </div>
                            <div
                                className={`p-4  cursor-pointer border-b rounded border-b-[#404660]/20 flex ${selectedCourse === 'Course 2' ? 'bg-[#9835ff]/10' : ''}`}
                                onClick={() => handleCourseSelect('Course 2')}
                            >
                                <div className='w-14 h-14 '>
                                    <img src="https://cdn.vectorstock.com/i/500p/66/88/history-textbook-on-school-chalkboard-background-vector-47556688.jpg" alt="" className='w-full object-cover h-full rounded' />
                                </div>
                               <div className='ml-4'>
                                    <h1 className="text-base font-medium text-[#404660]">History for A-Levels</h1>
                                    <p className="text-sm text-gray-500">Explore the key events and figures in history that shaped the moder...</p>
                               </div>
                            </div>
                        </div>
                    </div>
                );
            case 1:
                return (
                    <div className=" font-poppins lg:w-5/6 mx-auto bg-white p-4 rounded">
                        <p className='text-[#404660] text-base mb-3'>Select the module you want to create a quiz for</p>
                        <div
                            className={`p-4 border-b  rounded cursor-pointer ${selectedModule === 'Module 1' ? 'bg-[#9835ff]/10' : ''}`}
                            onClick={() => handleModuleSelect('Module 1')}
                        >
                            <div>
                            <h1 className='text-base font-medium text-[#404660] flex items-center gap-2'><SiListmonk size={8} />Introduction</h1>
                            <p className='text-sm text-gray-500 pl-6'>| 4 submodules</p>
                            </div>
                          
                        </div>
                        <div
                            className={`p-4 border-b  rounded cursor-pointer ${selectedModule === 'Module 2' ? 'bg-[#9835ff]/10' : ''}`}
                            onClick={() => handleModuleSelect('Module 2')}
                        >
                            <div>
                            <h1 className='text-base font-medium text-[#404660] flex items-center gap-2'><SiListmonk size={8} />Basics</h1>
                            <p className='text-sm text-gray-500 pl-6'>| 2 submodules</p>
                            </div>
                          
                        </div>
                    </div>
                );
            case 2:
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
            case 3:
                return (
                    <div className='font-poppins lg:w-5/6 mx-auto bg-white p-4 rounded'>
                        {questions.map((question, index) => (
                            <div key={index} className="mb-4 p-4 border rounded">
                                <div className="mb-2">
                                    <label className="block mb-1 text-[#404660] font-medium text-base">Question Title</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border rounded outline-none text-[#404660] font-medium"
                                        value={question.title}
                                        onChange={(e) => {
                                            const newQuestions = [...questions];
                                            newQuestions[index].title = e.target.value;
                                            setQuestions(newQuestions);
                                        }}
                                    />
                                </div>
                                <div className="mb-2">
                                    <label className="block mb-1 text-[#404660] font-medium text-base">Points</label>
                                    <input
                                        type="number"
                                        className="w-full p-2 border rounded text-[#404660] font-medium outline-none"
                                        value={question.points}
                                        onChange={(e) => {
                                            const newQuestions = [...questions];
                                            newQuestions[index].points = e.target.value;
                                            setQuestions(newQuestions);
                                        }}
                                    />
                                </div>
                                <div className="mb-2">
                                    <label className="block mb-1 text-[#404660] font-medium text-base">Answer Type</label>
                                    <select
                                        className="w-full p-2 border rounded text-[#404660] font-medium outline-none"
                                        value={question.type}
                                        onChange={(e) => {
                                            const newQuestions = [...questions];
                                            newQuestions[index].type = e.target.value;
                                            setQuestions(newQuestions);
                                        }}
                                    >
                                        <option value="mcq">Multiple Choice</option>
                                        <option value="checkbox">Checkbox</option>
                                        <option value="essay">Essay</option>
                                    </select>
                                </div>

                                {/* Add dynamic form fields based on the answer type */}
                                {question.type === 'mcq' && (
                                    <>
                                        <button
                                            onClick={() => {
                                                const newQuestions = [...questions];
                                                newQuestions[index].options.push('');
                                                setQuestions(newQuestions);
                                            }}
                                            className="bg-transparent text-[#404660] border border-[#404660]/50 font-medium px-4 py-2 rounded mb-2 flex items-center gap-1"
                                        >
                                            Add Answer <RiAddCircleLine size={20} />
                                        </button>
                                        {question.options.map((option, optIndex) => (
                                           <div key={optIndex} className="mb-2 flex items-center">
                                           <label
                                             className="bg-[#9835ff] text-white px-3 py-2 rounded-l-md"
                                           >
                                             {String.fromCharCode(65 + optIndex)}
                                           </label>
                                           <input
                                             type="text"
                                             className="w-full p-2 border border-[#9835ff] rounded-r-md outline-none text-[#404660] font-medium"
                                             value={option}
                                             onChange={(e) => {
                                               const newQuestions = [...questions];
                                               newQuestions[index].options[optIndex] = e.target.value;
                                               setQuestions(newQuestions);
                                             }}
                                           />
                                         </div>
                                        ))}
                                        <div className="mb-2">
                                            <label className="block mb-1 text-[#404660] font-medium text-base">Correct Answer</label>
                                            <input
                                                type="text"
                                                className="w-full p-2 border rounded outline-none text-[#404660] font-medium"
                                                value={question.correctAnswer}
                                                onChange={(e) => {
                                                    const newQuestions = [...questions];
                                                    newQuestions[index].correctAnswer = e.target.value;
                                                    setQuestions(newQuestions);
                                                }}
                                            />
                                        </div>
                                    </>
                                )}
                                {question.type === 'checkbox' && (
                                    <>
                                        <button
                                            onClick={() => {
                                                const newQuestions = [...questions];
                                                newQuestions[index].options.push('');
                                                setQuestions(newQuestions);
                                            }}
                                            className="bg-transparent text-[#404660] border border-[#404660]/50 font-medium px-4 py-2 rounded mb-2 flex items-center gap-1"
                                        >
                                            Add Option <RiAddCircleLine size={20} />
                                        </button>
                                        {question.options.map((option, optIndex) => (
                                            <div key={optIndex} className="mb-2">
                                                <input
                                                    type="text"
                                                    className="w-full p-2 border rounded outline-none text-[#404660] font-medium"
                                                    value={option}
                                                    onChange={(e) => {
                                                        const newQuestions = [...questions];
                                                        newQuestions[index].options[optIndex] = e.target.value;
                                                        setQuestions(newQuestions);
                                                    }}
                                                />
                                            </div>
                                        ))}
                                        <div className="mb-2">
                                            <label className="block mb-1 text-[#404660] font-medium text-base">Correct Answers</label>
                                            <input
                                                type="text"
                                                className="w-full p-2 border rounded outline-none text-[#404660] font-medium" 
                                                placeholder="Separate multiple correct answers with commas"
                                                onChange={(e) => {
                                                    const newQuestions = [...questions];
                                                    newQuestions[index].correctAnswer = e.target.value;
                                                    setQuestions(newQuestions);
                                                }}
                                            />
                                        </div>
                                    </>
                                )}
                                {question.type === 'essay' && (
                                    <div className="mb-2">
                                        <label className="block mb-1 text-[#404660] font-medium text-base">Key Words for Automatic Grading</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border rounded outline-none text-[#404660] font-medium"
                                            value={question.correctAnswer}
                                            onChange={(e) => {
                                                const newQuestions = [...questions];
                                                newQuestions[index].correctAnswer = e.target.value;
                                                setQuestions(newQuestions);
                                            }}
                                        />
                                    </div>
                                )}
                                <div className="mb-2">
                                    <label className="block mb-1 text-[#404660] font-medium text-base">Answer Explanation (Optional)</label>
                                    <ReactQuill theme="snow" />
                                </div>
                                <div className="mb-2">
                                    <button
                                        onClick={() => {
                                            const newQuestions = [...questions];
                                            newQuestions[index].image = '';
                                            setQuestions(newQuestions);
                                        }}
                                        className="bg-transparent text-[#404660] border border-[#404660]/50 font-medium px-4 py-2 rounded mb-2 flex items-center gap-1"
                                    >
                                        Add Image <RiAddCircleLine size={20} />
                                    </button>
                                    {question.image && (
                                        <div className="mt-2">
                                            <input
                                                type="file"
                                                className="w-full p-2 border rounded"
                                                onChange={(e) => {
                                                    const newQuestions = [...questions];
                                                    newQuestions[index].image = URL.createObjectURL(e.target.files[0]);
                                                    setQuestions(newQuestions);
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        <button
                            onClick={addQuestion}
                            className="bg-[#9835ff] text-white px-4 py-2 rounded flex items-center gap-1"
                        >
                            Add Question <RiAddCircleLine size={20} />
                        </button>
                    </div>
                );
                case 4:
                    return (
                        <div className='font-poppins lg:w-5/6 mx-auto bg-white p-4 rounded'>
                            <div className="mb-4">
                                <label className="block mb-1 text-[#404660] font-medium text-base ">Grade Release</label>
                                <select className="w-full p-2 border rounded outline-none ">
                                    <option value="immediate">Immediately after submission</option>
                                    <option value="manual">Later after manual review</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1 text-[#404660] font-medium text-base">Respondents Can See</label>
                                <div className="flex flex-col">
                                    <label><input type="checkbox" className="mr-2 " /> Missed Questions</label>
                                    <label><input type="checkbox" className="mr-2" /> Correct Answers</label>
                                    <label><input type="checkbox" className="mr-2" /> Point Value</label>
                                    <label><input type="checkbox" className="mr-2" /> Answer Explanation</label>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1 text-[#404660] font-medium text-base">Publishing Settings</label>
                                <div className="flex flex-col">
                                    <label><input type="radio" name="publish" className="mr-2" /> Publish Now</label>
                                    <label><input type="radio" name="publish" className="mr-2" /> Schedule</label>
                                </div>
                                <div className="mt-2">
                                    <label className="block mb-1 text-[#404660] font-medium text-base">Schedule Date & Time</label>
                                    <input type="datetime-local" className="w-full p-2 border rounded" />
                                </div>
                            </div>
                        </div>
                    );
                default:
                    return null;
            }
        };

    return (
        <div className="flex h-screen">
            <div className='z-40'>
        <Sidebar>
          <Link to="/dashboard">
            <SidebarItem icon={<MdOutlineDashboardCustomize size={20} />} text="Dashboard"  />
          </Link>
          <Link to="/courses">
            <SidebarItem icon={<IoBookOutline size={20} />} text="Courses" alert  />
          </Link>
          <Link to="/quizzes">
            <SidebarItem icon={<MdOutlineQuiz size={20} />} text="Quizzes" alert active/>
          </Link>
         
          <Link to="/messages">
            <SidebarItem icon={<MdOutlineChatBubbleOutline size={20} />} text="Messages" alert />
          </Link>
          <hr className='my-4' />
          <Link to="/settings">
            <SidebarItem icon={<RiSettings4Line size={20} />} text="Settings" alert />
          </Link>
          <Link to="/support">
            <SidebarItem icon={<IoMdHelpCircleOutline size={20} />} text="Support" />
          </Link>
        </Sidebar>
      </div>
            <div className="flex-1 overflow-y-auto">
            <div className="sticky top-0 z-10">
          <Navbar />
        </div>
                <div className="px-8 py-6 lg:pl-16">
                    <Steps current={current} onChange={setCurrent} className='custom-steps'>
                        {steps.map((item) => (
                            <Steps.Step key={item.title} title={item.title}  />
                        ))}
                    </Steps>
                    <div className="mt-6">{renderStepContent(current)}</div>
                    <div className="flex justify-between mt-6 font-poppins">
                        <button onClick={prev} disabled={current === 0} className="bg-transparent border border-[#404660]/50 border-solid text-[#404660] px-4 py-2 rounded ">
                            Previous
                        </button>
                        <button onClick={next} disabled={current === steps.length - 1} className="bg-[#9835ff] text-white px-4 py-2 rounded">
                            Next
                        </button>
                    </div>
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
          className="p-2 w-full border rounded-md mt-2 text-sm font-normald outline-none"
          placeholder="Add Quiz Instructions (press Enter to add)"
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

export default CreateQuiz;

