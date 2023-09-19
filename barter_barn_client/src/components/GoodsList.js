import React from 'react'
import { Link } from 'react-router-dom';


const GoodsList = ({allGoods}) => {
  console.log(allGoods)

  const goodItems = allGoods.map((good) => (
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
        <div className='forumList'>
            <div className='forums'>
            <h1>GOODS</h1>
            </div>
            <div className='forumLinks'>
              {goodItems}
            </div>
        </div>
    </div>
  )
}

export default GoodsList
