import React, { useEffect, useState } from 'react';
import GoodsCardPost from './GoodsCardPost';
// import './styles/UserDrawings.css';

const UserGoods = ({ user, handleSaveGoodToUserProfile }) => {
  const [userGoods, setUserGoods] = useState([])
 
  useEffect(() => {
    fetch(`http://localhost:3000/users/${user.id}/goods`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch user goods');
        }
      })
      .then((data) => {
        setUserGoods(data);
      })
      .catch((error) => {
        console.error('Error fetching user goods:', error);
      });
  }, [user.id]);

  const handleDelete = (goodId) => {
    fetch(`http://localhost:3000/users/${user.id}/user_goods/${goodId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((response) => {
      if (response.ok) {
        const updatedUserGoods = userGoods.filter(
          (good) => good.id !== goodId
        );
        setUserGoods(updatedUserGoods);
      } else {
        console.error("Failed to delete good");
      }
    })
    .catch((error) => {
      console.error("Error deleting good:", error);
    });
  };

const handleUpdateUserGoods = (updatedGood) => {
  setUserGoods((prevUserGoods) => {
    const updatedUserGoods = prevUserGoods.map((good) =>
      good.id === updatedGood.id ? updatedGood : good
    );
    console.log("updatedUSerGoods:", updatedUserGoods)
    return updatedUserGoods;
  });
};

  return (
    <div className='drawingContainer'>
    <div className="drawingList">
      {userGoods.map((good) => (
        <div key={good.id}>
       <GoodsCardPost
            good={good}
            handleDeleteClick={() => handleDelete(good.id)}
            user={user}
            handleUpdateUserGoods={handleUpdateUserGoods}
            userGoods={userGoods}
            setUserGoods={setUserGoods}
            handleSaveGoodToUserProfile={handleSaveGoodToUserProfile} 
          />
        </div>  
      ))}
    </div>
    </div>
  );
};

export default UserGoods;



