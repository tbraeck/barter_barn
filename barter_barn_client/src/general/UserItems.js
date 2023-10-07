import React, { useEffect, useState } from 'react';
import GoodsCard from './GoodsCard';
// import './styles/UserDrawings.css';

const UserItems = ({ user, handleSaveItemsToUserProfile }) => {
  const [userItems, setUserItems] = useState([])
 
  useEffect(() => {
    fetch(`/users/${user.id}/user_items`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch user items');
        }
      })
      .then((data) => {
        setUserItems(data);
      })
      .catch((error) => {
        console.error('Error fetching user items:', error);
      });
  }, [user.id]);

  const handleDelete = (goodId) => {
    fetch(`/users/${user.id}/user_items/${goodId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((response) => {
      if (response.ok) {
        const updatedUserItems = userItems.filter(
          (good) => good.id !== goodId
        );
        setUserItems(updatedUserItems);
      } else {
        console.error("Failed to delete item");
      }
    })
    .catch((error) => {
      console.error("Error deleting item:", error);
    });
  };

const handleUpdateUserItems = (updatedItem) => {
  setUserItems((prevUserItems) => {
    const updatedUserItems = prevUserItems.map((good) =>
      good.id === updatedItem.id ? updatedItem : good
    );
    return updatedUserItems;
  });
};

  return (
    <div className='drawingContainer'>
    <div className="drawingList">
      {userItems.map((good) => (
        <div key={good.id}>
       <GoodsCard
            good={good}
            handleDeleteClick={() => handleDelete(good.id)}
            user={user}
            handleUpdateUserItems={handleUpdateUserItems}
            userItems={userItems}
            setUserItems={setUserItems}
            handleSaveItemsToUserProfile={handleSaveItemsToUserProfile} 
          />
        </div>  
      ))}
    </div>
    </div>
  );
};

export default UserItems;



