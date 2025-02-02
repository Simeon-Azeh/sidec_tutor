import React from 'react';

const CourseDetails = ({ title, description, onTitleChange, onDescriptionChange }) => {
  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        className="p-2 w-full border rounded-md mt-2 text-sm font-normal outline-none"
        placeholder="Course Title"
      />
      <textarea
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        className="p-2 w-full border rounded-md mt-2 text-sm font-normal outline-none"
        placeholder="Course Description"
      />
    </div>
  );
};

export default CourseDetails;