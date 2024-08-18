import React, { useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';

const CustomAutoComplete = ({ options, onChange }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.includes(',')) {
      const subject = value.replace(',', '').trim();
      if (subject && !selectedSubjects.includes(subject)) {
        setSelectedSubjects([...selectedSubjects, subject]);
        onChange([...selectedSubjects, subject]);
      }
      setInputValue('');
      setSuggestions([]);
    } else {
      const filteredSuggestions = options.filter(option =>
        option.toLowerCase().includes(value.toLowerCase()) &&
        !selectedSubjects.includes(option)
      );
      setSuggestions(filteredSuggestions);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    setSelectedSubjects([...selectedSubjects, suggestion]);
    onChange([...selectedSubjects, suggestion]);
    setInputValue('');
    setSuggestions([]);
  };

  const handleRemoveSubject = (subjectToRemove) => {
    const updatedSubjects = selectedSubjects.filter(subject => subject !== subjectToRemove);
    setSelectedSubjects(updatedSubjects);
    onChange(updatedSubjects);
  };

  return (
    <div className="w-full relative">
      <div className="flex flex-wrap items-center border border-gray-300 rounded p-2">
        {selectedSubjects.map((subject, index) => (
          <div
            key={index}
            className="flex items-center bg-[#f0f0f0] rounded-md px-3 py-1 mr-2 mb-2"
          >
            <span className="mr-2 text-sm font-medium text-[#404660]">{subject}</span>
            <CloseOutlined size={12}
              className="cursor-pointer text-sm text-[#404660]"
              onClick={() => handleRemoveSubject(subject)}
            />
          </div>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="flex-grow border-0 outline-none"
        
        />
      </div>
      {suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white border border-gray-300 border-solid rounded w-full mt-1 max-h-40 overflow-y-auto font-poppins">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="p-2 hover:bg-slate-50 px-4 text-sm cursor-pointer text-[#404660]"
              onClick={() => handleSelectSuggestion(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomAutoComplete;
