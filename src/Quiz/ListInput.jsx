import React, { useState } from 'react';
import { FaRegCheckCircle } from 'react-icons/fa';

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
        className="p-2 w-full border rounded-md mt-2 text-sm font-normal outline-none"
        placeholder="Add Quiz Instructions (press Enter to add)"
      />
      <ul>
        {value.map((item, index) => (
          <li key={index} className="flex items-center mb-2 mt-2 text-[#404660]">
            <FaRegCheckCircle className="mr-2 text-[#9835ff]" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListInput;