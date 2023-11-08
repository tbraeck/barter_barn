import React from 'react'
import { Link } from 'react-router-dom';

const ForumList = ({allForum}) => {

   const forumItems = allForum.map((forum) => (
    <div key={forum.id} className="forum-item">
      <h1>
        <Link to={`/forums/${forum.id}`} className="link">
            {forum.title}
        </Link>
      </h1>
    </div>
  ));

  return (
    <div className="forum-page">
      <div className="forums-box">
        <div className="forums">
          <h1>BARTER FORUMS</h1>
        </div>
        <div className="forum-links">
          <ul className="forum-list">{forumItems}</ul>
        </div>
      </div>
    </div>
  );
};

export default ForumList
