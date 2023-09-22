

import React, { useState } from 'react';

const UserSavedCard = ({
  comment,
  handleDeleteClick,
  user,
  handleUpdateUserComments,
  userComments,
  setUserComments,
  handleSaveComment, // Changed prop name to match your function
}) => {
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);

  const { id, body } = comment;

  const handleShowEditForm = () => {
    setIsEditFormVisible(true);
  };

  const handleSave = () => {
    handleSaveComment(comment); // Pass the comment you want to save
  };

  const handleDelete = () => {
    handleDeleteClick(id);
  };

  return (
    <div className='drawingEdit' onDoubleClick={() => setIsEditFormVisible(!isEditFormVisible)}>
      {isEditFormVisible ? (
         <EditDrawing user={user} categories={categories} drawing={drawing} handleShowEditForm={handleShowEditForm} userDrawings={userDrawings} setUserDrawings={setUserDrawings} handleUpdateSubmit={handleUpdateSubmit} isEditFormVisible={isEditFormVisible} setIsEditFormVisible={setIsEditFormVisible} handleUpdateUserDrawings={handleUpdateUserDrawings}/> 
         ) 
    ) : (
        <div className="drawingCardContainer">
          <div className='drawingCard'>
            <h1>User Comments</h1>
            <ul>
              {userComments.map((userComment) => (
                <li key={userComment.id}>{userComment.body}</li>
              ))}
            </ul>
            <button onClick={handleSave} className='crudButton'>
              SAVE
            </button>
            <button onClick={handleDelete} className='crudButton'>
              DELETE
            </button>
            <button onClick={handleShowEditForm} className='crudButton'>
              EDIT
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSavedCard;
