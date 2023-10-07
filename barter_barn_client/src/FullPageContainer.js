import React from 'react';
import { Link } from 'react-router-dom';

const FullPageContainer = ({ allForum }) => {
  const forumItems = allForum.map((forum) => (
    <div key={forum.id}>
      <h1 className='linkH1'>
        <Link to={`/forums/${forum.id}`}>
          {forum.name}
        </Link>
      </h1>
    </div>
  ));

  return (
    <div className='cat-page'>
      <div className='categoriesBox'>
        <div className='categoryLinks'>
          {forumItems}
        </div>
      </div>
    </div>
  );
}

export default FullPageContainer;
