import React from 'react'
import { Link } from 'react-router-dom';

const ForumList = ({allForum}) => {
   console.log(allForum)

   const forumItems = allForum.map((forum) => (
        <div key={forum.id}>
            <h1>
                <Link to={`/forums/${forum.id}`}>
                    {forum.name}
                  
                </Link>
            </h1>
        </div>
    ))

  return (
    <div className='forum-page'>
        <div className='forumList'>
            <div className='forums'>
            <h1> CATEGORIES</h1>
            </div>
            <div className='forumLinks'>
            {forumItems}
            </div>
        </div>
    </div>
  )
}

export default ForumList
