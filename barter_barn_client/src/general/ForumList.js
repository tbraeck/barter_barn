import React from 'react';
import { Link } from 'react-router-dom';

const ForumList = ({ allForum }) => {
  const forumItems = allForum.map((forum) => (
    <div key={forum.id} className="forum-column">
      <h1>
          <Link to={`/forums/${forum.id}`}>{forum.name}</Link>
      </h1>
    </div>
  ));

  return (
    <div className='forum-page'>
      <div className='forums'>
        <h1>THINGS TO BARTER</h1>
        <br></br>
      </div>
      <div className='forumLinks'>{forumItems}</div>
    </div>
  );
};

export default ForumList;
