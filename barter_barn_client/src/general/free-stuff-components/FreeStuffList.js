import React from 'react';
import { Link } from 'react-router-dom';

const FreeStuffList = ({ forumFreeStuff }) => {
  if (!forumFreeStuff) {
    return <div>Loading...</div>;
  }

  const freeStuffItems = forumFreeStuff.map((stuff) => (
    <div key={stuff.id} className="goods-card">
      <ul>
        <li>
          <h1>
            <Link to={`/free_stuffs/${stuff.id}`}>
              <div className="good-title">{stuff.body}</div>
              <div className="good-description">{stuff.image_url}</div>
            </Link>
          </h1>
        </li>
      </ul>
    </div>
  ));

  return (
    <div className="forum-page ">
      <div className="forumList">
        <div className="forums">
          <h1>FREE STUFF</h1>
        </div>
        <div className="forumLinks">
          <ul>{freeStuffItems}</ul>
        </div>
      </div>
    </div>
  );
};

export default FreeStuffList;
