import React, {useState} from 'react';
import './styles/DrawingCard.css';
import EditDrawing from './EditDrawing';

const PostCard = ({ drawing, userDrawings, setUserDrawings, user, categories, handleUpdateSubmit, handleUpdateUserDrawings, handleDeleteClick,  handleSaveDrawingToUserProfile }) => {
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);

  const { id, adjective, noun, verb, adverb } = drawing;

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
        <h1>The</h1>
        <h2>{adjective}</h2>
        <h2>{noun}</h2>
        <h2>{verb}</h2>
        <h2>{adverb}!</h2>
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
    </div>)}
    </div>
  );
};

export default PostCard;

