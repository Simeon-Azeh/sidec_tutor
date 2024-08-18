import React from 'react';
import CourseCard from './CourseCard';
import { MdCheckCircle, MdAccessTime } from 'react-icons/md';
import { TbAntennaBars5 } from "react-icons/tb";
import { TbAntennaBars4 } from "react-icons/tb";
import { TbAntennaBars3 } from "react-icons/tb";

const courses = [
  {
    image: 'https://i.pinimg.com/736x/71/ee/32/71ee32577432648f9e45fbd63b2cf261.jpg',
    title: 'Advanced JavaScript',
    description: 'Learn the advanced concepts of JavaScript and how it can b...',
    status: { title: 'Advanced', icon: <TbAntennaBars5 size={20} /> },
    time: '5 hours',
    rating: 4.5,
    ratingCount: 150,
  },
  {
    image: 'https://e0.pxfuel.com/wallpapers/927/700/desktop-wallpaper-js-react-js.jpg',
    title: 'React Basics',
    description: 'Get started with React and learn the basics in this beginner-friend...',
    status: { title: 'Intermediate', icon: <TbAntennaBars4 size={20} /> },
    time: '3 hours',
    rating: 4.0,
    ratingCount: 200,
  },
  {
    image: 'https://cdn.vectorstock.com/i/500p/66/88/history-textbook-on-school-chalkboard-background-vector-47556688.jpg',
    title: 'History for A-Levels',
    description: 'Explore the key events and figures in history that shaped the moder...',
    status: { title: 'Beginner', icon: <TbAntennaBars3 size={20}/> },
    time: '4 hours',
    rating: 3.8,
    ratingCount: 75,
  },
  {
    image: 'https://cdn.vectorstock.com/i/500p/66/88/history-textbook-on-school-chalkboard-background-vector-47556688.jpg',
    title: 'History for A-Levels',
    description: 'Explore the key events and figures in history that shaped the moder...',
    status: { title: 'Beginner', icon: <TbAntennaBars3 size={20}/> },
    time: '4 hours',
    rating: 3.8,
    ratingCount: 75,
  },
];

const CourseList = () => {
  return (
    <div className=" px-6 py-8 lg:px-0   rounded-md w-[100%] mx-auto font-poppins">
        <div className='flex justify-between items-center'>
          <h1 className="text-lg text-[#404660] font-medium mb-4">Active Courses</h1>
          <p className="text-sm text-[#404660] font-medium mb-4 cursor-pointer border py-1 px-3 rounded hover:translate-y-[-5px] duration-300">See more</p>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {courses.map((course, index) => (
          <CourseCard
            key={index}
            image={course.image}
            title={course.title}
            description={course.description}
            status={course.status}
            time={course.time}
            rating={course.rating}
            ratingCount={course.ratingCount}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseList;
