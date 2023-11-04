import React, { useState,useEffect } from 'react';
// import SharedImageForm from '../../SharedImageForm';

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
    forum_id: ''
  });

  const [freeStuffData, setFreeStuffData] = useState({
    body: '',
    forum_id: ''

  });
const [users, setUsers] = useState([])
const [freeStuffs, setFreeStuffs] = useState([])
const [imageData, setImageData] = useState(null);

  const [errors, setErrors] = useState([]);

  const { title, description, good_or_service } = goodFormData;
  const { body } = freeStuffData;

  useEffect(() => {
    fetch(`/users`)
    .then(res => res.json())
    .then(data => setUsers(data))
  }, [])
// console.log(users)
  useEffect(() => {
    fetch(`/free_stuffs`)
    .then(res => res.json())
    .then(data => setFreeStuffs(data))
  }, [])

  // console.log(freeStuffs)

  const handleErrors = (error) => {
    setErrors([error.message]); 
  };

  // const handleImageChange = (imageData) => {
  //   setGoodFormData({ ...goodFormData, main_image: imageData });
  //   setFreeStuffData({ ...freeStuffData, main_image: imageData });
  //   console.log(imageData)
  // };

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


    const formData = new FormData();
    formData.append('user_id', users[0].id);
    formData.append('forum_id', forum.id);
    formData.append('title', goodFormData.title);
    formData.append('description', goodFormData.description);
    formData.append('good_or_service', goodFormData.good_or_service);
    formData.append('main_image', imageData);
  

    fetch(`http://localhost:3000/goods`, {
      method: 'POST',
      body: JSON.stringify(formData),
    const newGoodData = {
      ...goodFormData,
      forum_id: forum.id,
      user_id: user.id,
      main_image: imageData,
    };

    fetch(`http://localhost:3000/goods`, {
      method: 'POST',
    const newGoodData = {
      ...goodFormData,
      forum_id: forum.id,
      user_id: user.id,
      main_image: imageData,
    };

    fetch(`http://localhost:3000/goods`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newGoodData),

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



  const clearImageData = () => {
    setImageData(null);
    // handleImageChange('');
  };

  // console.log(imageData)

  const handleSubmitStuff = (e) => {
    e.preventDefault();
    // const newFreeStuffData = {
    //   ...freeStuffData,
    //   forum_id: forum.id,
    //   user_id: user.id,
    //   main_image: imageData,
    // };
    
    const formData = new FormData();
    formData.append('user_id', users[0].id);
    formData.append('forum_id', forum.id);
    formData.append('body', freeStuffData.body);
    formData.append('main_image', imageData);
  // console.log(formData)

    fetch(`/free_stuffs`, {
      method: 'POST',
      body: formData, 
    })
      .then((r) => {
        if (r.ok) {
          r.json().then((newStuff) => {
            handleNewFreeStuff(newStuff);
            // console.log(newStuff)
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
  
  // console.log(imageData)

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

            <div className="form-group">
                <label> Image:</label>
                <input type="file"                  
                accept="image/jpeg, image/png, image/webp" 
                onChange={(e) => setImageData(e.target.files[0])} />
                {imageData && (
                  <div>
                    <img src={imageData} alt="Preview" className='imageThumb' />
                    <button onClick={clearImageData}>Clear Image</button>
                  </div>
                )}
              </div>

            {/* <SharedImageForm handleImageChange={handleImageChange} imageData={imageData} setImageData={setImageData}/> */}
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
            <div className="form-group">
                <label> Image:</label>
                <input type="file"                  
                accept="image/jpeg, image/png, image/webp" 
                onChange={(e) => setImageData(e.target.files[0])} />
                {imageData && (
                  <div>
<<<<<<< HEAD
<<<<<<< HEAD
                    <img src={imageData} alt="Preview" className='imageThumb' />
=======
                    <img src={imageData} alt="Preview" />
>>>>>>> parent of 5a38c15 (commit saturday morning)
=======
                    <img src={imageData} alt="Preview" />
>>>>>>> parent of 5a38c15 (commit saturday morning)
                    <button onClick={clearImageData}>Clear Image</button>
                  </div>
                )}
              </div>
             
           
            {/* <SharedImageForm handleImageChange={handleImageChange} imageData={imageData} setImageData={setImageData} /> */}
            {/* {freeStuffData.main_image && ( 
              <img src={freeStuffData.main_image} alt="Image Preview" />
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
