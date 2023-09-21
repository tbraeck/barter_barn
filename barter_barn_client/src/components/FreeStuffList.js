import React, { useEffect, useState, useContext } from 'react';
import FreeStuffCard from './FreeStuffCard';
import { useParams } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const FreeStuffList = ({ allFreeStuff, handleAdd }) => {
  const [freeStuff, setFreeStuff] = useState({});

  const [userFreeStuff, setUserFreeStuff] = useState([]);

  const { user } = useContext(UserContext);
  const { id, userId, free_stuffId } = useParams();
  const parsedUserId = parseInt(userId, 10);

  useEffect(() => {
    const selectedFreeStuff = allFreeStuff.find((stuff) => stuff.id === parseInt(id));
    if (selectedFreeStuff) {
      setFreeStuff(selectedFreeStuff);
    }
  }, [allFreeStuff, id]);

  const handleDeleteClick = (user_id, free_stuff_id) => {
    fetch(`http://localhost:3000/users/${user_id}/free_stuffs/${free_stuff_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => {
      const deleteStuff = allFreeStuff.filter((s) => s.id !== free_stuff_id); // Use free_stuff_id
      const updatedStuff = allFreeStuff.map((s) =>
        s.id === free_stuff_id ? { ...s, stuff: deleteStuff } : s
      ); // Use free_stuff_id
      setFreeStuff(updatedStuff);
      handleUpdateSubmit(free_stuff_id, deleteStuff); // Use free_stuff_id
    });
  };

  const handleUpdateSubmit = (free_stuff_id, updatedStuff) => {
    fetch(`http://localhost:3000/users/${user.id}/user_free_stuff/${free_stuff_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedStuff),
    })
      .then((r) => r.json())
      .then((savedStuff) => {
        const updatedUserStuff = userFreeStuff.map((stuff) =>
          stuff.id === free_stuff_id ? savedStuff : stuff
        ); // Use free_stuff_id
        setUserFreeStuff(updatedUserStuff);
      });
  };

  const freeStuffPosts = allFreeStuff.map((stuff) => (
    <div key={stuff.id}>
      <FreeStuffCard
        stuff={stuff}
        allFreeStuff={allFreeStuff}
        userFreeStuff={userFreeStuff}
        setUserFreeStuff={setUserFreeStuff}
        user={user}
        handleDeleteClick={handleDeleteClick}
        handleUpdateSubmit={handleUpdateSubmit}
      />
    </div>
  ));

  return (
    <div className="forum-container">
      <div className="forumBox">
        <div className="subTitle">
          <div className="forumName">
            <h1>
              <em>{freeStuff.name}</em>
            </h1>
          </div>
        </div>
        <div className="grid-container">
          <div className="postList">
            <div className="postGrid">
              <ul className="forumPosts">{freeStuffPosts}</ul>
            </div>
          </div>
          <div className="newUserForm">
            {/* Add any content for the newUserForm */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeStuffList;
