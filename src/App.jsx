import { useState, useEffect } from 'react'
import { BrowserRouter ,Routes, Route, useLocation } from 'react-router-dom'
import Landing from './pages/Landing'
import Register from './pages/Authentication/Register';
import ForgotPassword from './pages/Authentication/ForgotPass';
import Onboarding from './pages/Authentication/Onboarding';
import Login from './pages/Authentication/Login';

import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import CreateCourse from './pages/CreateCourse';
import CourseDraft from './pages/CourseDraft';



function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}


function App() {


  return (
    <>

      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path="/auth/login" element={<Login/>} />
          <Route path="/auth/register" element={<Register/>} />
          <Route path="/auth/forgotpassword" element={<ForgotPassword/>} />
          <Route path="/auth/onboarding" element={<Onboarding/>} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/courses' element={<Courses />} />
          <Route path="/create-course" element={<CreateCourse />} />
          <Route path="/courses/draft" element={<CourseDraft />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
