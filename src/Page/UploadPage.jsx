import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export function UploadPage() {
  const [selectedFiles, setSelectedFiles] = useState(null);
  const navigate = useNavigate()
  
  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    if (setSelectedFiles.length === 0) return;

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
        console.log("File uploaded successfully!");
        navigate("/downloadPage")
      } else {
        console.error("File upload failed.");
      }
    } catch (error) {
      return <div>
        <h1>WARNING: THERE IS NO FILE FOR UPLOAD!</h1>  
      </div>
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleUpload}>
        <input type="file" id="fileInput" multiple onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {selectedFiles && <p>Selected file: {selectedFiles.name}</p>}
      <a href="http://localhost:3000/DownloadPage">WARNING: AFTER UPLOAD YOUR FILE, CLICK TO UPLOAD AND GO TO DOWNLOAD PAGE WITH THIS LINK</a>
    </div>
  );
}

export default UploadPage

