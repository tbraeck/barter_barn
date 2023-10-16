import React, {useEffect, useState, useContext} from 'react'
// import DrawingCard from './DrawingCard'
import ServicesCard from '../services-components/ServicesCard';
import FreeStuffCard from '../free-stuff-components/FreeStuffCard';
import NewUserGoods from '../new_forms/NewUserGoods';
import { useParams } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext';
import GoodsCard from '../goods-components/GoodsCard';

const ForumCard = ({allForum, setAllForum, handleAdd}) => {
  const [forum, setForum] = useState({
    goods: [],
    services: [],
    free_stuffs: []
})

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
      console.log(good)
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
      const deleteFreeStuff = forum.free_stuffs.filter(s => s.id !== free_stuffs_id);
      const updatedFreeStuffs = allForum.map(f => f.id === forum.id ? { ...f, free_stuff: deleteFreeStuff } : f);
      setAllForum(updatedFreeStuffs);
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
      console.log(savedFreeStuff);
      const updatedUserFreeStuff = userFreeStuff.map(stuff =>
        stuff.id === free_stuffs_id ? savedFreeStuff : stuff
      );
      setUserFreeStuff(updatedUserFreeStuff);
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
     userGoods={userGoods}
     setUserGoods={setUserGoods}
     handleDeleteClickGood={handleDeleteClickGood}
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
     handleDeleteClickService={handleDeleteClickService}
     isUserProfile={isUserProfile}
     handleUpdateSubmitService={handleUpdateSubmitService}
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
     id={id}
     userFreeStuff={userFreeStuff}
     setUserFreeStuff={setUserFreeStuff}
     handleDeleteClickFreeStuff={handleDeleteClickFreeStuff}
     isUserProfile={isUserProfile}
     handleUpdateSubmitFreeStuff={handleUpdateSubmitFreeStuff}
    handleSaveFreeStuffToUserProfile={handleSaveFreeStuffToUserProfile}
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
      <div>
              <NewUserGoods
                allForum={allForum}
                setAllForum={setAllForum}
                forum={forum}
                handleAdd={handleAdd}
                user={user}
              />
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
  </div>
</div>

);
};

export default ForumCard;

