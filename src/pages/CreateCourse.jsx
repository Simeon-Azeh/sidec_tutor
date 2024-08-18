import React, { useState } from 'react';

function CreateCourse() {
  const [step, setStep] = useState(1);
  const [courseDetails, setCourseDetails] = useState({
    title: '',
    category: '',
    price: '',
    description: '',
    learningOutcomes: '',
  });
  const [curriculum, setCurriculum] = useState([]);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="p-6">
      {step === 1 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Course Details</h2>
          <input 
            type="text" 
            placeholder="Course Title" 
            value={courseDetails.title} 
            onChange={(e) => setCourseDetails({ ...courseDetails, title: e.target.value })} 
            className="mb-4 p-2 w-full border rounded"
          />
          <input 
            type="text" 
            placeholder="Category" 
            value={courseDetails.category} 
            onChange={(e) => setCourseDetails({ ...courseDetails, category: e.target.value })} 
            className="mb-4 p-2 w-full border rounded"
          />
          <input 
            type="text" 
            placeholder="Price" 
            value={courseDetails.price} 
            onChange={(e) => setCourseDetails({ ...courseDetails, price: e.target.value })} 
            className="mb-4 p-2 w-full border rounded"
          />
          <textarea 
            placeholder="Description" 
            value={courseDetails.description} 
            onChange={(e) => setCourseDetails({ ...courseDetails, description: e.target.value })} 
            className="mb-4 p-2 w-full border rounded"
          />
          <textarea 
            placeholder="What you'll learn" 
            value={courseDetails.learningOutcomes} 
            onChange={(e) => setCourseDetails({ ...courseDetails, learningOutcomes: e.target.value })} 
            className="mb-4 p-2 w-full border rounded"
          />
          <button onClick={handleNextStep} className="bg-[#9835ff] text-white py-2 px-4 rounded-md">
            Next
          </button>
        </div>
      )}
      {step === 2 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Curriculum</h2>
          <button 
            onClick={() => setCurriculum([...curriculum, { title: '', subModules: [] }])} 
            className="bg-green-500 text-white py-2 px-4 rounded-md mb-4">
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
                className="bg-blue-500 text-white py-2 px-4 rounded-md">
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
                      <input 
                        type="file" 
                        className="mb-2 p-2 w-full border rounded"
                      />
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
                        className="bg-gray-300 text-gray-800 py-1 px-2 rounded-md">
                        Add Title
                      </button>
                      <button 
                        onClick={() => {
                          const updatedModules = [...curriculum];
                          updatedModules[index].subModules[subIndex].content += 'Paragraph\n';
                          setCurriculum(updatedModules);
                        }} 
                        className="bg-gray-300 text-gray-800 py-1 px-2 rounded-md ml-2">
                        Add Paragraph
                      </button>
                      <button 
                        onClick={() => {
                          const updatedModules = [...curriculum];
                          updatedModules[index].subModules[subIndex].content += 'Image\n';
                          setCurriculum(updatedModules);
                        }} 
                        className="bg-gray-300 text-gray-800 py-1 px-2 rounded-md ml-2">
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
      {step === 3 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Review & Publish</h2>
          {/* Add code here to review the course details and curriculum */}
          <button onClick={handlePreviousStep} className="bg-gray-500 text-white py-2 px-4 rounded-md">
            Previous
          </button>
          <button className="bg-[#9835ff] text-white py-2 px-4 rounded-md">
            Publish Course
          </button>
        </div>
      )}
    </div>
  );
}

export default CreateCourse;
