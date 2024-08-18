import React, { useState, useEffect } from 'react';
import HeroImg from '/images/heroimg.png';
import { GiArchiveRegister } from "react-icons/gi";
import { IoMdArrowForward } from "react-icons/io";
import { Link } from 'react-router-dom';
import AOS from 'aos';
import { LuAlertCircle } from "react-icons/lu";
import Footer from '../components/Landing/Footer';

function Landing() {
  const texts = ["Guiding", "Innovative", "Empowering"];
  const [currentText, setCurrentText] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFade(false); // Trigger the fade-out animation
      setTimeout(() => {
        setCurrentText((prevText) => (prevText + 1) % texts.length);
        setFade(true); // Trigger the fade-in animation
      }, 500); // Wait for the fade-out animation to complete before changing the text
    }, 3000); // Change text every 3 seconds

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 2000, // Duration of animations
    });
  }, []);

  document.title = "Welcome to Sidec";
  
  return (
    <div>
      <div className='flex items-center justify-between md:w-4/5 m-auto font-poppins'>
        <div className='flex flex-col lg:flex-row items-center p-2 md:p-0'>
          <div className='text-center mt-20 md:mt-0 lg:text-left lg:w-1/2' data-aos='fade-down'>
            <h1 className='text-2xl md:text-4xl font-semibold mb-4 text-[#404660] pop'>
              Welcome to {' '}
              <span
                className={`text-[#9835ff] inline-block transition-all duration-500 transform ${fade ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
              >
                {texts[currentText]}
              </span>{' '}
              Teaching Experience
            </h1>
            <p className='text-sm md:text-lg mb-6 text-gray-500'>
              Our platform provides you with the tools to create and share courses, and assist students on their educational journey. Join us to make an impact in education.
            </p>
            <div className='flex gap-4 items-center justify-center lg:justify-start'>
              <Link to="/auth/login">
                <button
                  className='bg-[#9835ff] text-white px-6 py-3 rounded-lg font-normal text-lg transition-transform duration-300 hover:translate-y-[-3px] pop flex items-center gap-2 md:m-0'
                >
                  Login <IoMdArrowForward />
                </button>
              </Link>
              <Link to="/auth/register">
                <button
                  className='border border-[#9835ff] text-[#9835ff] px-6 py-3 rounded-lg font-normal text-lg transition-transform duration-300 hover:translate-y-[-3px] pop flex items-center gap-2 md:m-0'
                >
                  <GiArchiveRegister size={20} /> Register
                </button>
              </Link>
            </div>
          </div>
          <div className='mt-8 md:mt-0 lg:ml-8 lg:w-1/2' data-aos='fade-right'>
            <img src={HeroImg} alt="Hero Image" className='w-full h-auto' />
          </div>
        </div>
    
      </div>
      <div className='w-[100%] md:w-4/5 mx-auto font-poppins flex items-center gap-2 mb-8 bg-[#935fff] rounded-lg p-0 py-4 md:px-8 justify-center'>
      <LuAlertCircle className='text-white text-base' />
            <p className='text-white text-xs md:text-base '>New tutor accounts typically gets approved in 3 business days</p>
        </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Landing;
