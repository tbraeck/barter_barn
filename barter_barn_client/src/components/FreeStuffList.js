import React, { useEffect, useState, useContext } from 'react';
import FreeStuffCard from './FreeStuffCard';
import { useParams } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const FreeStuffList = ({ allFreeStuff, handleAdd }) => {
  const [freeStuff, setFreeStuff] = useState({});
  const [userFreeStuff, setUserFreeStuff] = useState([]);
  const { user } = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    const selectedFreeStuff = allFreeStuff.find((stuff) => stuff.id === parseInt(id));
    if (selectedFreeStuff) {
      setFreeStuff(selectedFreeStuff);
    }
  }, [allFreeStuff, id]);

//   const handleSaveComment = (comment) => {
//     // Call a function to save the comment to the user's profile
//     handleSaveCommentsToUserProfile(comment);
//   };

  const freeStuffPosts = allFreeStuff.map((stuff) => (
    <div key={stuff.id}>
      <FreeStuffCard
        stuff={stuff}
        allFreeStuff={allFreeStuff}
        userFreeStuff={userFreeStuff}
        setUserFreeStuff={setUserFreeStuff}
        user={user}
        user_comments={user_comments}
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
