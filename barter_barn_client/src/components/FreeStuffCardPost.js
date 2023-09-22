  import React, { useState } from 'react';
  import EditFreeStuff from './EditFreeStuff';
  // import './GoodsCardPost.css'; // Import your custom CSS file for styling

  const FreeStuffCard = ({
    stuff,
    allFreeStuff,
    userFreeStuff,
    setUserFreeStuff,
    user,
    user_comments,
    handleUpdateSubmit,
    handleSaveCommentToUserProfile,
    handleUpdateUserFreeStuff,
    handleDeleteClickFreeStuff,
    handleSaveComment}) => {
    const [isEditFormVisible, setIsEditFormVisible] = useState(false);
    const [isCommentFormVisible, setIsCommentFormVisible] = useState(false);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    const { id, body, image_url } = stuff;
  // console.log(user)
    const capitalizedBody = body.toUpperCase();

    const handleShowEditForm = () => {
      setIsEditFormVisible(true);
    };

    const handleDelete = () => {
      handleDeleteClickFreeStuff(id);
    };

    // const handleSave = () => {
    //   handleSaveCommentToUserProfile(comment);
    // };  

    const handleCommentButtonClick = () => {
      setIsCommentFormVisible(!isCommentFormVisible);
    };

    // const handleSave = () => {
    //   handleSaveCommentsToUserProfile(comment)
    // }

    const handleCommentSubmit = () => {
    
      const newComment = {
        body: comment,
        user_id: user.id, // Add user id
        freeStuffId: id, // Add the id of the free stuff
      };

      // Make an API call to save the comment
      fetch(`http://localhost:3000/comments/dual_save  `, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({comment: newComment, user_comment: newComment}),
      })
        .then((response) => response.json())
        .then((savedComment) => {
          setComments([...comments, savedComment]);
          setComment('');
          setIsCommentFormVisible(false);
        })
        .catch((error) => {
          console.error('Error saving comment:', error);
        });
    };  


    return (
      <div
        className={`goodsCard ${isEditFormVisible ? 'editing' : ''}`}
        onDoubleClick={() => setIsEditFormVisible(!isEditFormVisible)}
      >
        {isEditFormVisible ? (
          <EditFreeStuff
          comments={comments}
          user={user}
          allFreeStuff={allFreeStuff}
          stuff={stuff}
          handleShowEditForm={handleShowEditForm}
          userFreeStuff={userFreeStuff}
          setUserFreeStuff={setUserFreeStuff}
          handleUpdateSubmit={handleUpdateSubmit}
          isEditFormVisible={isEditFormVisible}
          setIsEditFormVisible={setIsEditFormVisible}
          handleUpdateUserFreeStuff={handleUpdateUserFreeStuff}
        />
        ) : (
          <div className="goodsCardContainer">
            <div className="goodsCardContent">
              <h1 className="goodsCardTitle">WHAT I OFFER: {capitalizedBody}</h1>
              <h2 className="goodsCardDescription">IMAGE: {image_url}</h2>
              <button
                className="goodsCardButton btn btn-secondary"
                onClick={handleCommentButtonClick}
              >
                Comment
              </button>

              {isCommentFormVisible && (
                <div>
                  <textarea
                    rows="3"
                    placeholder="Enter your comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <button
                    className="goodsCardButton btn btn-secondary"
                    onClick={handleCommentSubmit}
                  >
                    Submit Comment
                  </button>
                </div>
              )}
         <div className="comments">
  {comments && comments.length > 0 ? (
    comments.map((comment) => (
      <div key={comment.id}>{comment.body}</div>
    ))
  ) : (
    <p>No comments available.</p>
  )}
</div>
              <div className="comments">
                {userFreeStuff
                  .filter((comment) => comment.freeStuffId === id)
                  .map((comment) => (
                    <div key={comment.id}>{comment.text}</div>
                  ))}
              </div>
              <button
                onClick={handleDelete}
                className="goodsCardButton btn btn-secondary"
              >
                DELETE
              </button>
              <button
                onClick={handleShowEditForm}
                className="goodsCardButton btn btn-secondary"
              >
                EDIT
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  export default FreeStuffCard;

  