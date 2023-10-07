import React, {useEffect, useState, useContext} from 'react'
// import DrawingCard from './DrawingCard'
import ServicesCard from './ServicesCard';
import FreeStuffCard from './FreeStuffCard';
// import NewUserDrawing from './NewUserDrawing'
import { useParams } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext';
import GoodsCard from './GoodsCard';
// import './styles/CategoryCard.css';

const ForumCard = ({allForum, SetAllforum, handleAdd}) => {
  const [forum, setForum] = useState({
    goods: [],
    services: [],
    free_stuffs: []
})

console.log(forum)
const [userItems, setUserItems] = useState([])
const [userGoods, setUserGoods] = useState([])
const [userServices, setUserServices] = useState([])
const [userFreeStuff, setUserFreeStuff] = useState([])

const [errors, setErrors] = useState([]);
const { user } = useContext(UserContext);
const {id} = useParams()

const isUserProfile = user.username !== forum.title;

useEffect(() => {
  const selectedForum = allForum.find(f => f.id === parseInt(id));
  if(selectedForum) {
    setForum(selectedForum)
  }
}, [allForum, id])

const handleSaveGoodToUserProfile = (item) => {
  if (!isUserProfile) {
    return {
      success: false,
      message: "Saving items is not allowed in your profile.",
    };
  }

  return fetch(`/users/${user.id}/user_items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  })
    .then((res) => {
      if (res.ok) {
        return res.json().then((savedItem) => {
          setUserGoods([...userGoods, savedItem]);
          return (
            alert("Item saved to profile!")
        )
          });
      } else {
          res.json().then((error) => setErrors(error.errors))
          setTimeout(() => {
            setErrors(null);
          }, 3000);
          return;
        }
    })
    .catch((error) => {
      console.error('Error saving item:', error);
      return {
        success: false,
        message: error.message,
      };
    });
};


const handleSaveServiceToUserProfile = (item) => {
  if (!isUserProfile) {
    return {
      success: false,
      message: "Saving items is not allowed in your profile.",
    };
  }

  return fetch(`/users/${user.id}/user_items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  })
    .then((res) => {
      if (res.ok) {
        return res.json().then((savedItem) => {
          setUserServices([...userServices, savedItem]);
          return (
            alert("Item saved to profile!")
        )
          });
      } else {
          res.json().then((error) => setErrors(error.errors))
          setTimeout(() => {
            setErrors(null);
          }, 3000);
          return;
        }
    })
    .catch((error) => {
      console.error('Error saving item:', error);
      return {
        success: false,
        message: error.message,
      };
    });
};
console.log(forum)

const handleSaveFreeStuffToUserProfile = (item) => {
  if (!isUserProfile) {
    return {
      success: false,
      message: "Saving items is not allowed in your profile.",
    };
  }

  return fetch(`/users/${user.id}/user_items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  })
    .then((res) => {
      if (res.ok) {
        return res.json().then((savedItem) => {
          setUserFreeStuff([...userFreeStuff, savedItem]);
          return (
            alert("Item saved to profile!")
        )
          });
      } else {
          res.json().then((error) => setErrors(error.errors))
          setTimeout(() => {
            setErrors(null);
          }, 3000);
          return;
        }
    })
    .catch((error) => {
      console.error('Error saving item:', error);
      return {
        success: false,
        message: error.message,
      };
    });
};
console.log(forum)
// const handleDeleteClick = (user_id, drawing_id) => {
//   fetch(`/users/${user_id}/user_items/${good_id}`, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": 'application/json',
//     },
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error('Failed to delete drawing');
//       }
//       return response.json();
//     })
//     .then(() => {
//       const deleteDrawing = category.drawings.filter(r => r.id !== drawing_id);
//       const updatedDrawings = categories.map(c => c.id === category.id ? { ...c, drawings: deleteDrawing } : c);
//       setCategories(updatedDrawings);
//       handleUpdateSubmit(drawing_id, deleteDrawing);
//     })
//     .catch((error) => {
//       console.error('Error deleting drawing:', error);
//     });
// };

const handleUpdateSubmitGood = (good_id, updatedGood) => {
  fetch(`/users/${user.id}/user_goods/${good_id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedGood),
  })
    .then(r => r.json())
    .then(savedGood => {
      console.log(savedGood);
      const updatedUserGoods = userItems.map(good =>
        good.id === good_id ? savedGood : good
      );
      setUserGoods(updatedUserGoods);
    })
    .catch((error) => {
      console.error('Error updating items:', error);
    });
};

const forumGoods = forum.goods.map((good) => (
  <div key={good.id}>
    <GoodsCard
     good={good}
     user={user}
     forum={forum}
     allForum={allForum}
     id={id}
    //  handleDeleteClick={handleDeleteClick}
    //  isUserProfile={isUserProfile}
    //  handleUpdateSubmit={handleUpdateSubmit}
    handleSaveGoodToUserProfile={handleSaveGoodToUserProfile}
    />
  </div>
))
const forumServices = forum.services.map((service) => (
  <div key={service.id}>
    <ServicesCard
     service={service}
     user={user}
     forum={forum}
     allForum={allForum}
    //  handleDeleteClick={handleDeleteClick}
    //  isUserProfile={isUserProfile}
    //  handleUpdateSubmit={handleUpdateSubmit}
    handleSaveServiceToUserProfile={handleSaveServiceToUserProfile}
    />
  </div>
))

const forumFreeStuff = forum.free_stuffs.map((stuff) => (
  <div key={stuff.id}>
    <FreeStuffCard
     stuff={stuff}
     user={user}
     forum={forum}
     allForum={allForum}
     forumId={forum.id}
    //  handleDeleteClick={handleDeleteClick}
    //  isUserProfile={isUserProfile}
    //  handleUpdateSubmit={handleUpdateSubmit}
    handleSaveFreeStuffToUserProfile={handleSaveFreeStuffToUserProfile}
    />
  </div>
))
console.log(forum)

return(
  <div className="forum-container">
  <div className="forumBox">
    <div className="subTitle">
      <h1>
          <em>{forum.title}</em>
        </h1>
    </div>
    <div className="grid-container">
      <div className="goodsList">
        <div className="goodGrid">
          <ul className="catGoods">{forumGoods}</ul> 
        </div>
      </div>
      <div className="servicesList">
        <div className="serviceGrid">
          <ul className="catServices">{forumServices}</ul> 
        </div>
      </div>
      <div className="freeStuffList">
        <div className="freeStuffGrid">
          <ul className="catFreeStuff">{forumFreeStuff}</ul> 
        </div>
      </div>
      {/* Add other grid items as needed */}
      {errors && (
        <div className="error-messages">
          {errors.map((error, index) => (
            <p key={index} className="error-message">
              {error}
            </p>
          ))}
        </div>
      )}
    </div>
  </div>
</div>

);
};

export default ForumCard;

