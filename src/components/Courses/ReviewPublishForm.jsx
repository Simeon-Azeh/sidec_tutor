import React, { useState, useEffect } from 'react';
import { FiAlertCircle } from "react-icons/fi";
import { db, storage } from '../../../firebaseConfig';
import { doc, updateDoc, serverTimestamp, getDoc, setDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const ReviewPublishForm = ({ courseDetails, curriculum, handlePreviousStep }) => {
  const [loading, setLoading] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [author, setAuthor] = useState('');
  const [avatar, setAvatar] = useState('');
  const [authorId, setAuthorId] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        setAuthorId(user.uid);
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setAuthor(`${userData.firstName} ${userData.lastName}`);
            setAvatar(userData.avatar);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleFileUpload = async (file, path) => {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  const handleSaveDraft = async () => {
    setSavingDraft(true);
    setSuccessMessage('');
    try {
      if (!courseDetails || !courseDetails.title) {
        throw new Error('Course details are missing or incomplete');
      }

      let coverURL = courseDetails.cover;
      if (courseDetails.cover instanceof File) {
        coverURL = await handleFileUpload(courseDetails.cover, `courseCovers/${courseDetails.cover.name}`);
      }

      const courseData = {
        ...courseDetails,
        cover: coverURL,
        curriculum,
        published: false,
        updatedAt: serverTimestamp(),
        author,
        avatar,
        authorId,
      };

      // Generate a unique courseId if not already present
      const courseDocRef = courseDetails.id ? doc(db, 'courses', courseDetails.id) : doc(collection(db, 'courses'));
      if (!courseDetails.id) {
        courseDetails.id = courseDocRef.id; // Set the generated ID to courseDetails
      }
      await setDoc(courseDocRef, { ...courseData, id: courseDocRef.id });
      setSuccessMessage('Draft saved successfully');
    } catch (error) {
      console.error('Error saving draft:', error);
    } finally {
      setSavingDraft(false);
    }
  };

  const handlePublish = async () => {
    setLoading(true);
    setSuccessMessage('');
    try {
      if (!courseDetails || !courseDetails.title) {
        throw new Error('Course details are missing or incomplete');
      }

      let coverURL = courseDetails.cover;
      if (courseDetails.cover instanceof File) {
        coverURL = await handleFileUpload(courseDetails.cover, `courseCovers/${courseDetails.cover.name}`);
      }

      const courseData = {
        ...courseDetails,
        cover: coverURL,
        curriculum,
        published: true,
        price: 'FREE',
        publishedAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        author,
        avatar,
        authorId,
      };

      // Use the existing courseId
      const courseDocRef = doc(db, 'courses', courseDetails.id);
      await setDoc(courseDocRef, { ...courseData, id: courseDocRef.id });
      setSuccessMessage('Course published successfully');
    } catch (error) {
      console.error('Error publishing course:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto p-4 bg-white rounded-md ">
      <h2 className="text-lg font-medium mb-4 text-[#404660]">Review Your Course</h2>
      <div className="mb-4">
        <h3 className="text-base font-medium text-[#404660]">Course Title:</h3>
        <p className="text-gray-600">| {courseDetails.title}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-base font-medium text-[#404660]">Category:</h3>
        <p className="text-gray-600">| {courseDetails.category}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-base font-medium text-[#404660]">Level:</h3>
        <p className="text-gray-600">| {courseDetails.level}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-base font-medium text-[#404660]">Description:</h3>
        <div
          dangerouslySetInnerHTML={{ __html: courseDetails.description }}
          className="border rounded-md p-2 text-gray-600"
        ></div>
      </div>
      <div className="mb-4">
        <h3 className="text-base font-medium text-[#404660]">Learning Outcomes:</h3>
        <ul className="list-disc pl-6 text-gray-600">
          {courseDetails.learningOutcomes.map((outcome, index) => (
            <li key={index}>{outcome}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h3 className="text-base font-medium text-[#404660] ">Price Range:</h3>
        <input
          type="number"
          min="0"
          max="1000"
          step="10"
          className="w-full p-2 pl-5 text-sm text-gray-700 outline-none"
          placeholder="| FREE"
          disabled
        />
        <div className='flex items-center gap-2 mt-4 bg-[#9835ff]/80 rounded p-2 '>
          <FiAlertCircle size={20} color='#fff' />
          <p className='text-white'> Subscribe to add custom price</p>
          <a href="#" className='text-[#9835ff] bg-white px-2 py-1 rounded flex justify-end text-xs font-medium'>Learn More</a>
        </div>
      </div>
      
      {successMessage && (
        <div className="mb-4 p-4 text-green-700 bg-green-100 rounded-md">
          {successMessage}
        </div>
      )}
      
      <div className='flex gap-4'>
        <button
          className="bg-transparent text-[#404660] border border-[#404660]/50 py-2 px-4 rounded-md hover:translate-y-[-5px] transition duration-300 ease-in-out"
          onClick={handleSaveDraft}
          disabled={savingDraft}
        >
          {savingDraft ? 'Saving...' : 'Save Draft'}
        </button>
        <button
          className="bg-[#9835ff] text-white py-2 px-4 rounded-md hover:translate-y-[-5px] transition duration-300  ease-in-out"
          onClick={handlePublish}
          disabled={loading}
        >
          {loading ? 'Publishing...' : 'Publish Course'}
        </button>
      </div>
    </div>
  );
};

export default ReviewPublishForm;