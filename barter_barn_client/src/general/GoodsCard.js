import React, {useState, useContext, useEffect} from 'react';
import GoodsCardPost from './GoodsCardPost';
import { UserContext } from '../contexts/UserContext';
import { useParams } from 'react-router-dom'

// import EditPost from './EditPost';

const GoodsCard = ({ setAllForum, allForum }) => {
  const [forum, setForum] = useState([]);
  const [userGoods, setUserGoods] = useState([])
console.log(forum)


        
    const { user } = useContext(UserContext);
    
    const {id} = useParams()

    // const parsedUserId = parseInt(userId, 10);
    
    useEffect(() => {
      const selectedForum = allForum.find(forum => forum.id === parseInt(id));
      if(selectedForum) {
        setForum(selectedForum)
      }
    }, [allForum, id])
    
    const handleSaveGoodToUserProfile = (good) => {
      fetch(`http://localhost:3000/users/${user.id}/goods`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(good),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Failed to save good to user profile');
          }
        })
        .then((savedGood) => {
          setUserGoods([...userGoods, savedGood]); 
          handleUpdateSubmit(savedGood); 
          console.log('Good saved to user profile:', savedGood);
        })
        .catch((error) => {
          console.error('Error saving post:', error);
        });
    };
    
    console.log(forum)

    const handleDeleteClick = (user_id, good_id) => {
      console.log(`User ID: ${user_id}`);
      console.log(`Good ID: ${good_id}`);
      fetch(`http://localhost:3000/users/${user_id}/goods/${good_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": 'application/json'
        }
      })
      .then(() => {
        const deleteGood = forum.goods.filter(g => g.id !== good_id)
        const updatedGoods = allForum.map(f => f.id === forum.id ? {...f, goods: deleteGood} : f)
        setForum(updatedGoods)
        handleUpdateSubmit(good_id, deleteGood  )
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
              good.id === good_id ? savedGood : good
            );
            setUserGoods(updatedUserGoods);
          });
      };

console.log(forum.goods)
      const goodsPosts = allForum.goods.map((good) => (
      <div key={good.id}>
        <GoodsCardPost
          good={good}
          user={user}
          allForum={allForum}
          handleDeleteClick={handleDeleteClick}
          handleUpdateSubmit={handleUpdateSubmit}
          handleSaveGoodToUserProfile={handleSaveGoodToUserProfile}
         />
      </div>
    ))
    
    return(
      <div className="forum-container">
            <div className="forumBox">
              <div className="subTitle">
                <div className="forumName">
                  <h1>
                    <em>{forum.name}</em>
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

