import React from 'react'

const UserSavedCard = ({  comment, 
    handleDeleteClick,
    user,
    handleUpdateUserComments,
    userComments,
    setUserComments,
    handleSaveDrawing }) => {

  const [isEditFormVisible, setIsEditFormVisible] = useState(false);

  const { id, body } = comment;
        
  const handleShowEditForm = () => {
    setIsEditFormVisible(true);
  };

  const handleSave = () => {
    handleSaveDrawingToUserProfile(drawing);
  };  

  const handleDelete = () => {
    handleDeleteClick(id);
  };
  return (

    <div className='drawingEdit' onDoubleClick={()=> setIsEditFormVisible((isEditFormVisible)=>!isEditFormVisible)}>
    {isEditFormVisible? 
      <EditDrawing user={user} categories={categories} drawing={drawing} handleShowEditForm={handleShowEditForm} userDrawings={userDrawings} setUserDrawings={setUserDrawings} handleUpdateSubmit={handleUpdateSubmit} isEditFormVisible={isEditFormVisible} setIsEditFormVisible={setIsEditFormVisible} handleUpdateUserDrawings={handleUpdateUserDrawings}/> :

    (<div className="drawingCardContainer">
      <div className='drawingCard'>
        <h1>User Comments</h1>
        {userComments.map((comment) => {
            <ul>{comment}</ul>
        })}
        {/* <button onClick={handleSave} className='crudButton'>
          SAVE
        </button> */}
        <button onClick={handleDelete} className='crudButton'>
          DELETE
        </button>
        <button onClick={handleShowEditForm} className='crudButton'>
          EDIT
        </button>
       
      </div>
    </div>)}
    </div>
  );
};

export default UserSavedCard
