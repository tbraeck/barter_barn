import React, { useState } from 'react';

const NewUserGoods = ({ forum, allForum, setAllForum, user }) => {
  const [goodFormData, setGoodFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    good_or_service: '',
  });

  const [errors, setErrors] = useState([]);

  const { title, description, image_url, good_or_service } = goodFormData;

  const handleErrors = (error) => {
    setErrors([error.message]); // Assuming error.message contains the error message
  };

  const handleGoodChange = (e) => {
    const { name, value } = e.target;
    setGoodFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleNewGood = (newGood) => {
    const updatedForums = allForum.map((oneForum) =>
    oneForum.id === forum.id
      ? { ...oneForum,
          goods: [...oneForum.goods, newGood],
        }
      : oneForum
  );          console.log(newGood)

  setAllForum(updatedForums);
  setGoodFormData({
    title: '',
    description: '',
    image_url: '',
    good_or_service: '',
  });
  }

  const handleSubmitGood = (e) => {
    e.preventDefault();
    
    const newGoodData = {
      ...goodFormData,
      forum_id: forum.id,
      user_id: user.id,
    };

    fetch(`http://localhost:3000/users/${user.id}/user_goods`, {
      

      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newGoodData),  
    })
      .then((r) => {
        if (r.ok) {
          r.json().then((newGood)=> {
            console.log(newGood)
            handleNewGood(newGood)})
            setErrors([])
           
        } else {
          r.json().then((err)=>setErrors(err.errors))
          setTimeout(() => {
            setErrors([null]);
          }, 3000);
        }
      })
      .catch((error) => {
        console.error('Error saving good:', error);
        setErrors('Error saving good');
       
      });
  };

  return (
    <div className='newDrawingForm'>
      <h2 className='newDrawingH2'>
        <b>N</b>&nbsp;<b>e</b>&nbsp;<b>w</b>&nbsp;&nbsp;&nbsp;<b>G</b>&nbsp;<b>o</b>&nbsp;<b>o</b>&nbsp;<b>d</b>&nbsp;<b>s</b>&nbsp;&nbsp;&nbsp;<b>a</b>&nbsp;<b>n</b>&nbsp;<b>d</b>&nbsp;&nbsp;&nbsp;<b>S</b>&nbsp;<b>e</b>&nbsp;<b>r</b>&nbsp;<b>v</b>&nbsp;<b>i</b>&nbsp;<b>c</b>&nbsp;<b>e</b>&nbsp;<b>s</b>&nbsp;
      </h2>
      <form className='form' onSubmit={handleSubmitGood}>
        <input
          className='formInput'
          type='text'
          name='title'
          placeholder='title'
          value={title}
          onChange={handleGoodChange}
        />
        <input
          className='formInput'
          type='text'
          name='description'
          placeholder='description'
          value={description}
          onChange={handleGoodChange}
        />
        <input
          className='formInput'
          type='text'
          name='image_url'
          placeholder='image_url'
          value={image_url}
          onChange={handleGoodChange}
        />
        <input
          className='formInput'
          type='text'
          name='good_or_service'
          placeholder='good_or_service'
          value={good_or_service}
          onChange={handleGoodChange}
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

export default NewUserGoods;
