import React, { useState } from 'react';
import SidebarMenu from '../components/Courses/SidebarMenu';
import Navbar from '../components/Navbar';
import { Steps } from 'antd';
import CourseDetailsForm from '../components/Courses/CourseDetailForm';
import CurriculumForm from '../components/Courses/CurriculumForm';
import ReviewPublishForm from '../components/Courses/ReviewPublishForm';
import { db, storage } from '../../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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

  const handleModuleChange = (index, field, value) => {
    const updatedModules = [...curriculum];
    updatedModules[index][field] = value;
    setCurriculum(updatedModules);
  };

  const handleSubModuleChange = (moduleIndex, subModuleIndex, field, value) => {
    const updatedModules = [...curriculum];
    updatedModules[moduleIndex].subModules[subModuleIndex][field] = value;
    setCurriculum(updatedModules);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const updatedModules = Array.from(curriculum);
    const [movedModule] = updatedModules.splice(source.index, 1);
    updatedModules.splice(destination.index, 0, movedModule);
    setCurriculum(updatedModules);
  };

  const uploadCoverImage = async (file) => {
    const storageRef = ref(storage, `courseCovers/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  const handleSubmit = async () => {
    try {
      let coverURL = '';
      if (courseDetails.cover) {
        coverURL = await uploadCoverImage(courseDetails.cover);
      }

      const courseData = {
        ...courseDetails,
        cover: coverURL,
        curriculum,
      };

      await addDoc(collection(db, 'courses'), courseData);
      console.log('Course submitted successfully');
    } catch (error) {
      console.error('Error submitting course:', error);
    }
  };

  const steps = [
    { title: 'Course Details' },
    { title: 'Curriculum' },
    { title: 'Review & Publish' },
  ];

  return (
    <div className="flex h-screen">
      <div className="z-40">
        <SidebarMenu />
      </div>

      <div className="flex-1 overflow-y-auto font-poppins">
        <div className="sticky top-0 z-10">
          <Navbar />
        </div>
        <div className="flex flex-col px-4 lg:px-9 p-6 lg:pl-16 ">
          <Steps current={step - 1} className="custom-steps mb-6">
            {steps.map((item, index) => (
              <Steps.Step key={index} title={item.title} />
            ))}
          </Steps>

          {step === 1 && (
            <CourseDetailsForm
              courseDetails={courseDetails}
              setCourseDetails={setCourseDetails}
              handleFileChange={handleFileChange}
              handleNextStep={handleNextStep}
            />
          )}

          {step === 2 && (
            <CurriculumForm
              courseDetails={courseDetails} // Ensure courseDetails is passed here
              curriculum={curriculum}
              setCurriculum={setCurriculum}
              handlePreviousStep={handlePreviousStep}
              handleNextStep={handleNextStep}
              handleDragEnd={handleDragEnd}
              handleModuleChange={handleModuleChange}
              handleSubModuleChange={handleSubModuleChange}
            />
          )}

          {step === 3 && (
            <ReviewPublishForm
              courseDetails={courseDetails}
              curriculum={curriculum}
              handleSubmit={handleSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateCourse;