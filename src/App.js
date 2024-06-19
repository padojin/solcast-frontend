import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [previewFile, setPreviewFile] = useState(null);
  const [previewType, setPreviewType] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('File uploaded successfully');
      fetchFileList();
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    }
  };

  const fetchFileList = async () => {
    try {
      const response = await axios.get('http://localhost:3000/file-list');
      setFileList(response.data);
    } catch (error) {
      console.error('Error fetching file list:', error);
    }
  };

  const handleFileClick = async (file) => {
    try {
      const response = await axios.get(`http://localhost:3000/file-url/${encodeURIComponent(file)}`);
      const url = response.data.url;
      console.log('File URL:', url); // Debugging line

      if (/\.(mp4|webm|ogg)$/i.test(file)) {
        setPreviewType('video');
      } else if (/\.(jpg|jpeg|png|gif)$/i.test(file)) {
        setPreviewType('image');
      } else {
        window.open(url, '_blank');
        return;
      }

      setPreviewFile(url);
    } catch (error) {
      console.error('Error getting file URL:', error);
    }
  };

  useEffect(() => {
    fetchFileList();
  }, []);

  return (
    <div className="App">
      <h2>File Upload</h2>
      <form onSubmit={handleFileUpload}>
        <input type="file" onChange={handleFileChange} required />
        <button type="submit">Upload</button>
      </form>

      <h2>File List</h2>
      <div className="file-list">
        {fileList.map((file) => (
          <div key={file} className="file-item" onClick={() => handleFileClick(file)}>
            <span className="file-name">{file.split('/').pop()}</span>
          </div>
        ))}
      </div>

      {previewFile && (
        <div className="file-preview">
          {previewType === 'video' && (
            <video key={previewFile} controls>
              <source src={previewFile} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          {previewType === 'image' && <img key={previewFile} src={previewFile} alt="Preview" />}
        </div>
      )}
    </div>
  );
}

export default App;
