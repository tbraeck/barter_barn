import React, { useState } from 'react';

const ServicesCard = ({ 
  service, 
  user, 
  userServices, 
  isUserProfile, 
  handleDeleteClickService, 
  handleSaveServiceToUserProfile 
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [errors, setErrors] = useState([]);
  
  if (!service || !service.title) {
    return <div>Loading...</div>;
  }

  const { title, description, good_or_service } = service;
  const handleSaveService = () => {

    if (userServices.some(savedItem => savedItem.id === service.id)) {
      setErrors(['You have already saved this item.']);
      return;
    }
  
    if (service.user_id === user.id) {
      setErrors(['You cannot save an item you created.']);
      return;
    }
    const saveResult = handleSaveServiceToUserProfile(service);
    if (saveResult.success) {
      setIsSaved(true);
      setErrors([]);
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

return (
      <div className="goodCardContainer">
        <div className='goodCard'>
          <h2 className='goodTitle'>{title}</h2>
          <p className='goodDescription'>{description}</p>
          <p className='goodInfo'><strong>Good needed:</strong> {good_or_service}</p>
          <img className='thumbImg' src={service.image} alt="Service " />
        <div className='buttonContainer'>
            {isUserProfile && (
                service.user_id !== user.id && (
                  <button onClick={() => handleSaveService(service.id)} className="crudButton saveButton">
                    SAVE
                  </button>
                )
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
          {errors && (
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

export default ServicesCard;
