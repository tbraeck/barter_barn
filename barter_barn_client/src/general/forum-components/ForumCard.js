import React, {useEffect, useState, useContext} from 'react'
// import DrawingCard from './DrawingCard'
import ServicesCard from '../services-components/ServicesCard';
import FreeStuffCard from '../free-stuff-components/FreeStuffCard';
import NewUserGoods from '../new_forms/NewUserGoods';
import { useParams } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext';
import GoodsCard from '../goods-components/GoodsCard';

const ForumCard = (
  {allForum,   
  setAllForum, 
  allComments, 
  setAllComments, 
  handleAddGood, 
  handleAddService, 
  handleAddFreeStuffs}) => {

  const [forum, setForum] = useState({
    goods: [],
    services: [],
    free_stuffs: []
})
console.log(forum)
console.log(allForum)
const [userGoods, setUserGoods] = useState([])
const [userServices, setUserServices] = useState([])
const [userFreeStuff, setUserFreeStuff] = useState([])
// const [userComments, setUserComments] = useState([])

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

const handleSaveGoodToUserProfile = (good) => {
  if (!isUserProfile) {
    return {
      success: false,
      message: "Saving goods is not allowed in your profile.",
    };
  }

  return fetch(`http://localhost:3000/users/${user.id}/user_goods`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(good),
  })
    .then((res) => {
      if (res.ok) {
        return res.json().then((savedGood) => {
          setUserGoods([...userGoods, savedGood]);
          console.log(savedGood)

          return (
            alert("Good saved to profile!")
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
      console.error('Error saving good:', error);
      return {
        success: false,
        message: error.message,
      };
    });
};
console.log(forum)
console.log(allForum)

const handleSaveServiceToUserProfile = (item) => {
  if (!isUserProfile) {
    return {
      success: false,
      message: "Saving items is not allowed in your profile.",
    };
  }

  return fetch(`/users/${user.id}/user_services`, {
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

const handleSaveFreeStuffToUserProfile = (item) => {
  if (!isUserProfile) {
    return {
      success: false,
      message: "Saving items is not allowed in your profile.",
    };
  }



  const isItemSaved = userFreeStuff.some((savedItem) => savedItem.id === item.id);

  if (isItemSaved) {
    return Promise.resolve({
      success: false,
      message: "Item already saved to user profile."
    });
  }

  return fetch(`/users/${user.id}/user_free_stuffs`, {

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

const sendMessageToOriginalPoster = (claimedItem, claimingUser) => {
  // You can use a fetch request or any other method to send the message to the original poster.
  // For this example, let's assume you're using a fetch request to a messaging API.

  const message = `Your item "${claimedItem.body}" has been claimed by ${claimingUser.name}.`;

  fetch('http://localhost:3000/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      recipient: claimedItem.posterId, // Assuming you have a posterId in your data
      message,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to send a message to the original poster.');
      }
      // Handle successful message sending if needed.
    })
    .catch((error) => {
      console.error('Error sending a message:', error);
      // Handle the error case if the message sending fails.
    });
};

const handleDeleteClickGood = (user_id, good_id) => {
  fetch(`http://localhost:3000/users/${user_id}/user_goods/${good_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": 'application/json', 
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to delete good');
      }
      return response.json();
    })
    .then(() => {
      const deleteGood = forum.goods.filter(g => g.id !== good_id);
      const updatedGoods = allForum.map(f => f.id === forum.id ? { ...f, goods: deleteGood } : f);
      setAllForum(updatedGoods);
      handleUpdateSubmitGood(good_id, deleteGood);
    })
    .catch((error) => {
      console.error('Error deleting drawing:', error);
    });
};

const handleDeleteClickService = (user_id, service_id) => {
  fetch(`http://localhost:3000/users/${user_id}/user_services/${service_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": 'application/json', 
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to delete service');
      }
      return response.json();
    })
    .then(() => {
      const deleteService = forum.services.filter(s => s.id !== service_id);
      const updatedServices = allForum.map(f => f.id === forum.id ? { ...f, services: deleteService } : f);
      setAllForum(updatedServices);
      handleUpdateSubmitService(service_id, deleteService);
    })
    .catch((error) => {
      console.error('Error deleting service:', error);
    });
};

const handleDeleteClickFreeStuff = (user_id, free_stuffs_id) => {
  fetch(`http://localhost:3000/users/${user_id}/user_free_stuffs/${free_stuffs_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to delete stuff');
      }
      return response.json();
    })
    .then(() => {
      // Remove the item from the user's profile
      const updatedUserFreeStuffs = userFreeStuff.filter((item) => item.id !== free_stuffs_id);
      setUserFreeStuff(updatedUserFreeStuffs);

      // Add the item back to the free stuff forum
      const itemToRestore = userFreeStuff.find((item) => item.id === free_stuffs_id);
      if (itemToRestore) {
        const updatedFreeStuffs = [...allForum, itemToRestore];
        setAllForum(updatedFreeStuffs);
      }

      handleUpdateSubmitFreeStuff(free_stuffs_id, updatedUserFreeStuffs);
    })
    .catch((error) => {
      console.error('Error deleting stuff:', error);
    });
};


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
      const updatedUserGoods = userGoods.map(good =>
        good.id === good_id ? savedGood : good
      );
      setUserGoods(updatedUserGoods);
    })
    .catch((error) => {
      console.error('Error updating items:', error);
    });
};

const handleUpdateSubmitService = (service_id, updatedService) => {
  fetch(`/users/${user.id}/user_services/${service_id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedService),
  })
    .then(r => r.json())
    .then(savedService => {
      console.log(savedService);
      const updatedUserServices = userServices.map(service =>
        service.id === service_id ? savedService : service
      );
      setUserServices(updatedUserServices);
    })
    .catch((error) => {
      console.error('Error updating items:', error);
    });
};

const handleUpdateSubmitFreeStuff = (free_stuff_id, updatedFreeStuff) => {
  fetch(`/users/${user.id}/user_free_stuffs/${free_stuff_id}`, {
    // "/users/:user_id/user_free_stuffs/:free_stuff_id"
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedFreeStuff),
  })
    .then(r => r.json())
    .then(savedFreeStuff => {
      console.log(savedFreeStuff);
      const updatedUserFreeStuff = userFreeStuff.map(stuff =>
        stuff.id === free_stuff_id ? savedFreeStuff : stuff
      );
      setUserFreeStuff(updatedUserFreeStuff);
    })
    .catch((error) => {
      console.error('Error updating items:', error);
    });
};


// const setForumGoods = (updatedForumGoods) => {
//   setAllForum(updatedForumGoods);
// };

const setUserClaimedGoods = (updatedUserClaimedGoods) => {
  setUserFreeStuff(updatedUserClaimedGoods);
};

// const sendMessageToOriginalUser = (originalUser, claimingUser, good) => {
//   const message = {
//     from: claimingUser,
//     to: originalUser,
//     content: `Your good "${good.title}" has been claimed by ${claimingUser.username}.`,
//   };

//   // Add the message to your messaging system or state
//   addMessage(message);
// };



// const handleClaimFreeStuff = (claimedItem) => {
//   // Step 1: Remove the claimed item from the forum
//   const updatedForum = {
//     ...forum,
//     free_stuffs: forum.free_stuffs.filter(item => item.id !== claimedItem.id)
//   };
//   setAllForum(updatedForum);

//   // Step 2: Add the claimed item to the user's profile
//   setUserFreeStuff([...userFreeStuff, claimedItem]);

//   // Step 3: Send a message to the original poster
//   // sendMessageToOriginalPoster(claimedItem);

//   // You might want to handle error cases here.
// };


const forumGoods = forum.goods.map((good) => (
  <div key={good.id}>
    <GoodsCard
     good={good}
     user={user}
     forum={forum}
     allForum={allForum}
     setAllForum={setAllForum}
     id={id}
     userGoods={userGoods}
     setUserGoods={setUserGoods}
     handleDeleteClickGood={(good_id) => handleDeleteClickGood(good_id, 'goods')}
     isUserProfile={isUserProfile}
     handleUpdateSubmitGood={handleUpdateSubmitGood}
    handleSaveGoodToUserProfile={handleSaveGoodToUserProfile}

    />
  </div>
))
console.log(forum)
console.log(allForum)
const forumServices = forum.services.map((service) => (
  <div key={service.id}>
    <ServicesCard
     service={service}
     user={user}
     forum={forum}
     allForum={allForum}
     id={id}
     userServices={userServices}
     setUserServices={setUserServices}
     handleDeleteClickService={(serviceId) => handleDeleteClickService(serviceId, 'services')}
     isUserProfile={isUserProfile}
     handleUpdateSubmitService={handleUpdateSubmitService}
    handleSaveServiceToUserProfile={handleSaveServiceToUserProfile}

    />
  </div>
))
console.log(forum.free_stuffs)
const forumFreeStuff = forum.free_stuffs.map((stuff) => (
  <div key={stuff.id}>
    <FreeStuffCard
     stuff={stuff}
     user={user}
     forum={forum}
     allForum={allForum}
     setAllForum={setAllForum}
     id={id}
     setUserClaimedGoods={setUserClaimedGoods}
     userFreeStuff={userFreeStuff}
     setUserFreeStuff={setUserFreeStuff}
     handleDeleteClickFreeStuff={(free_stuffs_id) => handleDeleteClickFreeStuff(free_stuffs_id, 'stuff')}
     isUserProfile={isUserProfile}
     sendMessageToOriginalPoster={sendMessageToOriginalPoster}
    //  handleUpdateUserFreeStuffs={handleUpdateUserFreeStuffs}
     handleUpdateSubmitFreeStuff={handleUpdateSubmitFreeStuff}
    handleSaveFreeStuffToUserProfile={handleSaveFreeStuffToUserProfile}
    
    // handleClaimFreeStuff={() => handleClaimFreeStuff(stuff)} // Pass claimed item to the function

    />
  </div>
))

return(
  <div className="forum-container">
    
  <div className="forumBox">
    <div className="subTitle">
      <h1>
          <em>{forum.title}</em>
        </h1>
    </div>
    <div>
        <NewUserGoods  
          allForum={allForum}
          setAllForum={setAllForum}
          forum={forum}
        handleAddFreeStuffs={handleAddFreeStuffs}
        handleAddGood={handleAddGood}
        handleAddService={handleAddService}
        user={user} />
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
      
      </div>
    
    </div>
    
            
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

);
};

export default ForumCard;

