import React, { useState } from 'react';
import CourseCard from '../Courses/CourseCard';
import { TbAntennaBars5, TbAntennaBars4, TbAntennaBars3 } from "react-icons/tb";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const TabComponent = () => {
  const [activeTab, setActiveTab] = useState('courses');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

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
        image: 'https://img.freepik.com/free-photo/3d-background-with-white-cubes_23-2150472987.jpg?t=st=1721743528~exp=1721747128~hmac=0fe525728bdbf30a949e73245fa7e5718691baecbc558d6dcae6d5ab33b4c037&w=740',
        title: 'Web Development Bootcamp',
        description: 'Become a full-stack web developer with this intensive bootcamp...',
        status: { title: 'Advanced', icon: <TbAntennaBars5 size={20} /> },
        time: '8 hours',
        rating: 4.7,
        ratingCount: 250,
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
      image: 'https://img.freepik.com/free-photo/english-books-with-white-background_23-2149440460.jpg?t=st=1721743795~exp=1721747395~hmac=30d832bb7fcbc56ef7a7b498d7374487fe4e7fadd96240c9cc52d32c060c6be2&w=360',
      title: 'English for Alevels',
      description: 'Learn the key concepts of English and how they can be used in your...',
      status: { title: 'ALevels', icon: <TbAntennaBars5 size={20} /> },
      time: '8 hours',
      rating: 4.7,
      ratingCount: 250,
    },
  ];

  const questions = [
    {
      title: 'How does JavaScript handle asynchronous code?',
      description: 'Discuss the various ways JavaScript handles asynchronous operations like callbacks, promises, and async/await.',
      author: 'Junior Foryoung',
      profilePicture: 'https://via.placeholder.com/40',
      date: 'July 21, 2023',
    },
    {
      title: 'What are the best practices for state management in React?',
      description: 'Share your thoughts on state management techniques in React, including hooks, context, and libraries like Redux.',
      author: 'Gilbert Etta',
      profilePicture: 'https://via.placeholder.com/40',
      date: 'July 20, 2024',
    },
    {
      title: 'How to improve web performance?',
      description: 'Techniques and tips to improve the performance of your web applications.',
      author: 'Alice Johnson',
      profilePicture: 'https://via.placeholder.com/40',
      date: 'July 22, 2024',
    },
    {
      title: 'What is the difference between var, let, and const?',
      description: 'An in-depth discussion on the differences between var, let, and const in JavaScript.',
      author: 'Alain Michael',
      profilePicture: 'https://via.placeholder.com/40',
      date: 'July 23, 2024',
    },
  ];

  const solutions = [
    {
      title: 'Implementing Dark Mode in React',
      description: 'Learn how to add a dark mode feature to your React application using Context API and hooks.',
      author: 'Alice Johnson',
      profilePicture: 'https://via.placeholder.com/40',
      date: 'July 19, 2023',
    },
    {
      title: 'Optimizing Performance in Angular Applications',
      description: 'Tips and tricks for improving the performance of your Angular applications, including change detection and lazy loading.',
      author: 'Bob Brown',
      profilePicture: 'https://via.placeholder.com/40',
      date: 'July 18, 2024',
    },
    {
      title: 'Handling Form Validation in Vue.js',
      description: 'Best practices for handling form validation in Vue.js applications.',
      author: 'Charlie Davis',
      profilePicture: 'https://via.placeholder.com/40',
      date: 'July 17, 2024',
    },
    {
      title: 'Using GraphQL with Apollo Client',
      description: 'A guide to integrating GraphQL with Apollo Client in your React applications.',
      author: 'Daniel Evans',
      profilePicture: 'https://via.placeholder.com/40',
      date: 'July 16, 2024',
    },
  ];

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const renderPagination = (items) => {
    const totalPages = Math.ceil(items.length / itemsPerPage);
    return (
      <div className="flex justify-center gap-2 items-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2 w-8 h-8  bg-[#9835ff]  text-white rounded-full disabled:bg-slate-200"
        >
        <IoIosArrowBack />
        </button>
        <span className='border-r border-gray-300 pr-2 text-gray-400'>{currentPage} of {totalPages}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-2 w-8 h-8  bg-[#9835ff]  text-white rounded-full disabled:bg-slate-200"
        >
        <IoIosArrowForward />
        </button>
       
      </div>
    );
  };

  const renderTabContent = () => {
    let items;
    switch (activeTab) {
      case 'courses':
        items = courses;
        break;
      case 'questions':
        items = questions;
        break;
      case 'solutions':
        items = solutions;
        break;
      default:
        return null;
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedItems = items.slice(startIndex, startIndex + itemsPerPage);

    return (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paginatedItems.map((item, index) => {
            if (activeTab === 'courses') {
              return (
                <CourseCard
                  key={index}
                  image={item.image}
                  title={item.title}
                  description={item.description}
                  status={item.status}
                  time={item.time}
                  rating={item.rating}
                  ratingCount={item.ratingCount}
                />
              );
            } else {
              return (
                <div key={index} className="bg-white border rounded-lg p-4 hover:translate-y-[-5px] duration-300 cursor-pointer">
                  <div className="flex items-center mb-2">
                    <img
                      src={item.profilePicture}
                      alt={item.author}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <div>
                      <h2 className="text-sm font-medium text-[#404660]">{item.author}</h2>
                      <p className="text-[12px] text-gray-400">{item.date}</p>
                    </div>
                  </div>
                  <h3 className="text-lg font-medium text-[#9835ff] mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              );
            }
          })}
        </div>
        {renderPagination(items)}
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg border mt-6 font-poppins">
      <div className="flex flex-col md:flex-row  justify-around mb-4">
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'courses' ? 'border-b-2 border-[#9835ff] text-[#9835ff]' : ' text-gray-500'}`}
          onClick={() => {
            setActiveTab('courses');
            setCurrentPage(1);
          }}
        >
          Trending Courses
        </button>
        <button
          className={`px-4 py-2 font-medium  ${activeTab === 'questions' ? 'border-b-2 border-[#9835ff] text-[#9835ff]' : ' text-gray-500'}`}
          onClick={() => {
            setActiveTab('questions');
            setCurrentPage(1);
          }}
        >
          Trending Questions
        </button>
        <button
          className={`px-4 py-2 font-medium  ${activeTab === 'solutions' ? 'border-b-2 border-[#9835ff] text-[#9835ff]' : ' text-gray-500'}`}
          onClick={() => {
            setActiveTab('solutions');
            setCurrentPage(1);
          }}
        >
          Trending Solutions
        </button>
      </div>
      {renderTabContent()}
    </div>
  );
};

export default TabComponent;
