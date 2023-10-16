import React, { useState } from 'react';

const NewUserFreeStuffs = ({ forum, allForum, setAllForum, user }) => {
  const [serviceFormData, setServiceFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    good_or_service: '',
  });

  const [errors, setErrors] = useState([]);

  const { title, description, image_url, good_or_service } = serviceFormData;

  const handleErrors = (error) => {
    setErrors([error.message]); // Assuming error.message contains the error message
  };

  const handleServiceChange = (e) => {
    const { name, value } = e.target;
    setServiceFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleNewService = (newService) => {
    const updatedForums = allForum.map((oneForum) =>
    oneForum.id === forum.id
      ? { ...oneForum,
          services: [...oneForum.services, newService],
        }
      : oneForum
  );         

  setAllForum(updatedForums);
  setServiceFormData({
    title: '',
    description: '',
    image_url: '',
    good_or_service: '',
  });
  }

  const handleSubmitService = (e) => {
    e.preventDefault();
    
    const newServiceData = {
      ...serviceFormData,
      forum_id: forum.id,
      user_id: user.id,
    };

    fetch(`http://localhost:3000/users/${user.id}/user_services`, {
      

      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newServiceData),  
    })
      .then((r) => {
        if (r.ok) {
          r.json().then((newService)=> {
            handleNewService(newService)})
            setErrors([])
        } else {
          r.json().then((err)=>setErrors(err.errors))
          setTimeout(() => {
            setErrors([null]);
          }, 3000);
        }
      })
      .catch((error) => {
        console.error('Error saving service:', error);
        setErrors('Error saving service');
       
      });
  };

  return (
    <div className='newDrawingForm'>
      <h2 className='newDrawingH2'>
        <b>N</b>&nbsp;<b>e</b>&nbsp;<b>w</b>&nbsp;&nbsp;&nbsp;<b>D</b>&nbsp;<b>r</b>&nbsp;<b>a</b>&nbsp;<b>w</b>&nbsp;<b>i</b>&nbsp;<b>n</b>&nbsp;<b>g</b>&nbsp;<b>s</b>&nbsp;
      </h2>
      <form className='form' onSubmit={handleSubmitService}>
        <input
          className='formInput'
          type='text'
          name='title'
          placeholder='title'
          value={title}
          onChange={handleServiceChange}
        />
        <input
          className='formInput'
          type='text'
          name='description'
          placeholder='description'
          value={description}
          onChange={handleServiceChange}
        />
        <input
          className='formInput'
          type='text'
          name='image_url'
          placeholder='image_url'
          value={image_url}
          onChange={handleServiceChange}
        />
        <input
          className='formInput'
          type='text'
          name='good_or_service'
          placeholder='good_or_service'
          value={good_or_service}
          onChange={handleServiceChange}
        />
        <button className='formButton' type='submit'>
          ADD
        </button>
        {errors.length > 0 && (
            <div className="error-messages">
              {errors.map((error, index) => (
                <p key={index} className="error-message">
                  {error}
                </p>
              ))}
            </div>
          )}
      </form>
    </div>
  );
};

export default NewUserFreeStuffs;
