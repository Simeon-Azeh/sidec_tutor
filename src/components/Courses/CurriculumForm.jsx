import React, { useState, useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { MdOutlineAddCircleOutline, MdOutlineEditNote, MdOutlineDeleteSweep, MdOutlinePostAdd, MdOutlineAddLink } from "react-icons/md";
import { BiSolidImageAdd } from "react-icons/bi";
import { FaFileVideo } from "react-icons/fa6";
import { RiDraggable } from "react-icons/ri";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { db, storage } from '../../../firebaseConfig';
import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const CurriculumForm = ({ courseDetails, curriculum, setCurriculum, handlePreviousStep, handleNextStep, handleDragEnd, handleModuleChange, handleSubModuleChange }) => {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
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

  const handleSaveDraft = async (moduleIndex) => {
    setLoading(true);
    setSaved(false);
    try {
      if (!courseDetails || !courseDetails.title) {
        throw new Error('Course details are missing or incomplete');
      }

      let coverURL = '';
      if (courseDetails.cover) {
        coverURL = await handleFileUpload(courseDetails.cover, `courseCovers/${courseDetails.cover.name}`);
      }

      const updatedSubModules = await Promise.all(curriculum[moduleIndex].subModules.map(async (subModule) => {
        if (subModule.type === 'video' && subModule.content instanceof File) {
          const videoURL = await handleFileUpload(subModule.content, `videos/${subModule.content.name}`);
          return { ...subModule, content: videoURL };
        }
        return subModule;
      }));

      const updatedModule = {
        ...curriculum[moduleIndex],
        subModules: updatedSubModules,
      };

      const courseData = {
        ...courseDetails,
        cover: coverURL,
        curriculum: [
          ...curriculum.slice(0, moduleIndex),
          updatedModule,
          ...curriculum.slice(moduleIndex + 1),
        ],
        author,
        avatar,
        authorId,
      };

      // Generate a unique courseId if not already present
      if (!courseDetails.id) {
        const courseDocRef = doc(collection(db, 'courses'));
        courseDetails.id = courseDocRef.id;
      }
      const courseDocRef = doc(db, 'courses', courseDetails.id);
      await setDoc(courseDocRef, { ...courseData, id: courseDocRef.id });
      const savedCourseData = await getDoc(courseDocRef);

      setCurriculum(savedCourseData.data().curriculum);
      console.log('Draft saved successfully');
      setLoading(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000); // Reset the saved state after 3 seconds
    } catch (error) {
      console.error('Error saving draft:', error);
      setLoading(false);
    }
  };

  const handleImageUpload = async (moduleIndex, subModuleIndex, file) => {
    const imageURL = await handleFileUpload(file, `images/${file.name}`);
    const updatedModules = [...curriculum];
    updatedModules[moduleIndex].subModules[subModuleIndex].content += `<img src="${imageURL}" alt="Image" />`;
    setCurriculum(updatedModules);
  };

  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="curriculum" type="module">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {curriculum.map((module, index) => (
                <Draggable key={module.id} draggableId={module.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="mb-4 bg-white p-4 rounded-md border border-gray-100 "
                    >
                      <div className="flex justify-between items-center w-[100%]">
                        <input
                          type="text"
                          placeholder="| Module Title"
                          value={module.title}
                          onChange={(e) => handleModuleChange(index, 'title', e.target.value)}
                          className="mb-2 p-2 w-[60%] rounded outline-none   text-[#404660] font-medium  "
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleSaveDraft(index)}
                            className="border text-[#404660] py-1 px-2 rounded-md flex items-center gap-1 font-medium w-[100%]"
                          >
                            {loading ? 'Saving...' : saved ? 'Saved' : 'Save Draft'} <MdOutlineEditNote size={20} className='text-[#404660]' />
                          </button>
                          <button
                            onClick={() => {
                              const updatedModules = curriculum.filter((_, i) => i !== index);
                              setCurriculum(updatedModules);
                            }}
                            className="bg-red-400 text-white py-1 px-2 rounded-md flex items-center gap-1 font-medium"
                          >
                            Delete <MdOutlineDeleteSweep size={20} />
                          </button>
                          <button className='text-gray-400 cursor-grab '>
                            <RiDraggable size={25} />
                          </button>
                        </div>
                      </div>
                      {module.subModules.length > 0 && (
                        <div>
                          {module.subModules.map((subModule, subIndex) => (
                            <div key={subIndex} className="mb-4 border p-4 rounded">
                              <input
                                type="text"
                                placeholder="Submodule Title"
                                value={subModule.title}
                                onChange={(e) => handleSubModuleChange(index, subIndex, 'title', e.target.value)}
                                className="mb-2 p-2 w-full border rounded outline-none text-[#404660] font-medium"
                              />
                              <select
                                value={subModule.type}
                                onChange={(e) => handleSubModuleChange(index, subIndex, 'type', e.target.value)}
                                className="mb-2 p-2 w-full border rounded outline-none text-[#404660] font-medium text-base"
                              >
                                <option value="">Select Type</option>
                                <option value="video">Video Lesson</option>
                                <option value="text">Text Lesson</option>
                              </select>

                              {subModule.type === 'video' && (
                                <div>
                                  <div className='mb-2 upload-box border-2 border-dashed border-gray-300 p-8 rounded-md gap-1 flex flex-col bg-[#f5f5f5]'>
                                    <FaFileVideo size={35} className='text-[#9835ff]' />
                                    <input
                                      type="file"
                                      className="hidden"
                                      onChange={(e) => handleSubModuleChange(index, subIndex, 'content', e.target.files[0])}
                                      id={`video-${index}-${subIndex}`}
                                      accept="video/*"
                                    />
                                    <label htmlFor={`video-${index}-${subIndex}`} className="cursor-pointer text-[#404660] font-normal mt-4">
                                      {subModule.content instanceof File ? subModule.content.name : 'Drag and Drop Video Here or Click to Browse'}
                                    </label>
                                  </div>
                                  {typeof subModule.content === 'string' && (
                                    <video controls className="mt-2 w-full rounded-md">
                                      <source src={subModule.content} type="video/mp4" />
                                      Your browser does not support the video tag.
                                    </video>
                                  )}
                                  <input
                                    type="text"
                                    placeholder="Embed Video URL (alternative to uploading a video)"
                                    value={subModule.embedURL || ''}
                                    onChange={(e) => handleSubModuleChange(index, subIndex, 'embedURL', e.target.value)}
                                    className="mb-2 p-2 w-full border rounded outline-none text-[#404660]"
                                  />
                                  <input
                                    type="text"
                                    placeholder="Add Transcript"
                                    value={subModule.transcript || ''}
                                    onChange={(e) => handleSubModuleChange(index, subIndex, 'transcript', e.target.value)}
                                    className="mb-2 p-2 w-full border rounded outline-none text-[#404660]"
                                  />
                                </div>
                              )}

                              {subModule.type === 'text' && (
                                <div>
                                  <ReactQuill
                                    value={subModule.content}
                                    onChange={(value) => handleSubModuleChange(index, subIndex, 'content', value)}
                                    className="border rounded-md mb-2"
                                  />
                                  <div className='flex gap-2 items-center'>
                                    <button
                                      onClick={() => {
                                        const fileInput = document.createElement('input');
                                        fileInput.type = 'file';
                                        fileInput.accept = 'image/*';
                                        fileInput.onchange = async (e) => {
                                          const file = e.target.files[0];
                                          await handleImageUpload(index, subIndex, file);
                                        };
                                        fileInput.click();
                                      }}
                                      className="bg-[#9835ff] text-white py-1 px-2 rounded-md flex items-center gap-1"
                                    >
                                      Add Image <BiSolidImageAdd />
                                    </button>
                                    <button
                                      onClick={() => {
                                        const link = prompt('Enter the link URL:');
                                        if (link) {
                                          const updatedModules = [...curriculum];
                                          updatedModules[index].subModules[subIndex].content += `<a href="${link}" target="_blank">${link}</a>`;
                                          setCurriculum(updatedModules);
                                        }
                                      }}
                                      className="bg-[#9835ff] text-white py-1 px-2 rounded-md flex items-center gap-1"
                                    >
                                      Add Link <MdOutlineAddLink />
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                      <button
                        onClick={() => {
                          const updatedModules = [...curriculum];
                          updatedModules[index].subModules.push({
                            title: '',
                            content: '',
                            type: '',
                          });
                          setCurriculum(updatedModules);
                        }}
                        className="border text-[#404660] border-[#404660]/40 border-solid py-2 px-4 rounded-md flex items-center gap-1"
                      >
                        Add Submodule <MdOutlineAddCircleOutline />
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <button
        onClick={() => {
          const newModule = {
            id: `module-${curriculum.length + 1}`, // Unique ID for draggable
            title: '',
            subModules: [],
          };
          setCurriculum([...curriculum, newModule]);
        }}
        className="bg-[#9835ff] text-white py-2 px-4 rounded-md flex items-center gap-1"
      >
        Add Module <MdOutlineAddCircleOutline />
      </button>
      <div className='flex gap-4 mt-4 justify-end'>
        <button
          onClick={handlePreviousStep}
          className="border border-[#404660]/60 text-[#404660] py-2 px-4 rounded-md"
        >
          Previous
        </button>
        <button onClick={handleNextStep} className="bg-[#9835ff] text-white py-2 px-4 rounded-md">
          Next
        </button>
      </div>
    </div>
  );
};

export default CurriculumForm;