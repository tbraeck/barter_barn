import React, { useState } from 'react';

const ServicesCard = ({ 
  service, 
  user, 
  allForum, 
  userServices, 
  setUserServices, 
  isUserProfile, 
  handleUpdateSubmitService, 
  handleUpdateUserServices, 
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

return (
 
      <div className="goodCardContainer">
        <div className='goodCard'>
          <h2 className='goodTitle'>{title}</h2>
          <p className='goodDescription'>{description}</p>

          <p className='goodInfo'><strong>Good needed:</strong> {good_or_service}</p>
          <img className='thumbImg' src={service.image} alt="Service " />

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
);

};

export default ServicesCard;
