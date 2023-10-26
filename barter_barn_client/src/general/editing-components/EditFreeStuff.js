import React, { useState } from 'react';

function EditFreeStuffs({  user, stuff, handleUpdateUserFreeStuffs, isEditFormVisible, setIsEditFormVisible }) {
  const [stuffBody, setStuffBody] = useState({
        body: stuff.body,
        image_url: stuff.image_url,
        stuff_id: stuff.stuff_id
    })

    const [errors, setErrors] = useState([]);
    
    const {body, image_url} = stuffBody;

    const handleStuffChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        setStuffBody({...stuffBody, [name]:value})
      }
 
    const handleSubmitEdit = (e) => {
      e.preventDefault();
      let free_stuff_id = stuff.id;
      let user_id = user.id;

      fetch(`http://localhost:3000/users/${user_id}/user_free_stuffs/${free_stuff_id}`, {
      method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(stuffBody),
      })
      .then((r) => {
        if (r.ok) {
          r.json().then((updatedStuff) => {
            console.log(updatedStuff)

            handleUpdateUserFreeStuffs(updatedStuff);
            setIsEditFormVisible(!isEditFormVisible);
          });
        } else {
          return r.json().then((error) => {
            console.error('Error response from server:', error);
            setErrors(error.errors);
            setTimeout(() => {
              setErrors(null);
            }, 3000);
          });
        }
      });
    };

  return (

    <form className='newPostForm' onSubmit={handleSubmitEdit}>
      <input
      className='formInput'
        type="text"
        name='body'
        value={body}
        onChange={handleStuffChange}
        placeholder="Enter body..."
      />
      <input
       className='formInput'
        type="text"
        name='image_url'
        value={image_url}
        onChange={handleStuffChange}
        placeholder="Enter image url..."
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

export default EditFreeStuffs;

