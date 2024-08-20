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

function CreateQuiz() {
    const navigate = useNavigate();
    const [current, setCurrent] = useState(0);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedModule, setSelectedModule] = useState(null);
    const [questions, setQuestions] = useState([]);

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
                    <div>
                        <input type="text" placeholder="Search courses..." className="w-full p-2 mb-4 border rounded" />
                        <div className="flex gap-4">
                            <div
                                className={`p-4 border rounded cursor-pointer ${selectedCourse === 'Course 1' ? 'bg-blue-100' : ''}`}
                                onClick={() => handleCourseSelect('Course 1')}
                            >
                                Course 1
                            </div>
                            <div
                                className={`p-4 border rounded cursor-pointer ${selectedCourse === 'Course 2' ? 'bg-blue-100' : ''}`}
                                onClick={() => handleCourseSelect('Course 2')}
                            >
                                Course 2
                            </div>
                        </div>
                    </div>
                );
            case 1:
                return (
                    <div className="flex gap-4">
                        <div
                            className={`p-4 border rounded cursor-pointer ${selectedModule === 'Module 1' ? 'bg-blue-100' : ''}`}
                            onClick={() => handleModuleSelect('Module 1')}
                        >
                            Module 1
                        </div>
                        <div
                            className={`p-4 border rounded cursor-pointer ${selectedModule === 'Module 2' ? 'bg-blue-100' : ''}`}
                            onClick={() => handleModuleSelect('Module 2')}
                        >
                            Module 2
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <div className="mb-4">
                            <label className="block mb-2">Quiz Name</label>
                            <input type="text" className="w-full p-2 border rounded" />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Description</label>
                            <ReactQuill theme="snow" />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Time (in minutes)</label>
                            <input type="number" className="w-full p-2 border rounded" />
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div>
                        {questions.map((question, index) => (
                            <div key={index} className="mb-4 p-4 border rounded">
                                <div className="mb-2">
                                    <label className="block mb-1">Question Title</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border rounded"
                                        value={question.title}
                                        onChange={(e) => {
                                            const newQuestions = [...questions];
                                            newQuestions[index].title = e.target.value;
                                            setQuestions(newQuestions);
                                        }}
                                    />
                                </div>
                                <div className="mb-2">
                                    <label className="block mb-1">Points</label>
                                    <input
                                        type="number"
                                        className="w-full p-2 border rounded"
                                        value={question.points}
                                        onChange={(e) => {
                                            const newQuestions = [...questions];
                                            newQuestions[index].points = e.target.value;
                                            setQuestions(newQuestions);
                                        }}
                                    />
                                </div>
                                <div className="mb-2">
                                    <label className="block mb-1">Answer Type</label>
                                    <select
                                        className="w-full p-2 border rounded"
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
                                            className="bg-blue-500 text-white px-4 py-2 rounded mb-2"
                                        >
                                            Add Answer
                                        </button>
                                        {question.options.map((option, optIndex) => (
                                            <div key={optIndex} className="mb-2">
                                                <label className="block mb-1">{String.fromCharCode(65 + optIndex)}</label>
                                                <input
                                                    type="text"
                                                    className="w-full p-2 border rounded"
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
                                            <label className="block mb-1">Correct Answer</label>
                                            <input
                                                type="text"
                                                className="w-full p-2 border rounded"
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
                                            className="bg-blue-500 text-white px-4 py-2 rounded mb-2"
                                        >
                                            Add Option
                                        </button>
                                        {question.options.map((option, optIndex) => (
                                            <div key={optIndex} className="mb-2">
                                                <input
                                                    type="text"
                                                    className="w-full p-2 border rounded"
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
                                            <label className="block mb-1">Correct Answers</label>
                                            <input
                                                type="text"
                                                className="w-full p-2 border rounded"
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
                                        <label className="block mb-1">Key Words for Automatic Grading</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border rounded"
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
                                    <label className="block mb-1">Answer Explanation (Optional)</label>
                                    <ReactQuill theme="snow" />
                                </div>
                                <div className="mb-2">
                                    <button
                                        onClick={() => {
                                            const newQuestions = [...questions];
                                            newQuestions[index].image = '';
                                            setQuestions(newQuestions);
                                        }}
                                        className="bg-blue-500 text                                            -white px-4 py-2 rounded"
                                    >
                                        Add Image
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
                            className="bg-green-500 text-white px-4 py-2 rounded"
                        >
                            Add Question
                        </button>
                    </div>
                );
                case 4:
                    return (
                        <div>
                            <div className="mb-4">
                                <label className="block mb-2">Grade Release</label>
                                <select className="w-full p-2 border rounded">
                                    <option value="immediate">Immediately after submission</option>
                                    <option value="manual">Later after manual review</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">Respondents Can See</label>
                                <div className="flex flex-col">
                                    <label><input type="checkbox" className="mr-2" /> Missed Questions</label>
                                    <label><input type="checkbox" className="mr-2" /> Correct Answers</label>
                                    <label><input type="checkbox" className="mr-2" /> Point Value</label>
                                    <label><input type="checkbox" className="mr-2" /> Answer Explanation</label>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">Publishing Settings</label>
                                <div className="flex flex-col">
                                    <label><input type="radio" name="publish" className="mr-2" /> Publish Now</label>
                                    <label><input type="radio" name="publish" className="mr-2" /> Schedule</label>
                                </div>
                                <div className="mt-2">
                                    <label className="block mb-2">Schedule Date & Time</label>
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
            <SidebarItem icon={<IoBookOutline size={20} />} text="Courses" alert active />
          </Link>
          <Link to="/quizzes">
            <SidebarItem icon={<MdOutlineQuiz size={20} />} text="Quizzes" alert />
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
                    <Steps current={current} onChange={setCurrent}>
                        {steps.map((item) => (
                            <Steps.Step key={item.title} title={item.title} className='custom-steps_two' />
                        ))}
                    </Steps>
                    <div className="mt-6">{renderStepContent(current)}</div>
                    <div className="flex justify-between mt-6">
                        <button onClick={prev} disabled={current === 0} className="bg-gray-500 text-white px-4 py-2 rounded">
                            Previous
                        </button>
                        <button onClick={next} disabled={current === steps.length - 1} className="bg-blue-500 text-white px-4 py-2 rounded">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateQuiz;

