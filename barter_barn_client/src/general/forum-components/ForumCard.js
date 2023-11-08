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
  handleAddGood, 
  handleAddService,
  handleUpdateFreeStuffs,
}) => {
  const [forum, setForum] = useState({
    goods: [],
    services: [],
    free_stuffs: []
})
const [isClaimed, setIsClaimed] = useState(false);
const [userGoods, setUserGoods] = useState([])
const [userServices, setUserServices] = useState([])
const [userFreeStuff, setUserFreeStuff] = useState([])
const [errors, setErrors] = useState([]);
const { user } = useContext(UserContext);
const {id} = useParams()

const isUserProfile = user.username !== forum.title;

useEffect(() => {
  const selectedForum = allForum.find(f => f.id === parseInt(id));
  if (selectedForum) {
    setForum(selectedForum);
  }
}, [allForum, id]);

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
            return alert("Item saved to profile!");
          });
        } else {
          res.json().then((error) => setErrors(error.errors));
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

const handleDeleteClickGood = (user_id, good_id) => {
  fetch(`/users/${user_id}/user_goods/${good_id}`, {
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
  fetch(`/users/${user_id}/user_services/${service_id}`, {
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
  fetch(`/${user_id}/user_free_stuffs/${free_stuffs_id}`, {
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
      const deleteFreeStuff = forum.free_stuffs.filter(s => s.id !== free_stuffs_id);
      const updatedFreeStuff = allForum.map(f => f.id === forum.id ? { ...f, free_stuffs: deleteFreeStuff } : f);
      setAllForum(updatedFreeStuff);
      handleUpdateSubmitFreeStuff(free_stuffs_id, deleteFreeStuff);
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

const handleUpdateSubmitFreeStuff = (free_stuffs_id, updatedFreeStuff) => {
  fetch(`/users/${user.id}/user_free_stuffs/${free_stuffs_id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedFreeStuff),
  })
    .then(r => r.json())
    .then(savedFreeStuff => {
      const updatedUserFreeStuff = userFreeStuff.map(stuff =>
        stuff.id === free_stuffs_id ? savedFreeStuff : stuff
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

const forumGoods = forum.goods ? forum.goods.map((good) => (
    <GoodsCard
     key={good.id}
     good={good}
     user={user}
     forum={forum}
     allForum={allForum}
     setAllForum={setAllForum}
     userGoods={userGoods}
     setUserGoods={setUserGoods}
     handleDeleteClickGood={(goodId) => handleDeleteClickGood(goodId, 'goods')}
     isUserProfile={isUserProfile}
     handleUpdateSubmitGood={handleUpdateSubmitGood}
    handleSaveGoodToUserProfile={handleSaveGoodToUserProfile}

    />
)) : [];

const forumServices = forum.services ? forum.services.map((service) => (
    <ServicesCard
    key={service.id}
     service={service}
     user={user}
     forum={forum}
     allForum={allForum}
     userServices={userServices}
     setUserServices={setUserServices}
     handleDeleteClickService={(serviceId) => handleDeleteClickService(serviceId, 'services')}
     isUserProfile={isUserProfile}
     handleUpdateSubmitService={handleUpdateSubmitService}
    handleSaveServiceToUserProfile={handleSaveServiceToUserProfile}

    />
)) : [];

 const forumFreeStuff = forum && forum.free_stuffs.filter((stuff) => (
  stuff.claimant_id === null
)
).map(
  (stuff) => (  
    <FreeStuffCard
    key={stuff.id}
     stuff={stuff}
     user={user}
     forum={forum}
     allForum={allForum}
     setAllForum={setAllForum}
     setUserFreeStuff={setUserFreeStuff}
     handleUpdateFreeStuffs={handleUpdateFreeStuffs}
     setUserClaimedGoods={setUserClaimedGoods}
     userFreeStuff={userFreeStuff}
     handleDeleteClickFreeStuff={(free_stuffs_id) => handleDeleteClickFreeStuff(free_stuffs_id, 'stuff')}
     isUserProfile={isUserProfile}
     handleUpdateSubmitFreeStuff={handleUpdateSubmitFreeStuff}
      handleSaveFreeStuffToUserProfile={handleSaveFreeStuffToUserProfile}
      isClaimed={isClaimed}    
      setIsClaimed={setIsClaimed}
/>
    
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
            handleUpdateFreeStuffs={handleUpdateFreeStuffs}
            handleAddGood={handleAddGood}
            handleAddService={handleAddService}
            user={user}
          />
        </div>
      </div>
    </div>
    {errors &&  (
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

