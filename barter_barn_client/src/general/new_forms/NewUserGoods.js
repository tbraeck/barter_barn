import React, { useState,useEffect } from 'react';
// import SharedImageForm from '../../SharedImageForm';

const NewUserGoods = ({
  forum,
  allForum,
  setAllForum,
}) => {
  const [goodFormData, setGoodFormData] = useState({
    title: '',
    description: '',
    good_or_service: '',
    forum_id: forum.id
  });

  const [serviceFormData, setServiceFormData] = useState({
    title: '',
    description: '',
    good_or_service: '',
    forum_id: forum.id
  });

  const [freeStuffData, setFreeStuffData] = useState({
    body: '',
    claimant_id: '',
    forum_id: forum.id
  });

const [users, setUsers] = useState([])
const [freeStuffs, setFreeStuffs] = useState([])
const [someGoods, setSomeGoods] = useState([])
const [someServices, setSomeServices] = useState([])
const [imageData, setImageData] = useState(null);

  const [errors, setErrors] = useState([]);

  const { title: goodTitle, description: goodDescription, good_or_service: goodOrService } = goodFormData
  const { title: serviceTitle, description: serviceDescription, good_or_service: serviceOrService } = serviceFormData;
  const { body: freeStuffBody, claimant_id: freeStuffClaimantId  } = freeStuffData;

  useEffect(() => {
    fetch(`/users`)
    .then(res => res.json())
    .then(data => setUsers(data))

    fetch(`/free_stuffs`)
    .then(res => res.json())
    .then(data => setFreeStuffs(data))

    fetch(`/goods`)
    .then(res => res.json())
    .then(data => setSomeGoods(data))

    fetch(`/services`)
    .then(res => res.json())
    .then(data => setSomeServices(data))
  }, [])


  const handleGoodChange = (e) => {
    const { name, value } = e.target;
    setGoodFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleServiceChange = (e) => {
    const { name, value } = e.target;
    setServiceFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFreeStuffChange = (e) => {
    const { name, value } = e.target;
    setFreeStuffData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleNewGood = (newGood) => {
    const updatedForums = allForum.map((oneForum) =>
      oneForum.id === forum.id
        ? {
            ...oneForum,
            goods: [...oneForum.goods, newGood],
          }
        : oneForum
    );

    setAllForum(updatedForums);
    setGoodFormData({
      title: '',
      description: '',
      good_or_service: 'Good',
    });
  };

const handleNewService = (newService) => {
    const updatedForums = allForum.map((oneForum) =>
      oneForum.id === forum.id
        ? {
            ...oneForum,
            services: [...oneForum.services, newService],
          }
        : oneForum
    );

    setAllForum(updatedForums);
    setServiceFormData({
      title: '',
      description: '',
      good_or_service: 'Service',
    });
  };

  const handleNewFreeStuff = (newStuff) => {
    const updatedForums = allForum.map((oneForum) =>
      oneForum.id === forum.id  
        ? {
            ...oneForum,
            free_stuffs: [...oneForum.free_stuffs, newStuff],
          }
        : oneForum
    );

    setAllForum(updatedForums);
    setFreeStuffData({
      body: '',
      claimant_id: ''
    });
  };

  const handleSubmitGood = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('user_id', users[0].id);
    formData.append('forum_id', forum.id);
    formData.append('title', goodTitle);
    formData.append('description', goodDescription);
    formData.append('good_or_service', goodOrService);
    formData.append('main_image', imageData);
  
    fetch(`/goods`, {
      method: 'POST',
      body: (formData),
    })

      .then((r) => {
        if (r.ok) {
          r.json().then((newGood) => {
            handleNewGood(newGood);
          });
          setErrors([]);
        } else {
          r.json().then((err) => setErrors(err.errors));
          setTimeout(() => {
            setErrors([null]);
          }, 3000);
        }
      })
      .catch((error) => {
        console.error('Error saving good:', error);
        setErrors(['Error saving good']);
      });
  };

  const handleSubmitService = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('user_id', users[0].id);
    formData.append('forum_id', forum.id);
    formData.append('title', serviceTitle);
    formData.append('description', serviceDescription);
    formData.append('good_or_service', serviceOrService);
    formData.append('main_image', imageData);
  
    fetch(`/services`, {
      method: 'POST',
      body: (formData),
    })
      .then((r) => {
        if (r.ok) {
          r.json().then((newService) => {
            handleNewService(newService);
          });
          setErrors([]);
        } else {
          r.json().then((err) => setErrors(err.errors));
          setTimeout(() => {
            setErrors([null]);
          }, 3000);
        }
      })
      .catch((error) => {
        console.error('Error saving service:', error);
        setErrors(['Error saving service']);
      });
  };

  const clearImageData = () => {
    setImageData(null);
  };

  const handleSubmitStuff = (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('user_id', users[0].id);
    formData.append('forum_id', forum.id);
    formData.append('body', freeStuffBody);
    formData.append('claimant_id', freeStuffClaimantId )
    formData.append('main_image', imageData);

    fetch(`/free_stuffs`, {
      method: 'POST',
      body: (formData), 
    })
      .then((r) => {
        if (r.ok) {
          r.json().then((newStuff) => {
            handleNewFreeStuff(newStuff);
            });
          setErrors([]);
        } else {
          r.json().then((err) => setErrors(err.errors));
          setTimeout(() => {
            setErrors([null]);
          }, 3000);
        }
      })
      .catch((error) => {
        console.error('Error saving stuff:', error);
        setErrors(['Error saving stuff']);
      });
  };

  return (
    <div>
      {forum.id === 1  ? (
        <div className='newDrawingForm'>
          <h2 className='newDrawingH2'>
            <b>New Goods</b>
          </h2>
          <form className='form' onSubmit={handleSubmitGood}>
            <div className='form-field'>
              <label htmlFor='title'>Title:</label>
              <input
                className='formInput'
                type='text'
                name='title'
                value={goodTitle}
                onChange={handleGoodChange}
                required
              />
            </div>
            <div className='form-field'>
              <label htmlFor='description'>Description:</label>
              <input
                className='formInput'
                type='text'
                name='description'
                value={goodDescription}
                onChange={handleGoodChange}
                required
              />
            </div>
            <div className='form-field'>
              <label htmlFor='good_or_service'>Good or Service:</label>
              <input
                className='formInput'
                type='text'
                name='good_or_service'
                value={goodOrService}
                onChange={handleGoodChange}
                required
              />
            </div>
            <div className="form-group">
                <label> Image:</label>
                <input type="file"                  
                accept="image/jpeg, image/png, image/webp" 
                onChange={(e) => setImageData(e.target.files[0])} />
                {imageData && (
                  <div>
                      <img src={imageData ? URL.createObjectURL(imageData) : ''} alt="Preview" className='imageThumb' />
                    <button onClick={clearImageData}>Clear Image</button>
                  </div>
                )}
              </div>
            <button className='formButton' type='submit'>
              ADD
            </button>
            {errors &&  (
              <div className='error-messages'>
                {errors.map((error, index) => (
                  <p key={index} className='error-message'>
                    {error}
                  </p>
                ))}
              </div>
            )}
          </form>
        </div>
      ) : null }

       {forum.id === 2 ? (
        <div className='newDrawingForm'>
          <h2 className='newDrawingH2'>
            <b>New Services</b>
          </h2>
          <form className='form' onSubmit={handleSubmitService}>
            <div className='form-field'>
              <label htmlFor='title'>Title:</label>
              <input
                className='formInput'
                type='text'
                name='title'
                value={serviceTitle}
                onChange={handleServiceChange}
                required
              />
               
            </div>
            <div className='form-field'>
              <label htmlFor='description'>Description:</label>
              <input
                className='formInput'
                type='text'
                name='description'
                value={serviceDescription}
                onChange={handleServiceChange}
                required
              />
            </div>
            
            <div className='form-field'>
              <label htmlFor='good_or_service'>Good or Service:</label>
              <input
                className='formInput'
                type='text'
                name='good_or_service'
                value={serviceOrService}
                onChange={handleServiceChange}
                required
              />
            </div>

            <div className="form-group">
                <label> Image:</label>
                <input type="file"                  
                accept="image/jpeg, image/png, image/webp" 
                onChange={(e) => setImageData(e.target.files[0])} />
                {imageData && (
                  <div>
                      <img src={imageData ? URL.createObjectURL(imageData) : ''} alt="Preview" className='imageThumb' />
                    <button onClick={clearImageData}>Clear Image</button>
                  </div>
                )}
              </div>
            <button className='formButton' type='submit'>
              ADD
            </button>
            {errors && (
              <div className='error-messages'>
                {errors.map((error, index) => (
                  <p key={index} className='error-message'>
                    {error}
                  </p>
                ))}
              </div>
            )}
          </form>
        </div>
      ) : null }

        {forum.id === 3 ? (
        <div className='newDrawingForm'>
          <h2 className='newDrawingH2'>
            <b>New Stuff</b>
          </h2>
          <form className='form' onSubmit={handleSubmitStuff}>
            <div className='form-field'>
              <label htmlFor='body'>Body:</label>
              <input
                className='formInput'
                type='text'
                name='body'
                value={freeStuffBody}
                onChange={handleFreeStuffChange}
                required
              />
            </div>
            <div className="form-group">
                <label> Image:</label>
                <input type="file"                  
                accept="image/jpeg, image/png, image/webp" 
                onChange={(e) => setImageData(e.target.files[0])} />
                {imageData && (
                  <div>
                      <img src={imageData ? URL.createObjectURL(imageData) : ''} alt="Preview" className='imageThumb' />
                    <button onClick={clearImageData}>Clear Image</button>
                  </div>
                )}
              </div>
            <button className='formButton' type='submit'>
              ADD
            </button>
            {errors && (
              <div className='error-messages'>
                {errors.map((error, index) => (
                  <p key={index} className='error-message'>
                    {error}
                  </p>
                ))}
              </div>
            )}
         </form>
        </div>
      ) : null }
    </div>
  );
};

export default NewUserGoods;
