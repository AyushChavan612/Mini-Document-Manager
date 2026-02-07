import React, { useState } from 'react';
import { uploadFiles } from '../api/fileService';

function UploadSection({ onUploadSuccess }) {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e) => {
    const selectedFiles = Array.from(e.target.files); 
    if (!selectedFiles.length) return;

    const hasInvalidNames = selectedFiles.some(
      (file) => !file.name || file.name.trim() === ""
    );
    
    if (hasInvalidNames) {
      alert("One or more files have an invalid name. Please rename them before uploading.");
      e.target.value = ""; 
      return;
    }

    setIsUploading(true);
    try {
      await uploadFiles(selectedFiles); 
      alert("Upload Successful!");
      
      onUploadSuccess(); 
    } catch (error) {
      alert("Upload failed. Please check if the backend server is running.");
      console.error("Upload Error:", error);
    } finally {
      setIsUploading(false);
      e.target.value = ""; 
    }
  };

  return (
    <div style={{ 
      border: '2px dashed #bbb', 
      padding: '20px', 
      marginBottom: '20px', 
      textAlign: 'center',
      backgroundColor: '#fdfdfd',
      borderRadius: '8px'
    }}>
      <h3 style={{ marginTop: 0 }}>Upload Documents</h3>
      <p style={{ fontSize: '14px', color: '#666' }}>You can select multiple files at once</p>
      
      <input 
        type="file" 
        multiple 
        onChange={handleFileChange} 
        disabled={isUploading}
        style={{ cursor: isUploading ? 'not-allowed' : 'pointer' }}
      />
      
      {isUploading && (
        <p style={{ color: '#2563eb', fontWeight: 'bold', marginTop: '10px' }}>
          Uploading files, please wait...
        </p>
      )}
    </div>
  );
}

export default UploadSection;