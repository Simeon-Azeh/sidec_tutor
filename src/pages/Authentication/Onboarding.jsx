import React, { useState } from 'react';
import { message } from 'antd';
import CustomStep from '../../components/Landing/CustomStep';
import StepContent from '../../components/Landing/StepContent';
import StepIcons from '../../components/Landing/StepIcons';
import Footer from '../../components/Landing/Footer';

const Onboarding = () => {
  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    country: '',
    city: '',
    dateOfBirth: null,
    verificationCode: Array(6).fill(''),
    avatar: '',
    educationalLevel: '',
    currentSchool: '',
    howSidecHelps: '',
  });

  const next = () => {
    if (current === 0 && !formData.firstname) {
      message.error('Please enter your first name');
    } else if (current === 0 && !formData.lastname) {
      message.error('Please enter your last name');
    } else if (current === 1 && formData.verificationCode.includes('')) {
      message.error('Please enter the complete verification code');
    } else if (current === 2 && !formData.avatar) {
      message.error('Please select an avatar');
    } else if (current === 3 && !formData.educationalLevel) {
      message.error('Please select subjects you are interested in ');

    }
    else if (current === 3 && !formData.educationalLevel) {
        message.error('Please upload required documents ');
        
      } else
     {
      setCurrent(current + 1);
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, dateOfBirth: date });
  };

  const handleAvatarSelect = (avatar) => {
    setFormData({ ...formData, avatar });
  };

  const handleVerificationCodeChange = (e, index) => {
    const { value } = e.target;
    const updatedCode = [...formData.verificationCode];
    updatedCode[index] = value;
    setFormData({ ...formData, verificationCode: updatedCode });
  };

  document.title = " Getting started with sidec";

  return (
    <div>
    <div className="min-h-screen flex flex-col items-center justify-center bg-white ">
      <div className=" p-6 md:px-10 lg:px-0 max-w-4xl w-full">
        <div className="flex justify-around mb-6">
          {StepIcons.map((step, index) => (
            <CustomStep
              key={index}
              step={step}
              index={index}
              current={current}
              setCurrent={setCurrent}
            />
          ))}
        </div>
        <div className="mb-6">
          <StepContent
            current={current}
            formData={formData}
            handleChange={handleChange}
            handleDateChange={handleDateChange}
            handleAvatarSelect={handleAvatarSelect}
            handleVerificationCodeChange={handleVerificationCodeChange}
          />
        </div>
        <div className="flex justify-between font-poppins">
          {current > 0 && (
            <button onClick={prev} className=" text-[#404660] border py-2 px-4 rounded">
              Previous
            </button>
          )}
          {current < StepIcons.length - 1 && (
            <button onClick={next} className="bg-[#9835ff] text-white py-2 px-4 rounded">
              Next
            </button>
          )}
        </div>
      </div>
    </div>
    <Footer />
    </div>
 
  );
};

export default Onboarding;
