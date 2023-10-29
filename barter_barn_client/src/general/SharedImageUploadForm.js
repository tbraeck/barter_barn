import React, { useState } from 'react';

const SharedImageForm = ({ imageData, setImageData, clearImage }) => {
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const image = new Image();
        image.src = event.target.result;

        // Assuming you want to limit the image dimensions
        image.onload = () => {
          if (image.width <= 800 && image.height <= 800) {
            // Set the image data in state
            setImageData(event.target.result);
          } else {
            alert('Image dimensions should be 800x800 or smaller.');
          }
        };
      };

      reader.readAsDataURL(file);
    }
  };

  const clearImageData = () => {
    // Clear the image data from state
    setImageData(null);
  };

  return (
    <div className="form-group">
      <label>Main Image:</label>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {imageData && (
        <div>
          <img src={imageData} alt="Preview" />
          <button onClick={clearImageData}>Clear Image</button>
        </div>
      )}
    </div>
  );
};

export default SharedImageForm;
