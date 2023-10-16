import React, { useState } from 'react';
import EditServices from '../editing-components/EditServices';
import Comments from '../comment-components/CommentCard.js';// import './GoodsCard.css'; // Import the CSS file

const ServicesCard = ({ service, user, allForum, userServices, setUserServices, isUserProfile, handleUpdateSubmitService, handleUpdateUserServices, handleDeleteClickService, handleSaveServiceToUserProfile }) => {
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isCommentFormVisible, setIsCommentFormVisible] = useState(false);
  const [errors, setErrors] = useState([]);
  const [commentData, setCommentData] = useState({
    name: '',
    contactInfo: '',
    availableTimes: '',
  });

  if (!service || !service.title) {
    return <div>Loading...</div>;
  }

 
  const { title, description, image_url, good_or_service } = service;

  const timeOptions = [
    'Morning (9:00 AM - 12:00 PM)',
    'Afternoon (12:00 PM - 3:00 PM)',
    'Evening (3:00 PM - 6:00 PM)',
    'Night (6:00 PM - 9:00 PM)',
  ];

  const handleShowEditForm = () => {
    if (isUserProfile) {
      setErrors(["You can only edit services in your profile."]);
      return;
    }
    setIsEditFormVisible(true);
  };

  const handleSaveService = () => {
    const saveResult = handleSaveServiceToUserProfile(service);
    if (saveResult.success) {
      setIsSaved(true);
      setErrors([]);
      console.log(service)

    } else {
      setErrors([saveResult.message]);
    }
  };

  const handleDelete = (service) => {
    if (isUserProfile) {
      setErrors(["You can only delete services in your profile."]);
      return;
    }
    handleDeleteClickService(service.id);
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

  // ...

return (
  <div className='goodEdit' onDoubleClick={() => setIsEditFormVisible((isEditFormVisible)=>!isEditFormVisible)}>
    {isEditFormVisible ? (
      <EditServices
        user={user}
        allForum={allForum}
        service={service}
        handleShowEditForm={handleShowEditForm}
        userServices={userServices}
        setUserServices={setUserServices}
        handleUpdateSubmitService={handleUpdateSubmitService}
        isEditFormVisible={isEditFormVisible}
        setIsEditFormVisible={setIsEditFormVisible}
        handleUpdateUserServices={handleUpdateUserServices}
      />
    ) : (
      <div className="goodCardContainer">
        <div className='goodCard'>
          <h2 className='goodTitle'>{title}</h2>
          <p className='goodDescription'>{description}</p>
          <p className='goodInfo'><strong>Image URL:</strong>{image_url}</p>
          <p className='goodInfo'><strong>Good needed:</strong> {good_or_service}</p>
          <div className='buttonContainer'>
            {isUserProfile && (
              <button onClick={handleSaveService} className='crudButton saveButton'>
                SAVE
              </button>
            )}
            {isSaved && <p>Item has been saved to your profile!</p>}
            
            {!isUserProfile && (
              <>
                <button onClick={() => handleDelete(service)} className='crudButton deleteButton'>
                  DELETE
                </button>
                <button onClick={handleShowEditForm} className='crudButton editButton'>
                  EDIT
                </button>
              </>
            )}
            {isUserProfile && (
              <button onClick={handleCommentButtonClick} className='crudButton commentButton'>
                COMMENT
              </button>
            )}
          </div>
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
  </div>
);

};

export default ServicesCard;
