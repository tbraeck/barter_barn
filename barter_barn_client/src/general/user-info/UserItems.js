import React, {  useState, useEffect  } from 'react';
import GoodsCard from '../goods-components/GoodsCard';
import ServicesCard from '../services-components/ServicesCard';
import FreeStuffCard from '../FreeStuffCard';

const UserItems = ({ allForum, user, setAllForum,setUser, handleUpdateFreeStuffs }) => {
  const [userGoods, setUserGoods] = useState([]);
  const [userServices, setUserServices] = useState([]);
  // const [userFreeStuff, setUserFreeStuff] = useState([]);


  useEffect(() => {
    fetch(`/users/${user.id}/user_goods`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch user goods');
        }
      })
      .then((data) => {
        setUserGoods(data);
      })
      .catch((error) => {
        console.error('Error fetching user goods:', error);
      });

    fetch(`/users/${user.id}/user_services`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch user services');
        }
      })
      .then((data) => {
        setUserServices(data);
      })
      .catch((error) => {
        console.error('Error fetching user services:', error);
      });

  }, [user.id]);


  
  const handleDeleteClickGood = (good_id) => {
    fetch(`/users/${user.id}/user_goods/${good_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((response) => {
      if (response.ok) {
        const updatedUserGoods = userGoods.filter(
          (good) => good.id !== good_id
        );
        setUserGoods(updatedUserGoods);
      } else {
        console.error("Failed to delete good");
      }
    })
    .catch((error) => {
      console.error("Error deleting good:", error);
    });
  };

  const handleDeleteClickService = (service_id) => {
    fetch(`/users/${user.id}/user_services/${service_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((response) => {
      if (response.ok) {
        const updatedUserServices = userServices.filter(
          (service) => service.id !== service_id
        );
        setUserServices(updatedUserServices);
      } else {
        console.error("Failed to delete service");
      }
    })
    .catch((error) => {
      console.error("Error deleting service:", error);
    });
  };

  const handleDeleteClickFreeStuff = (free_stuffs_id) => {
    fetch(`/users/${user.id}/free_stuffs/${free_stuffs_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((res) => res.json())
  .then(() => {
    setUser((prevUser) => {
      const updatedUserFreeStuffs = Object.values(prevUser.saved_free_stuffs).filter(
        (stuff) => stuff.id !== free_stuffs_id
      );
      return {
        ...prevUser,
        saved_free_stuffs: updatedUserFreeStuffs
      };
    });
  })
    .catch((error) => {
      console.error("Error deleting stuff:", error);
    });
  };

  const handleUpdateUserGoods = (updatedGood) => {
    setUserGoods((prevUserGoods) => {
      const updatedUserGoods = prevUserGoods.map((good) =>
        good.id === updatedGood.id ? updatedGood : good
      );
      return updatedUserGoods;
    });
    
  };
  const handleUpdateUserServices = (updatedService) => {
    setUserServices((prevUserServices) => {
      const updatedUserServices = prevUserServices.map((service) =>
        service.id === updatedService.id ? updatedService : service
      );
      return updatedUserServices;
    });
    
  };

    
    const handleUpdateUserFreeStuffs = (updatedStuff) => {
      
      setUser((prevUser) => {
        const updatedUserStuff = prevUser.saved_free_stuffs.map((s) =>
          s.id === updatedStuff.id ? updatedStuff : s
        );
        return { ...prevUser, saved_free_stuffs: updatedUserStuff };
      });
    };
    
  const uniqueUserGoods = userGoods.filter(
    (value, index, self) => self.findIndex((item) => item.id === value.id) === index
  );

  const uniqueUserServices = userServices.filter(
    (value, index, self) => self.findIndex((item) => item.id === value.id) === index
  );

  // const uniqueUserFreeStuff = user.saved_free_stuffs.filter(
  //   (value, index, self) => self.findIndex((item) => item.id === value.id) === index
  // );


  if (allForum.length > 1) {
    return (
    <div className='user-items-container'>
      <div className='user-column'>
        <h2>Goods</h2>
        {uniqueUserGoods.map((good) => (
          <GoodsCard
            key={good.id}
            good={good}
            user={user}
            handleUpdateUserGoods={handleUpdateUserGoods}
            userGoods={userGoods}
            setUserGoods={setUserGoods}
            handleDeleteClickGood={handleDeleteClickGood}
            />
        ))}
      </div>

      <div className='user-column'>
        <h2>Services</h2>
        {uniqueUserServices.map((service) => (
          <ServicesCard
            key={service.id}
            service={service}
            user={user}
            handleUpdateUserServices={handleUpdateUserServices}
            userServices={userServices}
            setUserServices={setUserServices}
            handleDeleteClickService={ handleDeleteClickService}
          />
        ))}
      </div>
      
      <div className='user-column'>
        <h2>Saved Free Stuff</h2>
        {user.saved_free_stuffs
          .filter((stuff) => stuff.claimant_id === null && stuff.user_id !== user.id) 
          .map((stuff) => (
            <FreeStuffCard
              key={`saved-${stuff.id}`}
              stuff={stuff}
              user={user}
              // allForum={allForum}
              // setAllForum={setAllForum}
              // userFreeStuff={userFreeStuff}
              handleUpdateFreeStuffs={handleUpdateFreeStuffs}
              // setUserFreeStuff={setUserFreeStuff}
              handleUpdateUserFreeStuffs={handleUpdateUserFreeStuffs}
              handleDeleteClickFreeStuff={handleDeleteClickFreeStuff}
            />
          ))}
        </div>

  <div className='user-column'>
    <h2>Claimed Free Stuff</h2>
    {user.saved_free_stuffs
      .filter((stuff) => stuff.claimant_id === user.id)
      .map((stuff) => (
        <FreeStuffCard
          key={`claimed-${stuff.id}`} 
          // uniqueUserFreeStuff={uniqueUserFreeStuff}
          stuff={stuff}
          user={user}
          // allForum={allForum}
          // setAllForum={setAllForum}
          // userFreeStuff={userFreeStuff}
          handleUpdateFreeStuffs={handleUpdateFreeStuffs}
          // setUserFreeStuff={setUserFreeStuff}
          handleUpdateUserFreeStuffs={handleUpdateUserFreeStuffs}
          handleDeleteClickFreeStuff={handleDeleteClickFreeStuff}
        />
      ))}
  </div>

    </div>
  ) } else {
    return 'loading...';
  }
};

export default UserItems;
