import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { RiAddCircleLine } from "react-icons/ri";
import { db } from '../../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

const AddQuestionsStep = ({ selectedCourse, selectedModule, questions, setQuestions, addQuestion }) => {
  const [successMessage, setSuccessMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveDraft = async () => {
    setIsSaving(true);
    try {
      if (!selectedCourse || !selectedModule) {
        throw new Error('Course or module is not selected');
      }

      const quizData = {
        courseId: selectedCourse.id,
        courseTitle: selectedCourse.title,
        moduleId: selectedModule,
        questions,
      };

      const quizDocRef = doc(db, 'courseQuizzes', `${selectedCourse.id}-${selectedModule}`);
      await setDoc(quizDocRef, quizData);

      setSuccessMessage('Draft saved successfully');
      setTimeout(() => setSuccessMessage(''), 3000); // Clear the success message after 3 seconds
    } catch (error) {
      console.error('Error saving draft:', error);
      alert('Error saving draft');
    } finally {
      setIsSaving(false);
    }
  };

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
                  <label className="bg-[#9835ff] text-white px-3 py-2 rounded-l-md">
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
      <button
        onClick={handleSaveDraft}
        className="bg-[#9835ff] text-white px-4 py-2 rounded flex items-center gap-1 mt-4"
        disabled={isSaving}
      >
        {isSaving ? 'Saving...' : successMessage ? 'Saved' : 'Save Draft'}
      </button>
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4" role="alert">
          <strong className="font-bold">{successMessage}</strong>
        </div>
      )}
    </div>
  );
};

export default AddQuestionsStep;