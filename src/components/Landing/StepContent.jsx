import React, { useState } from 'react';
import { DatePicker, message, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';
import avatarone from '/images/avatarone.png';
import avatarTwo from '/images/avatartwo.avif';
import avatarThree from '/images/avatarthree.svg';

const subjectOptions = [
  'Mathematics',
  'Science',
  'English',
  'History',
  'Geography',
  'Computer Science',
  'Physics',
  'Chemistry',
  'Biology',
];

const StepContent = ({
  current,
  formData,
  handleChange,
  handleDateChange,
  handleAvatarSelect,
  handleVerificationCodeChange,
  handleUpload
}) => {
  const [subjects, setSubjects] = useState(formData.subjects || '');
  const [uploading, setUploading] = useState(false);

  const handleSubjectsChange = (e) => {
    const value = e.target.value;
    setSubjects(value);
    handleChange({ target: { name: 'subjects', value: value.split(',').map(subject => subject.trim()) } });
  };

  const handleCustomUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      await handleUpload(file);
      message.success(`${file.name} uploaded successfully.`);
    } catch (err) {
      message.error(`${file.name} upload failed.`);
    } finally {
      setUploading(false);
    }
  };

  switch (current) {
    case 0:
      return (
        <div className="font-poppins">
          <form className="flex flex-col space-y-4">
            <div className="flex flex-col md:flex-row md:gap-4">
              <div className="flex flex-col w-full">
                <label className="block text-[#404660] font-medium text-sm my-4 md:my-0">First Name</label>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  className="w-full font-normal text-[16px] p-2 border border-gray-300 rounded mt-1 outline-none text-gray-500"
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="block text-[#404660] font-medium text-sm my-4 md:my-0">Last Name</label>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  className="w-full font-normal text-[16px] p-2 border border-gray-300 rounded mt-1 outline-none text-gray-500"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:gap-4">
              <div className="flex flex-col w-full">
                <label className="block text-[#404660] font-medium text-sm my-4 md:my-0">Country</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full font-normal text-[16px] p-2 border border-gray-300 rounded mt-1 outline-none text-gray-500"
                >
                  <option value="">Select a country</option>
                  <option value="Cameroon">Cameroon</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="Kenya">Kenya</option>
                  <option value="Rwanda">Rwanda</option>
                </select>
              </div>
              <div className="flex flex-col w-full">
                <label className="block text-[#404660] font-medium text-sm my-4 md:my-0">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full font-normal text-[16px] p-2 border border-gray-300 rounded mt-1 outline-none text-gray-500"
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="block text-[#404660] font-medium text-sm my-4 md:my-0">Date of Birth</label>
                <DatePicker
                  onChange={handleDateChange}
                  className="w-full font-normal text-[16px] p-2 border border-gray-300 rounded mt-1 outline-none text-gray-500"
                  format="YYYY-MM-DD"
                  value={formData.dateOfBirth ? moment(formData.dateOfBirth) : null}
                />
              </div>
            </div>
          </form>
        </div>
      );
    case 1:
      return (
        <div className='font-poppins'>
          <p className="mb-4 text-[#404660]">
            A verification code has been sent to <span className="text-[#9835ff] font-medium">simeon@gmail.com</span>, Please enter it below:
          </p>
          <div className="flex gap-2 mb-4">
            {formData.verificationCode.map((code, index) => (
              <input
                key={index}
                type="text"
                name={`verificationCode${index}`}
                value={code}
                onChange={(e) => handleVerificationCodeChange(e, index)}
                maxLength="1"
                className="w-12 h-12 text-center border border-gray-300 rounded outline-none"
              />
            ))}
          </div>
          <span className="text-[#404660] mr-4">Didn't receive the code?</span>
          <button className="text-[#9835ff] underline">Click to resend</button>
        </div>
      );
    case 2:
      return (
        <div className="flex justify-around">
          {[avatarone, avatarTwo, avatarThree].map((avatar, index) => (
            <div
              key={index}
              className={`w-24 h-24 border rounded-full flex items-center justify-center cursor-pointer ${
                formData.avatar === avatar ? 'border-[#9835ff]' : 'border-gray-300'
              }`}
              onClick={() => handleAvatarSelect(avatar)}
            >
              <img src={avatar} alt={`avatar${index + 1}`} className="w-20 h-20 rounded-full" />
            </div>
          ))}
        </div>
      );
    case 3:
      return (
        <form className="flex flex-col font-poppins">
          <label className="block text-[#404660] font-medium text-sm ">Subjects you teach</label>
          <p className='text-[#777] text-xs mt-1 mb-4'>Start typing and separate with a comma</p>
          <input
            type="text"
            value={subjects}
            onChange={handleSubjectsChange}
            className="w-full p-2 border rounded outline-none"
            placeholder="Enter subjects separated by commas"
          />
          <label className="block text-[#404660] font-medium text-sm my-4">Level you teach</label>
          <div className="flex flex-wrap gap-4 mb-4 font-poppins">
            {["Advanced Level", "Ordinary Level", "Other"].map((level, index) => (
              <label
                key={index}
                className={`flex items-center justify-center cursor-pointer py-2 px-6 border rounded-lg transition duration-150 ease-in-out ${formData.currentInstitution?.includes(level) ? 'bg-[#9835ff] text-white' : 'bg-white text-[#404660]'} border-gray-300`}
              >
                <input
                  type="checkbox"
                  name="levelyouteach"
                  value={level}
                  checked={(formData.currentInstitution || []).includes(level)}
                  onChange={(e) => {
                    const selected = (formData.currentInstitution || []).includes(level)
                      ? formData.currentInstitution.filter(item => item !== level)
                      : [...(formData.currentInstitution || []), level];
                    handleChange({ target: { name: 'currentInstitution', value: selected } });
                  }}
                  className="hidden"
                />
                <span className={`text-base font-normal ${formData.currentInstitution?.includes(level) ? '' : ''}`}>
                  {level}
                </span>
              </label>
            ))}
          </div>
        </form>
      );
    case 4:
      return (
        <div className='font-poppins'>
          <p className='text-[#404660] mb-8'>Upload your ID and any other supporting documents.</p>
          
          {/* Custom Upload Button for ID */}
          <div className="mb-4">
            <label className="block text-[#404660] font-medium text-sm mb-2">Upload ID</label>
            <div className="flex items-center">
              <input
                type="file"
                onChange={handleCustomUpload}
                className="hidden"
                id="upload-id"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
              <label
                htmlFor="upload-id"
                className={`cursor-pointer inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white ${uploading ? 'bg-gray-400' : 'bg-[#9835ff]'} ${uploading ? '' : 'hover:bg-[#7e2dcc]'} transition duration-150 ease-in-out`}
                disabled={uploading}
              >
                {uploading ? <Spin size="small" /> : <UploadOutlined />}
                <span className="ml-2">{uploading ? 'Uploading...' : 'Choose File'}</span>
              </label>
            </div>
          </div>

          {/* Custom Upload Button for Supporting Documents */}
          <label className="block text-[#404660] font-medium text-sm mb-2">Upload Supporting Documents</label>
          <div className="flex items-center">
            <input
              type="file"
              onChange={handleCustomUpload}
              className="hidden"
              id="upload-supporting-docs"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            />
            <label
              htmlFor="upload-supporting-docs"
              className={`cursor-pointer inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white ${uploading ? 'bg-gray-400' : 'bg-[#9835ff]'} ${uploading ? '' : 'hover:bg-[#7e2dcc]'} transition duration-150 ease-in-out`}
              disabled={uploading}
            >
              {uploading ? <Spin size="small" /> : <UploadOutlined />}
              <span className="ml-2">{uploading ? 'Uploading...' : 'Choose File'}</span>
            </label>
          </div>
        </div>
      );
    case 5:
      return (
        <div className='font-poppins'>
          <h2 className="text-lg font-medium text-[#404660] mb-4">Review Your Information</h2>
          <div className="space-y-2">
            <div><h2 className='text-[#404660] font-medium text-base'>Name:</h2> {formData.firstname} {formData.lastname}</div>
            <div><h2 className='text-[#404660] font-medium text-base'>Country:</h2> {formData.country}</div>
            <div><h2 className='text-[#404660] font-medium text-base'>City:</h2> {formData.city}</div>
            <div><h2 className='text-[#404660] font-medium text-base'>Date of Birth:</h2> {formData.dateOfBirth}</div>
            <div><h2 className='text-[#404660] font-medium text-base'>Subjects:</h2> {formData.subjects.join(', ')}</div>
            <div><h2 className='text-[#404660] font-medium text-base'>Level you teach:</h2> {(formData.currentInstitution || []).join(', ')}</div>
            {/* Add any other information you want to display here */}
          </div>
          <div className="mt-8">
            <button className="px-4 py-2 bg-[#9835ff] text-white font-medium rounded-md">Submit</button>
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default StepContent;