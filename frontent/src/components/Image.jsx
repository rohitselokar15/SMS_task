import React, { useState } from 'react';
import axios from 'axios';

const Image = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post('/api/upload', formData);
      setImageUrls([...imageUrls, response.data.imageUrl]);
    } catch (error) {
      console.error('Error uploading the image', error);
    }
  };

  return (
    <div className="p-4 border flex justify-end">
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} className="bg-blue-500 text-white p-2 rounded">Upload</button>
      <div className="mt-4 grid grid-cols-2 gap-4">
        {imageUrls.map((url, index) => (
          <img key={index} src={url} alt={`Uploaded ${index}`} className="w-full h-auto" />
        ))}
      </div>
    </div>
  );
};

export default Image;
