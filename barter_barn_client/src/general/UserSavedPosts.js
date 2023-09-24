import React, { useEffect, useState } from 'react';

import './styles/UserDrawings.css';

const UserSavedPosts = ({ user, handleSavePost }) => {
  const [userDrawings, setUserDrawings] = useState([])
 
  useEffect(() => {
    fetch(`http://localhost:3000/users/${user.id}/drawings`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch user drawings');
        }
      })
      .then((data) => {
        setUserDrawings(data);
      })
      .catch((error) => {
        console.error('Error fetching user drawings:', error);
      });
  }, [user.id]);

  const handleDelete = (drawingId) => {
    fetch(`http://localhost:3000/users/${user.id}/user_drawings/${drawingId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((response) => {
      if (response.ok) {
        const updatedUserDrawings = userDrawings.filter(
          (drawing) => drawing.id !== drawingId
        );
        setUserDrawings(updatedUserDrawings);
      } else {
        console.error("Failed to delete drawing");
      }
    })
    .catch((error) => {
      console.error("Error deleting drawing:", error);
    });
  };

const handleUpdateUserDrawings = (updatedDrawing) => {
  setUserDrawings((prevUserDrawings) => {
    const updatedUserDrawings = prevUserDrawings.map((drawing) =>
      drawing.id === updatedDrawing.id ? updatedDrawing : drawing
    );
    return updatedUserDrawings;
  });
};

  return (
    <div className='drawingContainer'>
    <div className="drawingList">
      {userDrawings.map((drawing) => (
        <div key={drawing.id}>
       <DrawingCard
            drawing={drawing}
            handleDeleteClick={() => handleDelete(drawing.id)}
            user={user}
            handleUpdateUserDrawings={handleUpdateUserDrawings}
            userDrawings={userDrawings}
            setUserDrawings={setUserDrawings}
            handleSaveDrawing={handleSaveDrawingToUserProfile} 
          />
        </div>  
      ))}
    </div>
    </div>
  );
};

export default UserSavedPosts;



