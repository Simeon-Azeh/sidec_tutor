import React, { useState, useEffect } from 'react';
import { Steps } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import Sidebar, { SidebarItem } from '../components/Sidebar';
import Navbar from '../components/Navbar';
import SelectCourseStep from '../Quiz/SelectCourseStep';
import SelectModuleStep from '../Quiz/SelectModuleStep';
import BasicInfoStep from '../Quiz/BasicInfoStep';
import AddQuestionsStep from '../Quiz/AddQuestionsStep';
import PublishingSettingsStep from '../Quiz/PublishingSettingsStep';
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
  const [quizInstructions, setQuizInstructions] = useState([]);
  const [courses, setCourses] = useState([]);
  const [modules, setModules] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        try {
          const coursesRef = collection(db, 'courses');
          const q = query(coursesRef, where('authorId', '==', user.uid));
          const querySnapshot = await getDocs(q);
          const fetchedCourses = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setCourses(fetchedCourses);
        } catch (error) {
          console.error('Error fetching courses:', error);
        }
      }
    };

    fetchCourses();
  }, []);

  const fetchModules = async (courseId) => {
    try {
      const courseDocRef = doc(db, 'courses', courseId);
      const courseDoc = await getDoc(courseDocRef);
      if (courseDoc.exists()) {
        const courseData = courseDoc.data();
        if (Array.isArray(courseData.curriculum)) {
          setModules(courseData.curriculum);
        } else {
          console.error('Curriculum is not an array');
          setModules([]);
        }
      }
    } catch (error) {
      console.error('Error fetching modules:', error);
    }
  };

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
    setSelectedModule(null); // Reset selected module when a new course is selected
    fetchModules(course.id); // Fetch modules for the selected course
  };

  const handleModuleSelect = (moduleId) => {
    setSelectedModule(moduleId);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <SelectCourseStep selectedCourse={selectedCourse} handleCourseSelect={handleCourseSelect} courses={courses} />;
      case 1:
        return <SelectModuleStep selectedModule={selectedModule} handleModuleSelect={handleModuleSelect} modules={modules} />;
      case 2:
        return <BasicInfoStep quizInstructions={quizInstructions} setQuizInstructions={setQuizInstructions} />;
      case 3:
        return <AddQuestionsStep selectedCourse={selectedCourse} selectedModule={selectedModule} questions={questions} setQuestions={setQuestions} addQuestion={addQuestion} />;
      case 4:
        return <PublishingSettingsStep selectedCourse={selectedCourse} selectedModule={selectedModule} questions={questions} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen">
      <div className='z-40'>
        <Sidebar>
          <Link to="/dashboard">
            <SidebarItem icon={<MdOutlineDashboardCustomize size={20} />} text="Dashboard" />
          </Link>
          <Link to="/courses">
            <SidebarItem icon={<IoBookOutline size={20} />} text="Courses" alert />
          </Link>
          <Link to="/quizzes">
            <SidebarItem icon={<MdOutlineQuiz size={20} />} text="Quizzes" alert active />
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
              <Steps.Step key={item.title} title={item.title} />
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

export default CreateQuiz;