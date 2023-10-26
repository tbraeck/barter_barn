import React, { useState } from 'react';
import EditServices from '../editing-components/EditServices';

const ServicesCard = ({ service, user, allForum, userServices, setUserServices, isUserProfile, handleUpdateSubmitService, handleUpdateUserServices, handleDeleteClickService, handleSaveServiceToUserProfile }) => {
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [errors, setErrors] = useState([]);
  

  if (!service || !service.title) {
    return <div>Loading...</div>;
  }

 
  const { title, description, image_url, good_or_service } = service;

  

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

 



  // ...

return (
  <div className='goodEdit' >
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
             
              </>
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
          
        </div>
      </div>
    )}
  </div>
);

};

export default ServicesCard;