


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function UploadPage() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const navigate = useNavigate();
  
  const handleFileChange = (event) => {
    const files = event.target.files;
    
    // Check if selected files are mp3 or wav
    for (let i = 0; i < files.length; ++i) {
      const file = files[i];
      if (!file.name.endsWith('.mp3') && !file.name.endsWith('.wav')) {
        alert("ONLY .mp3 or .wav files ARE ALLOWED!");
        event.target.value = null; // Clear the input
        setSelectedFiles([]);
        return;
      }
    }
    setSelectedFiles(files);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    
    if (selectedFiles.length === 0) {
      alert("Please select files and upload!");
      return;
    }

    const formData = new FormData();
    Array.from(selectedFiles).forEach(file => {
      formData.append("files", file);    
    });
    
    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("All the files have been uploaded and are being processed!");
        console.log("File uploaded successfully!");
        // Navigate to download page or handle response as needed
        navigate("/downloadPage");
      } else {
        console.error("File upload failed.");
        alert("File upload failed.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file.");
    }
  };

  return (
    <div>
      <form onSubmit={handleUpload}>
        <input type="file" id="fileInput" multiple onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {selectedFiles.length > 0 && (
        <p>Selected files: {Array.from(selectedFiles).map(file => file.name).join(', ')}</p>
      )}
{/*       <a href="http://ducnguyen2012.github.io/DownloadPage">WARNING: AFTER UPLOAD YOUR FILE, CLICK TO UPLOAD AND GO TO DOWNLOAD PAGE WITH THIS LINK</a> */}
      <button onClick={() => navigate('/downloadPage')}>Go to downloadPage</button>
    </div>
  );
}

export default UploadPage;

