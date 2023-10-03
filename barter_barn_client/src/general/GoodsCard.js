import React, {useState} from 'react';
import EditGoods from './EditGoods';

const GoodsCard = ({ good, userGoods, setUserGoods, user, allForum, isUserProfile, handleUpdateSubmit, handleUpdateUserGoods, handleDeleteClick,  handleSaveGoodToUserProfile }) => {
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [errors, setErrors] = useState([]);

  const { title, description, image_url, good_or_service } = good;

  const handleShowEditForm = () => {
    if (isUserProfile) {
      setErrors(["You can only edit goods in your profile."]);
      return;
    }
    setIsEditFormVisible(true);
  };

  const handleSave = () => {
    const saveResult = handleSaveGoodToUserProfile(good);
    if (saveResult.success) {
      setIsSaved(true);
      setErrors([]);
} else {
      setErrors([saveResult.message]);
    }
  };
  
  
  const handleDelete = (id) => {
    if (isUserProfile) {
      setErrors(["You can only delete goods in your profile."]);
      return;
    }
  
    handleDeleteClick(id);
  };

  return (

    <div className='goodEdit' onDoubleClick={()=> setIsEditFormVisible((isEditFormVisible)=>!isEditFormVisible)}>
    {isEditFormVisible ? 
      <EditGoods 
      user={user} 
      allForum={allForum} 
      good={good} 
      handleShowEditForm={handleShowEditForm} 
      userGoods={userGoods} 
      setUserGoods={setUserGoods}   
      handleUpdateSubmit={handleUpdateSubmit} 
      isEditFormVisible={isEditFormVisible} 
      setIsEditFormVisible={setIsEditFormVisible} 
      handleUpdateUserGoods={handleUpdateUserGoods}
      /> :

    (<div className="drawingCardContainer">
      <div className='drawingCard'>
        <h1>{title}</h1>
        <h2>{description}</h2>
        <h2>{image_url}</h2>
        <h2>{good_or_service}</h2>
          <div>
            {isUserProfile && ( 
              <button onClick={handleSave} className='crudButton'>
                SAVE
              </button>
            )}
            {isSaved && <p>Item has been saved to your profile!</p>}
          </div>
        {!isUserProfile && (
                <>
                  <button onClick={handleDelete} className='crudButton'>
                    DELETE
                  </button>
                  <button onClick={handleShowEditForm} className='crudButton'>
                    EDIT
                  </button>
                </>
              )}
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
    </div>)}
    </div>
  );
};

export default GoodsCard;

