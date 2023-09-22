import React, { useEffect, useState } from 'react';
import UserSavedCard from './UserSavedCard';
// import './styles/UserDrawings.css';

const UserComments = ({ user, handleSaveDrawingToUserProfile }) => {
  const [userComments, setUserComments] = useState([])
 
  useEffect(() => {
    fetch(`http://localhost:3000/users/${user.id}/user_comments`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch user comments');
        }
      })
      .then((data) => {
        setUserComments(data);
      })
      .catch((error) => {
        console.error('Error fetching user comments:', error);
      });
  }, [user.id]);

  const handleDelete = (commentId) => {
    fetch(`http://localhost:3000/users/${user.id}/user_comments/${commentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((response) => {
      if (response.ok) {
        const updatedUserComments = userComments.filter(
          (comment) => comment.id !== commentId
        );
        setUserComments(updatedUserComments);
      } else {
        console.error("Failed to delete comment");
      }
    })
    .catch((error) => {
      console.error("Error deleting comment:", error);
    });
  };

const handleUpdateUserComments = (updatedComment) => {
  setUserComments((prevUserComments) => {
    const updatedUserComments = prevUserComments.map((comment) =>
      comment.id === updatedComment.id ? updatedComment : comment
    );
    return updatedUserComments;
  });
};

  return (
    <div className='drawingContainer'>
    <div className="drawingList">
      {userComments.map((comment) => (
        <div key={comment.id}>
       <UserSavedCard
            comment={comment}
            handleDeleteClick={() => handleDelete(comment.id)}
            user={user}
            handleUpdateUserComments={handleUpdateUserComments}
            userComments={userComments}
            setUserComments={setUserComments}
            handleSaveDrawing={handleSaveCommentToUserProfile} 
          />
        </div>  
      ))}
    </div>
    </div>
  );
};

export default UserComments;



