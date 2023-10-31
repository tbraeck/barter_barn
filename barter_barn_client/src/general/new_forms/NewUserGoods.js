import React, { useState } from 'react';
import SharedImageForm from '../../SharedImageForm';

const NewUserGoods = ({
  forum,
  allForum,
  setAllForum,
  user,
  handleAddGood,
  handleAddService,
  handleAddFreeStuffs,
}) => {
  const [goodFormData, setGoodFormData] = useState({
    title: '',
    description: '',
    good_or_service: '',
    main_image: (null)
  });

  const [freeStuffData, setFreeStuffData] = useState({
    body: '',
    main_image:  (null)
  });

  const [imageData, setImageData] = useState(null);

  const [errors, setErrors] = useState([]);

  const { title, description, good_or_service } = goodFormData;
  const { body } = freeStuffData;

  const handleErrors = (error) => {
    setErrors([error.message]); // Assuming error.message contains the error message
  };

  const handleImageChange = (imageData) => {
    // Update the image_url in the state
    setGoodFormData({ ...goodFormData, main_image: imageData });
    setFreeStuffData({ ...freeStuffData, main_image: imageData });
  };

  const handleGoodChange = (e) => {
    const { name, value } = e.target;
    setGoodFormData((prevData) => ({ ...prevData, [name]: value }));
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
      good_or_service: '',
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
    });
  };

  const handleSubmitGood = (e) => {
    e.preventDefault();

    const newGoodData = {
      ...goodFormData,
      forum_id: forum.id,
      user_id: user.id,
      main_image: goodFormData.main_image,
    };

    fetch(`http://localhost:3000/goods`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newGoodData),
    })
      .then((r) => {
        if (r.ok) {
          r.json().then((newGood) => {
            // console.log(newGood);
            handleNewGood(newGood);
          });
          setErrors([]);
        } else {
          r.json().then((err) => setErrors(err.errors));
          setTimeout(() => {
            setErrors([]);
          }, 3000);
        }
      })
      .catch((error) => {
        console.error('Error saving good:', error);
        setErrors(['Error saving good']);
      });
  };

  const handleSubmitStuff = (e) => {
    e.preventDefault();

    const newStuffData = {
      ...freeStuffData,
      forum_id: forum.id,
      user_id: user.id,
      main_image: freeStuffData.main_image

    };

    fetch(`http://localhost:3000/free_stuffs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newStuffData),
    })
      .then((r) => {
        if (r.ok) {
          r.json().then((newStuff) => {
            // console.log(newStuff);
            handleNewFreeStuff(newStuff);
          });
          setErrors([]);
        } else {
          r.json().then((err) => setErrors(err.errors));
          setTimeout(() => {
            setErrors([]);
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
      {forum.id === 1 || forum.id === 2 ? (
        <div className='newDrawingForm'>
          <h2 className='newDrawingH2'>
            <b>New Goods and Services</b>
          </h2>
          <form className='form' onSubmit={handleSubmitGood}>
            <div className='form-field'>
              <label htmlFor='title'>Title:</label>
              <input
                className='formInput'
                type='text'
                name='title'
                value={title}
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
                value={description}
                onChange={handleGoodChange}
                required
              />
            </div>
            {/* <div className='form-field'>
              <label htmlFor='image_url'>Image URL:</label>
              <input
                className='formInput'
                type='text'
                name='image_url'
                value={image_url}
                onChange={handleGoodChange}
                required
              />
            </div> */}
            <div className='form-field'>
              <label htmlFor='good_or_service'>Good or Service:</label>
              <input
                className='formInput'
                type='text'
                name='good_or_service'
                value={good_or_service}
                onChange={handleGoodChange}
                required
              />
            </div>
            <SharedImageForm handleImageChange={handleImageChange} imageData={imageData} setImageData={setImageData}/>
            {goodFormData.image_url && ( 
              <img src={goodFormData.image_url} alt="Image Preview" />
            )}
            <button className='formButton' type='submit'>
              ADD
            </button>

            {errors && errors.length > 0 && (
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
      ) : (
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
                value={body}
                onChange={handleFreeStuffChange}
                required
              />
            </div>
            {/* <div className='form-field'>
              <label htmlFor='image_url'>Image URL:</label>
              <input
                className='formInput'
                type='text'
                name='image_url'
                value={stuffImageUrl}
                onChange={handleFreeStuffChange}
                required
              />
            </div> */}
           
            <SharedImageForm handleImageChange={handleImageChange} imageData={imageData} setImageData={setImageData} />
            {/* {freeStuffData.image_url && ( // Display image preview
              <img src={freeStuffData.image_url} alt="Image Preview" />
            )} */}
            <button className='formButton' type='submit'>
              ADD
            </button>
            {errors && errors.length > 0 && (
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
      )}
    </div>
  );
};

export default NewUserGoods;
