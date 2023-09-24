import React, {useState, useEffect, useContext} from 'react';
import ServicesCardPost from './ServicesCardPost';
import { UserContext } from '../contexts/UserContext';
import { useParams } from 'react-router-dom'

const ServicesCard = ({ allServices }) => {
  const [services, setServices] = useState({
       
  })
  const [userServices, setUserServices] = useState([])          
      const { user } = useContext(UserContext);
      
      const {id, userId, serviceId} = useParams()
      
      const parsedUserId = parseInt(userId, 10);
      
      useEffect(() => {
        const selectedService = allServices.find(service => service.id === parseInt(id));
        if(selectedService) {
          setServices(selectedService)
        }
      }, [allServices, id])
      
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
      
      
      const handleDeleteClick = (user_id, service_id) => {
        fetch(`http://localhost:3000/users/${user_id}/services/${service_id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": 'application/json'
          }
        })
        .then(() => {
          const deleteService = allServices.filter(s => s.id !== id)
          const updatedServices = allServices.map( s => s.id === services.id ? {...s, services: deleteService} : s)
          setServices(updatedServices)
          handleUpdateSubmit(id, deleteService)
        })
        }
       
        const handleUpdateSubmit = (service_id, updatedService) => {
          fetch(`http://localhost:3000/users/${user.id}/user_services/${service_id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedService),
          })
            .then(r => r.json())
            .then(savedService => {
              console.log(savedService)
              const updatedUserServices = userServices.map(service =>
                service.id === serviceId ? savedService : service
              );
              setUserServices(updatedUserServices);
            });
        };
  
  
        const servicesPosts = allServices.map((service) => (
        <div key={service.id}>
          <ServicesCardPost
            service={service}
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
                      <em>{services.name}</em>
                    </h1>
                  </div>
                </div>
                <div className="grid-container">
                  <div className="postList">
                    <div className="postGrid">
                      <ul className="forumPosts">{servicesPosts}</ul> 
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

export default ServicesCard;

