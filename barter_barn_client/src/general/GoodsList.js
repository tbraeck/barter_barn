import React from 'react'
import { Link } from 'react-router-dom';


const GoodsList = ({allForum, forum}) => {
console.log(allForum, "All forum")
  const goodItems = forum.goods.map((good) => (
    <div key={good.id}>
        <h1>
            <Link to={`/goods/${good.id}`}>
                {good.title}
            </Link>
        </h1>
    </div>
))

  return (
    <div className='forum-page'>
      <h1>GOODS</h1>
        {/* <div className='forumList'>
            <div className='forums'>
            <h1>GOODS</h1>
            </div>
            <div className='forumLinks'>
              {goodItems}
            </div>
        </div> */}
    </div>
  )
}

export default GoodsList
