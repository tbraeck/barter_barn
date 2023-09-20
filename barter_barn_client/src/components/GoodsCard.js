import React, {useState, useContext, useEffect} from 'react';
import GoodsCardPost from './GoodsCardPost';
import { UserContext } from '../contexts/UserContext';
import { useParams } from 'react-router-dom'

// import EditPost from './EditPost';

const GoodsCard = ({ allGoods }) => {
    const [goods, setGoods] = useState({
       
})
const [userGoods, setUserGoods] = useState([])

    console.log(allGoods)
        
    const { user } = useContext(UserContext);
    
    const {id, userId, goodId} = useParams()
    
    const parsedUserId = parseInt(userId, 10);
    
    useEffect(() => {
      const selectedGood = allGoods.find(good => good.id === parseInt(id));
      if(selectedGood) {
        setGoods(selectedGood)
      }
    }, [allGoods, id])
    
    // const handleSaveGoodsToUserProfile = (good) => {
    //   fetch(`http://localhost:3000/users/${user.id}/goods`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(good),
    //   })
    //     .then((response) => {
    //       if (response.ok) {
    //         return response.json();
    //       } else {
    //         throw new Error('Failed to save good to user profile');
    //       }
    //     })
    //     .then((savedGood) => {
    //       setUserGoods([...userGoods, savedGood]); 
    //       handleUpdateSubmit(savedGood); 
    //       console.log('Good saved to user profile:', savedGood);
    //     })
    //     .catch((error) => {
    //       console.error('Error saving post:', error);
    //     });
    // };
    
    
    const handleDeleteClick = (user_id, good_id) => {
      fetch(`http://localhost:3000/users/${user_id}/goods/${good_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": 'application/json'
        }
      })
      .then(() => {
        const deleteGood = allGoods.filter(g => g.id !== id)
        const updatedGoods = allGoods.map( g => g.id === goods.id ? {...g, goods: deleteGood} : g)
        setGoods(updatedGoods)
        handleUpdateSubmit(id, deleteGood)
      })
      }
     
      const handleUpdateSubmit = (good_id, updatedGood) => {
        fetch(`http://localhost:3000/users/${user.id}/user_goods/${good_id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedGood),
        })
          .then(r => r.json())
          .then(savedGood => {
            console.log(savedGood)
            const updatedUserGoods = userGoods.map(good =>
              good.id === goodId ? savedGood : good
            );
            setUserGoods(updatedUserGoods);
          });
      };


      const goodsPosts = allGoods.map((good) => (
      <div key={good.id}>
        <GoodsCardPost
          good={good}
          user={{ id: parsedUserId }}
          // forum={forum}
          // allForum={allForum}
          handleDeleteClick={handleDeleteClick}
          handleUpdateSubmit={handleUpdateSubmit}
          // handleSavePostToUserProfile={handleSavePostsToUserProfile}
        />
      </div>
    ))
    
    return(
      <div className="forum-container">
            <div className="forumBox">
              <div className="subTitle">
                <div className="forumName">
                  <h1>
                    <em>{goods.name}</em>
                  </h1>
                </div>
              </div>
              <div className="grid-container">
                <div className="postList">
                  <div className="postGrid">
                    <ul className="forumPosts">{goodsPosts}</ul> 
                  </div>
                </div>
                <div className="newUserForm">
                  {/* <NewUserDrawing
                    categories={categories}
                    setCategories={setCategories}
                    category={category}
                    handleAdd={handleAdd}
                    user={user}
                  /> */}
                </div>
              </div>
            </div>
          </div>
    );
    };

export default GoodsCard;

