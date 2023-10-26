import React, { useState } from 'react';
import EditGoods from '../editing-components/EditGoods';

const GoodsCard = ({
  good,
  user,
  forum,
  allForum,
  setAllForum,
  allGoods,
  setAllGoods,
  userGoods,
  setUserGoods,
  isUserProfile,
  handleUpdateSubmitGood,
  handleUpdateUserGoods,
  handleDeleteClickGood,
  handleSaveGoodToUserProfile,
  featured,
}) => {
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [errors, setErrors] = useState([]);





  if (!good || !good.title) {
    return <div>Loading...</div>;
  }

  const { title, description, image_url, good_or_service } = good;

  

  const handleShowEditForm = () => {
    if (isUserProfile) {
      setErrors(['You can only edit goods in your profile.']);
      return;
    }
    setIsEditFormVisible(true);
  };

  const handleSaveGood = () => {
    const saveResult = handleSaveGoodToUserProfile(good);
    if (saveResult.success) {
      setIsSaved(true);
      setErrors([]);
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

 



  
  // const handleCommentSubmit = (commentData) => {
  //   // const user_id = user.id;
  //   fetch(`http://localhost:3000/users/${user.id}/comments`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(commentData),
  //   })
  //     .then((response) => {
  //       console.log(commentData )
  //       if (response.ok) {
  //         return response.json();
  //       } else {
  //         throw new Error('Error saving comment');
  //       }
  //     })
  //     .then((savedComment) => {
  //       handleAddComment(savedComment);
  //       window.alert('Comment has been saved!');
  //       setIsCommentFormVisible(false); // Close the comment form on successful submit
  //     })
  //     .catch((error) => {
  //       console.error('Error saving comment:', error);
  //     });
  // };


  
  return (
    <div className="goodEdit" >
      {isEditFormVisible ? (
        <EditGoods
          user={user}
          allForum={allForum}
          good={good}
          handleShowEditForm={handleShowEditForm}
          userGoods={userGoods}
          setUserGoods={setUserGoods}
          handleUpdateSubmitGood={handleUpdateSubmitGood}
          isEditFormVisible={isEditFormVisible}
          setIsEditFormVisible={setIsEditFormVisible}
          handleUpdateUserGoods={handleUpdateUserGoods}
        />
      ) : (
        <div className="goodCardContainer">
          <div className="goodCard">
            <h2 className="goodTitle">{title}</h2>
            <p className="goodDescription">{description}</p>
            <p className="goodInfo">
              <strong>Image URL:</strong>
              {image_url}
            </p>
            <p className="goodInfo">
              <strong>Service needed:</strong> {good_or_service}
            </p>
            <div className="buttonContainer">
              {featured ? (
                <div>
                  {isSaved && (
                    <button onClick={handleSaveGood} className="crudButton saveButton">
                      SAVE
                    </button>
                  )}
                  {isSaved && <p>Item has been saved to your profile!</p>}
                </div>
              ) : (
                <div>
                  {isUserProfile && (
                    <button onClick={handleSaveGood} className="crudButton saveButton">
                      SAVE
                    </button>
                  )}
                  {isSaved && <p>Item has been saved to your profile!</p>}
                  {!isUserProfile && (
                    <>
                      <button onClick={handleDelete} className="crudButton deleteButton">
                        DELETE
                      </button>
                      {/* <button onClick={handleShowEditForm} className="crudButton editButton">
                        EDIT
                      </button> */}
                    </>
                  )}
                
                </div>
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
      )}
    </div>
  );
};

export default GoodsCard;
