import React from 'react';
import { Link } from 'react-router-dom';

const CommentsList = ({ forumComments, forumId }) => {
  if (!forumComments) {
    return <div>Loading...</div>;
  }

  const goodItems = forumGoods.map((good) => (
    <div key={good.id} className="goods-card">
      <ul>
        <li>
          <h1>
            <Link to={`/goods/${good.id}`}>
              <div className="good-title">{good.title}</div>
              <div className="good-description">{good.description}</div>
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
          <h1>GOODS</h1>
        </div>
        <div className="forumLinks">
          <ul>{goodItems}</ul>
        </div>
      </div>
    </div>
  );
};

export default CommentsList;
