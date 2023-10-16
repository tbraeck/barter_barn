import React, { useState } from 'react';

function EditServices({  user, service, handleUpdateUserServices, isEditFormVisible, setIsEditFormVisible }) {
  const [serviceBody, setServiceBody] = useState({
        title: service.title,
        description: service.description,
        image_url: service.image_url,
        good_or_service: service.good_or_service,
     service_id: service.service_id
    })
    const [errors, setErrors] = useState([]);

    const {title, description, image_url, good_or_service} = serviceBody;

    const handleServiceChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        setServiceBody({...serviceBody, [name]:value})
      }
 
    const handleSubmitEdit = (e) => {
      e.preventDefault();
      let service_id = service.id;
      let user_id = user.id;

      fetch(`http://localhost:3000/users/${user_id}/user_services/${service_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(serviceBody),
      })
        .then((response) => response.json())
        .then((updatedService) => {
          console.log(updatedService)
          handleUpdateUserServices(updatedService);
          setIsEditFormVisible(!isEditFormVisible);
        })
        .catch((error) => {
          console.error("Error updating service:", error);
        });
    };

  return (
    <form className='newPostForm' onSubmit={handleSubmitEdit}>

    <input
      className='formInput'
        type="text"
        name='title'
        value={title}
        onChange={handleServiceChange}
        placeholder="Enter title..."
      />
       <input
       className='formInput'
        type="text"
        name='description'
        value={description}
        onChange={handleServiceChange}
        placeholder="Enter description..."
      />
      <input
       className='formInput'
        type="text"
        name='image_url'
        value={image_url}
        onChange={handleServiceChange}
        placeholder="Enter image url..."
      />
      <input
       className='formInput'
        type="text"
        name='good_or_service'
        value={good_or_service}
        onChange={handleServiceChange}
        placeholder="Enter good or service..."
      />
      <button className='formButton' type="submit">UPDATE</button>
      {errors && (
          <div className="error-messages">
            {errors.map((error, index) => (
              <p key={index} className="error-message">
                {error}
              </p>
            ))}
          </div>
        )}
    </form> 
);
};

export default EditServices;

