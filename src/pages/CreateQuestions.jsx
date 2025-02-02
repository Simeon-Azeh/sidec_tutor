import React, { useState } from 'react';
import SidebarMenu from '../components/Courses/SidebarMenu';
import Navbar from '../components/Navbar';
import { db, storage } from '../../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();


function CreateQuestion() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const convertPDFtoImages = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
    const images = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 2.0 });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({
        canvasContext: context,
        viewport: viewport
      }).promise;

      const blob = await new Promise(resolve => {
        canvas.toBlob(resolve, 'image/jpeg', 0.75);
      });

      images.push(blob);
    }

    return images;
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      alert('Please select files to upload');
      return;
    }
  
    setUploading(true);
    try {
      for (const file of files) {
        const fileBaseName = file.name.replace('.pdf', '');
        const [type, title, paper, exam, year, level] = fileBaseName.split('_');
  
        if (!type || !title || !paper || !exam || !year || !level) {
          throw new Error('File name does not match the required naming standard');
        }
  
        const images = await convertPDFtoImages(file);
        const storageFolder = level.toLowerCase() === 'alevel' ? 'Alevel' : 'Olevel';
        const subjectFolder = title.toLowerCase();
        const imageUrls = [];
        
        // Upload images to subject-specific subfolder
        for (let pageNo = 0; pageNo < images.length; pageNo++) {
          const imageName = `${fileBaseName}_${pageNo + 1}.jpg`;
          const storageRef = ref(storage, `questions/${storageFolder}/${subjectFolder}/images/${imageName}`);
          
          await uploadBytes(storageRef, images[pageNo]);
          const imageURL = await getDownloadURL(storageRef);
          imageUrls.push({ pageNo: pageNo + 1, url: imageURL });
          
          setProgress(((pageNo + 1) / images.length) * 100);
        }
  
        // Create single document for the PDF
        const docData = {
          type,
          title,
          paper,
          exam,
          year,
          level,
          subject: title,
          totalPages: images.length,
          images: imageUrls,
          fileName: fileBaseName,
          uploadedAt: new Date()
        };
  
        // Store in level-specific collection
        await addDoc(collection(db, `questions/${storageFolder}/documents`), docData);
      }
  
      setSuccessMessage('Files converted and uploaded successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error processing files:', error);
      alert('Error processing files');
    } finally {
      setUploading(false);
      setFiles([]);
      setProgress(0);
    }
  };
  return (
    <div className="flex h-screen">
      <div className="z-40">
        <SidebarMenu />
      </div>
      <div className="flex-1 overflow-y-auto font-poppins">
        <div className="sticky top-0 z-10">
          <Navbar />
        </div>
        <div className="flex flex-col px-4 lg:px-9 p-6 lg:pl-16">
          <div className="mb-4">
            <label className="block mb-2 text-[#404660] font-medium text-base">Upload PDF</label>
            <input 
              type="file" 
              accept="application/pdf" 
              multiple 
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded file:border-0
                file:text-sm file:font-semibold
                file:bg-[#9835ff] file:text-white
                hover:file:bg-[#7a29cc]"
            />
          </div>
          <button
            onClick={handleUpload}
            className="bg-[#9835ff] text-white px-6 py-3 rounded-lg shadow-lg 
                     hover:bg-[#7a29cc] transition duration-300 ease-in-out
                     flex items-center justify-center gap-2 w-full md:w-auto"
            disabled={uploading}
          >
            {uploading ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Processing... {Math.round(progress)}%
              </>
            ) : (
              'Upload PDFs'
            )}
          </button>
          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4" role="alert">
              <strong className="font-bold">{successMessage}</strong>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateQuestion;