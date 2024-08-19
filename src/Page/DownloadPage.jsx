import React, { useState, useEffect } from 'react';

export const DownloadPage = () => {
  const [files, setFiles] = useState([]);
  const [estimateTime, setEstimateTime] = useState(null); // State to hold the estimate time

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch('http://localhost:3000/DownloadPage'); // Correct the URL if needed
        if (response.ok) {
          const data = await response.json();
          setFiles(data.Files); // Assuming the response contains a list of filenames in `Files` key
          setEstimateTime(data.estimate_time); // Set the estimate time from the response
        } else {
          console.error('Failed to fetch files');
        }
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    fetchFiles();
  }, []);

  const handleDownload = (filename) => {
    // Create a link element and trigger a download
    const link = document.createElement('a');
    link.href = `http://localhost:3000/download/${filename}`; // Correct the URL if needed
    link.download = filename; // Optional: specifies the name for the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <h1>Available Files</h1>
      <h2>IF there is no Estimated Time for Concatenation, means your file is being process</h2>
      <h2>please wait until Estimated Time for Concatenation time is appear!</h2>
      {estimateTime !== null}
      
      
      
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            <p>Estimated Time for Concatenation: {estimateTime.toFixed(2)} seconds</p> 
            <button onClick={() => handleDownload(file)}>{file}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DownloadPage;



