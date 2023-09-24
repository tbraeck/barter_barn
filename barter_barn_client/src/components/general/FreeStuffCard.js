import React, { useEffect, useState, useContext } from 'react';
import FreeStuffCard from './FreeStuffCardPost';
import { useParams } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const FreeStuffCardPost = ({ allFreeStuff, setAllFreeStuff, handleAdd }) => {
  // const [freeStuff, setFreeStuff] = useState({});
  const [userFreeStuff, setUserFreeStuff] = useState([]);
  const { user } = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    const selectedFreeStuff = allFreeStuff.find((stuff) => stuff.id === parseInt(id));
    if (selectedFreeStuff) {
      setAllFreeStuff(selectedFreeStuff);
    }
  }, [allFreeStuff, setAllFreeStuff, id]);

  const handleSaveComment = (comment) => {
    // Make an API call to save the comment
    fetch(`http://localhost:3000/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comment),
    })
      .then((response) => response.json())
      .then((savedComment) => {
        // Handle the saved comment (e.g., add it to userFreeStuff state)
        setUserFreeStuff([...userFreeStuff, savedComment]);
      })
      .catch((error) => {
        console.error('Error saving comment:', error);
      });
  };
  
  // In your FreeStuffCard component, you can call this function when a comment is submitted:
  

  const freeStuffPosts = allFreeStuff.map((stuff) => (
    <div key={stuff.id}>
      <FreeStuffCard
        stuff={stuff}
        allFreeStuff={allFreeStuff}
        userFreeStuff={userFreeStuff}
        setUserFreeStuff={setUserFreeStuff}
        user={user}
        handleSaveComment={handleSaveComment}
        // handleSaveComment={handleSaveComment} // Pass the function to save comments
      />
    </div>
  ));

  return (
    <div className="forum-container">
      <div className="forumBox">
        <div className="subTitle">
          <div className="forumName">
            <h1>
              <em>{allFreeStuff.name}</em>
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

export default FreeStuffCardPost;
