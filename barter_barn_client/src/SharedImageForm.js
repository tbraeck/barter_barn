import React from 'react';

const SharedImageForm = ({  imageData, setImageData,  handleImageChange }) => {
  // const [imageData, setImageData] = useState(null);

  const clearImageData = () => {
    setImageData(null);
    handleImageChange('');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const image = new Image();
        image.src = event.target.result;

        image.onload = () => {
          if (image.width <= 800 && image.height <= 800) {
            // Set the image data in state
            setImageData(event.target.result);
            // Call the parent handler to update the image URL in the form
            handleImageChange(event.target.result);
          } else {
            alert('Image dimensions should be 800x800 or smaller.');
          }
        };
      };

      reader.readAsDataURL(file);
    }
  };

  // ...

  return (
    <div className="form-group">
      <label> Image:</label>
      <input type="file"                  
      accept="image/jpeg, image/png, image/webp" 
      onChange={handleImageUpload} />
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
