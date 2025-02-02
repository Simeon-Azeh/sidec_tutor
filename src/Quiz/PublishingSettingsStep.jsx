import React, { useState } from 'react';
import { db } from '../../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

const PublishingSettingsStep = ({ selectedCourse, selectedModule, questions }) => {
  const [gradeRelease, setGradeRelease] = useState('immediate');
  const [respondentsCanSee, setRespondentsCanSee] = useState({
    missedQuestions: false,
    correctAnswers: false,
    pointValue: false,
    answerExplanation: false,
  });
  const [publishSetting, setPublishSetting] = useState('now');
  const [scheduleDateTime, setScheduleDateTime] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);

  const handleCheckboxChange = (e) => {
    setRespondentsCanSee({
      ...respondentsCanSee,
      [e.target.name]: e.target.checked,
    });
  };

  const handleSubmit = async () => {
    setIsPublishing(true);
    try {
      if (!selectedCourse || !selectedModule) {
        throw new Error('Course or module is not selected');
      }

      const quizData = {
        courseId: selectedCourse.id,
        courseTitle: selectedCourse.title,
        moduleId: selectedModule,
        questions,
        gradeRelease,
        respondentsCanSee,
        publishSetting,
        scheduleDateTime: publishSetting === 'schedule' ? scheduleDateTime : null,
      };

      const quizDocRef = doc(db, 'courseQuizzes', `${selectedCourse.id}-${selectedModule}`);
      await setDoc(quizDocRef, quizData);

      setSuccessMessage('Quiz published successfully');
      setTimeout(() => setSuccessMessage(''), 3000); // Clear the success message after 3 seconds
    } catch (error) {
      console.error('Error publishing quiz:', error);
      alert('Error publishing quiz');
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className='font-poppins lg:w-5/6 mx-auto bg-white p-4 rounded'>
      <div className="mb-4">
        <label className="block mb-1 text-[#404660] font-medium text-base ">Grade Release</label>
        <select
          className="w-full p-2 border rounded outline-none"
          value={gradeRelease}
          onChange={(e) => setGradeRelease(e.target.value)}
        >
          <option value="immediate">Immediately after submission</option>
          <option value="manual">Later after manual review</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-[#404660] font-medium text-base">Respondents Can See</label>
        <div className="flex flex-col">
          <label>
            <input
              type="checkbox"
              className="mr-2"
              name="missedQuestions"
              checked={respondentsCanSee.missedQuestions}
              onChange={handleCheckboxChange}
            />
            Missed Questions
          </label>
          <label>
            <input
              type="checkbox"
              className="mr-2"
              name="correctAnswers"
              checked={respondentsCanSee.correctAnswers}
              onChange={handleCheckboxChange}
            />
            Correct Answers
          </label>
          <label>
            <input
              type="checkbox"
              className="mr-2"
              name="pointValue"
              checked={respondentsCanSee.pointValue}
              onChange={handleCheckboxChange}
            />
            Point Value
          </label>
          <label>
            <input
              type="checkbox"
              className="mr-2"
              name="answerExplanation"
              checked={respondentsCanSee.answerExplanation}
              onChange={handleCheckboxChange}
            />
            Answer Explanation
          </label>
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-[#404660] font-medium text-base">Publishing Settings</label>
        <div className="flex flex-col">
          <label>
            <input
              type="radio"
              name="publish"
              className="mr-2"
              value="now"
              checked={publishSetting === 'now'}
              onChange={(e) => setPublishSetting(e.target.value)}
            />
            Publish Now
          </label>
          <label>
            <input
              type="radio"
              name="publish"
              className="mr-2"
              value="schedule"
              checked={publishSetting === 'schedule'}
              onChange={(e) => setPublishSetting(e.target.value)}
            />
            Schedule
          </label>
        </div>
        {publishSetting === 'schedule' && (
          <div className="mt-2">
            <label className="block mb-1 text-[#404660] font-medium text-base">Schedule Date & Time</label>
            <input
              type="datetime-local"
              className="w-full p-2 border rounded"
              value={scheduleDateTime}
              onChange={(e) => setScheduleDateTime(e.target.value)}
            />
          </div>
        )}
      </div>
      <button
        onClick={handleSubmit}
        className="bg-[#9835ff] text-white px-4 py-2 rounded flex items-center gap-1 mt-4"
        disabled={isPublishing}
      >
        {isPublishing ? 'Publishing...' : 'Publish'}
      </button>
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4" role="alert">
          <strong className="font-bold">{successMessage}</strong>
        </div>
      )}
    </div>
  );
};

export default PublishingSettingsStep;