import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { RiWhatsappFill } from "react-icons/ri";
import { TiSocialLinkedinCircular } from "react-icons/ti";
import Logo from '/images/SidecLogo.png';

function Footer() {
  return (
    <div className='bg-white font-poppins '>
      <div className='w-[100%] md:w-4/5 mx-auto flex flex-col md:flex-row items-center justify-between py-10 px-8 md:px-0 border-b'>
        <div className='flex flex-col gap-4'>
            <div className='w-[120px] flex m-auto md:m-0'>
                <img src={Logo} alt="Sidec Logo" className='w-full' />
            </div>
            <div className='flex gap-4 md:gap-8 text-[#404660] items-center  font-medium'>
                <Link to="/" className='hover:border-b-2 hover:border-[#9835ff] hover:border-solid'>Terms</Link>
                <Link to="/about" className='hover:border-b-2 hover:border-[#9835ff] hover:border-solid'>Privacy</Link>
                <Link to="/team" className='hover:border-b-2 hover:border-[#9835ff] hover:border-solid'>Cookie</Link>
                <Link to="/contact" className='hover:border-b-2 hover:border-[#9835ff] hover:border-solid'>Security</Link>
            </div>
        </div>
        <div className='flex flex-col gap-4'>
            <h1 className='text-[#404660] font-semibold text-center mt-5 md:text-left md:mt-0'>Follow Us</h1>
            <div className='flex gap-8 items-center'>
                <a href="https://www.facebook.com/sidec.edu?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" className='text-[#404660] hover:text-[#9835ff] duration-300'><FaFacebook size={20}/></a>
                <a href="https://wa.me/250725354096" target="_blank" rel="noopener noreferrer" className='text-[#404660] hover:text-[#9835ff] duration-300'><RiWhatsappFill size={20}/></a>
                <a href="https://www.instagram.com/sidec_edu?igsh=MXd0am5pYnFxMHlkdw==" target="_blank" rel="noopener noreferrer" className='text-[#404660] hover:text-[#9835ff] duration-300'><RiInstagramFill size={20} /></a>
                <a href="https://www.linkedin.com/company/sidec-edu/" target="_blank" rel="noopener noreferrer" className='text-[#404660] hover:text-[#9835ff] duration-300'><TiSocialLinkedinCircular size={30} /></a>
            </div>
        </div>
      </div>
      <div className='w-[100%] md:w-4/5 mx-auto flex flex-col md:flex-row items-center justify-between py-10 px-8 md:px-0'>
        <div>
          <p className='text-gray-400 mb-4 md:mb-0'> © Sidec 2024. All Rights Reserved</p>
        </div>
        <div className='flex gap-4 items-center font-poppins font-medium text-[#404660] text-[14px]'>
          <a href="/terms" className='hover:text-[#9835ff]'>Updates</a>
          <a href="/privacy" className='hover:text-[#9835ff]'>Community Guidelines</a>
          <a href="/cookies" className='hover:text-[#9835ff]'>Support</a>
        </div>
      </div>
    </div>
  )
}

export default Footer;
