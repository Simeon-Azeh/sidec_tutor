import React, { useState, useEffect } from 'react';
import LoginImg from '/images/LoginImg.png';
import AmazonLoader from '../../components/Landing/AmazonLoader';
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../../firebaseConfig';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [loggingIn, setLoggingIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const validate = () => {
    const errors = {};
    if (!email) {
      errors.email = 'Please enter your email';
    }
    if (!password) {
      errors.password = 'Please enter your password';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setLoggingIn(true);
      try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log('User logged in:', auth.currentUser);
        navigate('/dashboard');
      } catch (error) {
        console.error('Error logging in:', error);
        setErrors({ general: error.message });
      } finally {
        setLoggingIn(false);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      console.log('User signed in with Google:', auth.currentUser);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error signing in with Google:', error);
      setErrors({ general: error.message });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (loading) {
    return <AmazonLoader />;
  }

  document.title = " Login | SideC";

  return (
    <div className="w-full lg:w-5/6 mx-auto lg:py-8  md:px-0 font-poppins lg:mt-10">
      <div className="flex flex-col lg:flex-row items-center bg-white p-8 md:rounded-lg border">
        <img src={LoginImg} alt="Login" className="w-full mb-8 md:mb-0 md:w-4/5 lg:w-1/2 h-auto hover:scale-105 duration-300 cursor-pointer" />
        <div className="lg:ml-8 w-full md:w-4/5 lg:w-1/2">
          <h2 className="text-xl font-semibold mb-1 text-[#404660]">Welcome back!</h2>
          <p className='text-gray-400 mb-4'>Log into your account</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-[#404660] font-medium text-sm">Your Email</label>
              <input
                type="email"
                className="w-full font-normal text-[16px] p-2 border border-gray-300 rounded mt-1 outline-none"
                value={email}
                placeholder="example@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
            </div>
            <div className="mb-4 relative">
              <label className="block text-[#404660] font-medium text-sm">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full font-normal text-[16px] p-2 border border-gray-300 rounded mt-1 outline-none"
                value={password}
                placeholder='••••••••••'
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-4 top-9 text-gray-500"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            <div className="flex items-center justify-between mb-8">
              <label className="flex items-center text-gray-700">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>
              <Link to="/auth/forgotpassword" className="text-[#9835ff] hover:underline">Forgot Password?</Link>
            </div>
            <div>
              <button
                type="submit"
                className="bg-[#9835ff] text-white w-full p-2 rounded hover:bg-purple-700 transition duration-300 shadow-lg"
              >
                {loggingIn ? <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} /> : 'Login'}
              </button>
            </div>
            <div className='flex items-center justify-center gap-4 mt-6'>
               <div className='w-full h-[1px] bg-gray-300'></div>
                <p>or</p>
                <div className='w-full h-[1px] bg-gray-300'></div>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center mt-6 gap-4 md:gap-4">
              <button
                type="button"
                className="flex items-center gap-2 border py-2 px-2 md:px-4 rounded-md w-[100%] justify-center border-gray-400 border-solid hover:translate-y-[-2px] duration-300  font-medium text-[#404660] hover:text-[#9835ff]"
                onClick={handleGoogleSignIn}
              >
                <FcGoogle size={20}/>
                Login with Google
              </button>
            </div>
          </form>
          <p className='text-gray-400 mt-4 text-center'>Don't have a tutor account? <Link to="/auth/register" className="text-[#9835ff] hover:underline font-medium">Apply</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;