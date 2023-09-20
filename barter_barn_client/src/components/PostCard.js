import React, {useState} from 'react';
// import './styles/DrawingCard.css';
import EditPost from './EditPost';

const PostCard = ({ post, userPosts, setUserPosts, user, allForum, handleUpdateSubmit, handleDeleteClick,  handleSavePostsToUserProfile }) => {
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
console.log(post)
  const { id, title, body } = post;
console.log()
  const handleShowEditForm = () => {
    setIsEditFormVisible(true);
  };

  const handleSave = () => {
    handleSavePostsToUserProfile(post);
  };

  const handleDelete = () => {
    handleDeleteClick(id);
  };

  return (
    <div className='postEdit' onDoubleClick={()=> setIsEditFormVisible((isEditFormVisible)=>!isEditFormVisible)}>
    {isEditFormVisible? 
      <EditPost user={user} allForum={allForum} post={post} handleShowEditForm={handleShowEditForm} userPosts={userPosts} setUserPosts={setUserPosts} handleUpdateSubmit={handleUpdateSubmit} isEditFormVisible={isEditFormVisible} setIsEditFormVisible={setIsEditFormVisible} /> :

    (<div className="postCardContainer">
      <div className='postCard'>
        <h1>{title}</h1>
       <h2>{body}</h2>
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

