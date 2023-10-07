import React, { useState } from 'react';
import EditFreeStuff from './EditFreeStuff';
import Comments from './Comments';
// import './GoodsCard.css'; // Import the CSS file

const FreeStuffCard = ({ stuff, user, setUserItems, userItems, allForum, isUserProfile, handleUpdateSubmit, handleUpdateUserItems, handleDeleteClick, handleSaveFreeStuffToUserProfile }) => {
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isCommentFormVisible, setIsCommentFormVisible] = useState(false);
  const [errors, setErrors] = useState([]);
  const [commentData, setCommentData] = useState({
    name: '',
    contactInfo: '',
    availableTimes: '',
  });

  const { body, image_url } = stuff;

  const timeOptions = [
    'Morning (9:00 AM - 12:00 PM)',
    'Afternoon (12:00 PM - 3:00 PM)',
    'Evening (3:00 PM - 6:00 PM)',
    'Night (6:00 PM - 9:00 PM)',
  ];
  const handleShowEditForm = () => {
    if (isUserProfile) {
      setErrors(["You can only edit free stuff in your profile."]);
      return;
    }
    setIsEditFormVisible(true);
  };

  const handleSave = () => {
    const saveResult = handleSaveFreeStuffToUserProfile(stuff);
    if (saveResult.success) {
      setIsSaved(true);
      setErrors([]);
    } else {
      setErrors([saveResult.message]);
    }
  };

  const handleDelete = () => {
    if (isUserProfile) {
      setErrors(["You can only delete free stuff in your profile."]);
      return;
    }

    handleDeleteClick(stuff.id);
  };

  const handleCommentButtonClick = () => {
    setIsCommentFormVisible(true);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    // Handle comment submission logic here, e.g., sending data to the server
    // You can access the comment data in the commentData state
    // Reset the comment form and hide it when done
    setIsCommentFormVisible(false);
    setCommentData({
      name: '',
      contactInfo: '',
      availableTimes: '',
    });
  };

  return (
    <div className='goodEdit' onDoubleClick={() => setIsEditFormVisible(!isEditFormVisible)}>
      {isEditFormVisible ? (
        <EditFreeStuff
          user={user}
          allForum={allForum}
          stuff={stuff}
          handleShowEditForm={handleShowEditForm}
          userItems={userItems}
          setUserItems={setUserItems}
          handleUpdateSubmit={handleUpdateSubmit}
          isEditFormVisible={isEditFormVisible}
          setIsEditFormVisible={setIsEditFormVisible}
          handleUpdateUserItems={handleUpdateUserItems}
        />
      ) : (
        <div className="goodCardContainer">
          <div className='goodCard'>
            <h2 className='goodTitle'>{body}</h2>
            <p className='goodInfo'><strong>Image URL:</strong> {image_url}</p>
            <div className='buttonContainer'>
            {!isSaved && !isUserProfile && (
                <button onClick={handleSave} className='crudButton saveButton'>
                  SAVE
                </button>
              )}
              {isSaved && !isUserProfile && (
                  <>
                    <button onClick={handleDelete} className='crudButton deleteButton'>
                      DELETE
                    </button>
                    <button onClick={handleShowEditForm} className='crudButton editButton'>
                      EDIT
                    </button>
                  </>
                )}

              <button onClick={handleCommentButtonClick} className='crudButton commentButton'>
                COMMENT
              </button>
            </div>
            {isSaved && <p className='saveMessage'>Item has been saved to your profile!</p>}
            {errors.length > 0 && (
              <div className="error-messages">
                {errors.map((error, index) => (
                  <p key={index} className="error-message">
                    {error}
                  </p>
                ))}
              </div>
            )}
            {isCommentFormVisible && (
              <form onSubmit={handleCommentSubmit} className='commentForm'>
                <h3 className='commentTitle'>Leave a Comment</h3>
                <div className='formField'>
                  <label htmlFor='name'>Name:</label>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    value={commentData.name}
                    onChange={(e) => setCommentData({ ...commentData, name: e.target.value })}
                    required
                  />
                </div>
                <div className='formField'>
                  <label htmlFor='contactInfo'>Contact Information:</label>
                  <input
                    type='text'
                    id='contactInfo'
                    name='contactInfo'
                    value={commentData.contactInfo}
                    onChange={(e) => setCommentData({ ...commentData, contactInfo: e.target.value })}
                    required
                  />
                </div>
                <div className='formField'>
  <label htmlFor='availableTimes'>Available Times:</label>
  <select
    id='availableTimes'
    name='availableTimes'
    value={commentData.availableTimes}
    onChange={(e) => setCommentData({ ...commentData, availableTimes: e.target.value })}
    required
  >
    <option value=''>Select a time...</option>
    {timeOptions.map((time, index) => (
      <option key={index} value={time}>
        {time}
      </option>
    ))}
  </select>
</div>

                <button type='submit' className='crudButton submitButton'>
                  SUBMIT COMMENT
                </button>
              </form>
            )}
          </div>
        </div>
      )}
            {/* <Comments good={good} user={user} isUserProfile={isUserProfile} /> */}

    </div>
  );
};

export default FreeStuffCard;
