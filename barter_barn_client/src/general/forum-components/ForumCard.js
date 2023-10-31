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

const handleSaveGoodToUserProfile = (item) => {
  if (!isUserProfile) {
    return {
      success: false,
      message: "Saving items is not allowed in your profile.",
    };
  }

  return fetch(`/users/${user.id}/user_goods`, {
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

  return fetch(`http://localhost:3000/users/${user.id}/user_services`, {
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

  return fetch(`http://localhost:3000/users/${user.id}/user_free_stuffs`, {

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


const handleSaveClaimFreeStuffToUserProfile = (item, isItemClaimed) => {
  if (!isUserProfile) {
    return {
      success: false,
      message: "Claiming items is not allowed in your profile.",
    };
  }


  if (isItemClaimed) {
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
        return res.json().then((claimedItem) => {
          setUserFreeStuff([...userFreeStuff, claimedItem]);
          return (
            alert("Claimed item is now in user profile!")
          );
        });
      } else {
        res.json().then((error) => setErrors(error.errors));
        setTimeout(() => {
          setErrors([]);
        }, 3000);
        return {
          success: false,
          message: "Error claiming item.",
        };
      }
    })
    .catch((error) => {
      console.error('Error claiming item:', error);
      return {
        success: false,
        message: error.message,
      };
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
      console.error('Error deleting good:', error);
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

const handleDeleteClickClaimFreeStuff = (user_id, free_stuffs_id) => {
  console.log('userFreeStuff:', userFreeStuff);
  console.log('free_stuffs_id:', free_stuffs_id);
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
      const updatedUserFreeStuff = userFreeStuff.map(stuff =>
        stuff.id === free_stuff_id ? savedFreeStuff : stuff
      );
      setUserFreeStuff(updatedUserFreeStuff);
    })
    .catch((error) => {
      console.error('Error updating items:', error);
    });
};


const setUserClaimedGoods = (updatedUserClaimedGoods) => {
  setUserFreeStuff(updatedUserClaimedGoods);
};


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
     handleDeleteClickGood={(goodId) => handleDeleteClickGood(goodId, 'goods')}
     isUserProfile={isUserProfile}
     handleUpdateSubmitGood={handleUpdateSubmitGood}
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

const forumFreeStuff = forum.free_stuffs.map((stuff) => (
  // const claimed = stuff.claimantId
  // if(!claimed) {
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
     handleDeleteClickClaimFreeStuff={handleDeleteClickClaimFreeStuff}
     handleUpdateSubmitFreeStuff={handleUpdateSubmitFreeStuff}
    handleSaveFreeStuffToUserProfile={handleSaveFreeStuffToUserProfile}
    handleSaveClaimFreeStuffToUserProfile={handleSaveClaimFreeStuffToUserProfile}
    // handleClaimFreeStuff={() => handleClaimFreeStuff(stuff)} // Pass claimed item to the function
    />
  </div>
  // }
))

return (
  <div className="forum-container">
    <div className="forumBox">
      <div className="subTitle">
      <div className="title-box">
          <h1>
            <em>{forum.title}</em>
          </h1>
        </div>
      </div>
      <div className="grid-container">
        <div className="left-content">
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
        <div className="right-content">
          <NewUserGoods
            allForum={allForum}
            setAllForum={setAllForum}
            forum={forum}
            handleAddFreeStuffs={handleAddFreeStuffs}
            handleAddGood={handleAddGood}
            handleAddService={handleAddService}
            user={user}
          />
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

