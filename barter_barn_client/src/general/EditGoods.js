import React, { useState } from 'react';

function EditGoods({  user, good, handleUpdateUserGoods, isEditFormVisible, setIsEditFormVisible }) {
  const [goodBody, setGoodBody] = useState({
        title: good.title,
        description: good.description,
        image_url: good.image_url,
        good_or_service: good.good_or_service,
       good_id: good.good_id,
       forum_id: good.forum_id
    })
   console.log(user)
    const {title, description, image_url, good_or_service} = goodBody;

    const handleGoodChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        setGoodBody({...goodBody, [name]:value})
      }
 
    const handleSubmitEdit = (e) => {
      e.preventDefault();
      let good_id = good.id;
      let user_id = user.id;

      fetch(`http://localhost:3000/users/${user_id}/user_goods/${good_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(goodBody),
      })
        .then((response) => response.json())
        .then((updatedGood) => {
          console.log(updatedGood)
          handleUpdateUserGoods(updatedGood);
          setIsEditFormVisible(!isEditFormVisible);
        })
        .catch((error) => {
          console.error("Error updating good:", error);
        });
    };

  return (

    <form className='newPostForm' onSubmit={handleSubmitEdit}>
      <input
      className='formInput'
        type="text"
        name='title'
        value={title}
        onChange={handleGoodChange}
        placeholder="Enter title..."
      />
       <input
       className='formInput'
        type="text"
        name='description'
        value={description}
        onChange={handleGoodChange}
        placeholder="Enter description..."
      />
      <input
       className='formInput'
        type="text"
        name='image_url'
        value={image_url}
        onChange={handleGoodChange}
        placeholder="Enter image url..."
      />
      <input
       className='formInput'
        type="text"
        name='good_or_service'
        value={good_or_service}
        onChange={handleGoodChange}
        placeholder="Enter good or service..."
      />
      <button className='formButton' type="submit">UPDATE</button>
    </form> 
);
};

export default EditGoods;

