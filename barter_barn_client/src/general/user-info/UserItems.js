import React, { useEffect, useState } from 'react';
import GoodsCard from '../goods-components/GoodsCard';
import ServicesCard from '../services-components/ServicesCard';
import FreeStuffCard from '../free-stuff-components/FreeStuffCard';
// Import other item components and necessary dependencies

const UserItems = ({ user }) => {
  const [userGoods, setUserGoods] = useState([]);
  const [userServices, setUserServices] = useState([]);
  const [userFreeStuff, setUserFreeStuff] = useState([]);

  useEffect(() => {
    // Fetch user goods 
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

    // Fetch user services
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

    // Fetch user free stuff
    fetch(`/users/${user.id}/user_free_stuffs`)
      .then((response) => {
        if (response.ok) {
          return response.json(); 
        } else {
          throw Error('Failed to fetch user free stuff');
        }
      })
      .then((data) => {
        setUserFreeStuff(data);
      })
      .catch((error) => {
        console.error('Error fetching user free stuff:', error);
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
    fetch(`/users/${user.id}/user_free_stuffs/${free_stuffs_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((response) => {
      if (response.ok) {
        const updatedUserFreeStuffs = userFreeStuff.filter(
          (stuff) => stuff.id !== free_stuffs_id
        );
        setUserFreeStuff(updatedUserFreeStuffs);
      } else {
        console.error("Failed to delete stuff");
      }
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
    setUserFreeStuff((prevUserFreeStuff) => {
      const updatedUserFreeStuffs = prevUserFreeStuff.map((stuff) =>
        stuff.id === updatedStuff.id ? updatedStuff : stuff
      );      console.log(updatedStuff)

      return updatedUserFreeStuffs;
    });
  };

  const handleClaimFreeStuff = (freeStuffId) => {
    // Make an API request to claim the free stuff item
    fetch(`/users/${user.id}/user_free_stuffs/${freeStuffId}/claim`, {
      method: "POST", // You should define a route and controller action for claiming
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          // If the claim was successful, update the claimed property of the item
          const updatedUserFreeStuffs = userFreeStuff.map((item) =>
            item.id === freeStuffId ? { ...item, claimed: true } : item
          );
          setUserFreeStuff(updatedUserFreeStuffs);
        } else {
          console.error("Failed to claim free stuff");
        }
      })
      .catch((error) => {
        console.error("Error claiming free stuff:", error);
      });
  };
  
  // const handleUpdateUserFreeStuffs = (updatedStuff) => {
  //   setUserFreeStuff((prevUserFreeStuff) => {
  //     // Map through the previous items and update the claimed item
  //     const updatedUserFreeStuffs = prevUserFreeStuff.map((item) =>
  //       item.id === updatedStuff.id ? { ...item, claimed: true } : item
  //     );
  
  //     return updatedUserFreeStuffs;
  //   });
  // };

  
// console.log(updatedStuff)
  return (
    <div className='user-items-container'>
      <div className='user-column'>
        <h2>Goods</h2>
        {userGoods.map((good) => (
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
        {userServices.map((service) => (
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
        <h2>Free Stuff</h2>
        {userFreeStuff.map((stuff) => (
          <FreeStuffCard
            key={stuff.id}
            stuff={stuff}
            user={user}
            handleUpdateUserFreeStuffs={handleUpdateUserFreeStuffs}
            userFreeStuff={userFreeStuff}
            setUserFreeStuff={setUserFreeStuff}
            handleDeleteClickFreeStuff={ handleDeleteClickFreeStuff}
            handleClaimFreeStuff={handleClaimFreeStuff} 

          />
        ))}
      </div>

      
    </div>
  );
};

export default UserItems;
