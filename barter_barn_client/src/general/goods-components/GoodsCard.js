import React, { useState } from 'react';

const GoodsCard = ({
  good,
  user, 
  allForum,
  setUserGoods,
  isUserProfile,
  handleDeleteClickGood,
  handleSaveGoodToUserProfile,
  featured,
}) => {
   const [isSaved, setIsSaved] = useState(false);
  const [errors, setErrors] = useState([]);

  if (!good || !good.title) {
    return <div>Loading...</div>;
  }

  const { title, description, image_url, good_or_service } = good;

  const handleSaveGood = () => {
    const saveResult = handleSaveGoodToUserProfile(good);
    if (saveResult.success) {
      setIsSaved(true);
      setErrors([]);
      console.log(good)
    } else {
      setErrors([saveResult.message]);
    }
  };

  const handleDelete = (good) => {
    if (isUserProfile) {
      setErrors(['You can only delete goods in your profile.']);
      return;
    }
    handleDeleteClickGood(good.id);
  };

  return (      
    <div className="goodCardContainer">
    <div className="goodCard">
      <h2 className="goodTitle">{title}</h2>
      <p className="goodDescription">{description}</p>
      <p className="goodInfo">
        <strong>Service needed:</strong> {good_or_service}
      </p>
      <img className='thumbImg' src={good.image} alt="Free Stuff Image" />
    
      <div className="buttonContainer">
          {featured ? (
            // If the card is featured, show the save button only
            <button onClick={handleSaveGood} className="crudButton saveButton">
              SAVE
            </button>
          ) : (
            // If it's not featured, display save and delete buttons
            <>
              {isUserProfile && (
                <button onClick={handleSaveGood} className="crudButton saveButton">
                  SAVE
                </button>
              )}
              {isSaved && <p>Item has been saved to your profile!</p>}
              {!isUserProfile && (
                <button onClick={() => handleDelete(good)} className="crudButton deleteButton">
                  DELETE
                </button>
              )}
            </>
          )}
        </div>
        {isSaved && <p className="saveMessage">Item has been saved to your profile!</p>}
        {errors.length > 0 && (
          <div className="error-messages">
            {errors.map((error, index) => (
              <p key={index} className="error-message">
                {error}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GoodsCard;
