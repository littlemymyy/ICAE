import React, { useState } from 'react';
import Axios from "axios";

const YourComponent = () => {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);

  const handleFileChange = (inputName, event) => {
    const file = event.target.files[0];

    switch (inputName) {
      case 'file1':
        setFile1(file);
        break;
      case 'file2':
        setFile2(file);
        break;
      case 'file3':
        setFile3(file);
        break;
      // Add more cases for additional inputs
      default:
        break;
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    file1 && formData.append('file1', file1);
    file2 && formData.append('file2', file2);
    file3 && formData.append('file3', file3);
    // Add more append statements for additional inputs

    try {
      const response = await fetch('http://localhost:3001/api/uploadAndMerge', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
      } else {
        console.error('Failed to upload and merge PDFs');
      }
    } catch (error) {
      console.error('Error during PDF upload and merge:', error);
    }
  };

  async function uploadFiles() {
    // const form = document.getElementById('fileUploadForm');
    // console.log(form);
    // const formData = new FormData(form);
    // console.log(formData);
    //get the file from the input
    const formData = new FormData();

    file1 && formData.append('file1', file1);
    file2 && formData.append('file2', file2);
    file3 && formData.append('file3', file3);


    try {
      const response = await Axios.post('http://localhost:3001/mergePdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data); // Assuming the server sends a response
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  }

  return (
    <form id="fileUploadForm" encType='multipart/form-data' >
      <div>
        <div>
          <label>File 1: </label>
          <input type="file" onChange={(event) => handleFileChange('file1', event)} />
        </div>
        <div>
          <label>File 2: </label>
          <input type="file" onChange={(event) => handleFileChange('file2', event)} />
        </div>
        <div>
          <label>File 3: </label>
          <input type="file" onChange={(event) => handleFileChange('file3', event)} />
        </div>
        {/* Add more div elements for additional inputs */}
        <button type="button" onClick={uploadFiles}>Submit</button>
      </div>
    </form>
  );
};

export default YourComponent;
