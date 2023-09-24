import React from 'react'
import { Link } from 'react-router-dom';


const FreeStuffList = ({allFreeStuff}) => {
console.log(allFreeStuff)
  const freeItems = allFreeStuff.map((free) => (
    <div key={free.id}>
        <h1>
            <Link to={`/free_stuff/${free.id}`}>
                {free.body}
            </Link>
        </h1>
    </div>
))

  return (
    <div className='forum-page'>
        <div className='forumList'>
            <div className='forums'>
            <h1>FREE STUFF</h1>
            </div>
            <div className='forumLinks'>
              {freeItems}
            </div>
        </div>
    </div>
  )
}

export default FreeStuffList
