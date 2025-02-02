import React from 'react';

const CourseContent = ({ content, onContentChange }) => {
  return (
    <div>
      <textarea
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
        className="p-2 w-full border rounded-md mt-2 text-sm font-normal outline-none"
        placeholder="Course Content"
      />
    </div>
  );
};

export default CourseContent;