import React, { useState } from 'react';

function EditComments({  user, comment, handleUpdateUserPosts, isEditFormVisible, setIsEditFormVisible }) {
  const [commentBody, setCommentBody] = useState({
        name: comment.name,
        contactInfo: comment.contact_info,
        commentText: comment.comment_text,
        availableTimes: comment.available_times,
       comment_id: comment.comment_id
    
    })
   
    const {name, contactInfo, commentText, availableTimes} = commentBody;

    const handleCommentChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        setPostBody({...postBody, [name]:value})
      }
 
    const handleSubmitEdit = (e) => {
      e.preventDefault();
      let post_id = post.id;
      let user_id = user.id;

      fetch(`http://localhost:3000/users/${user_id}/user_posts/${post_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postBody),
      })
        .then((response) => response.json())
        .then((updatedPost) => {
          console.log(updatedPost)
          handleUpdateUserPosts(updatedPost);
          setIsEditFormVisible(!isEditFormVisible);
        })
        .catch((error) => {
          console.error("Error updating post:", error);
        });
    };

  return (

    <form className='newPostForm' onSubmit={handleSubmitEdit}>
      <input
      className='formInput'
        type="text"
        name='title'
        value={title}
        onChange={handlePostChange}
        placeholder="Enter title..."
      />
       <input
       className='formInput'
        type="text"
        name='body'
        value={body}
        onChange={handlePostChange}
        placeholder="Enter body..."
      />
      <button className='formButton' type="submit">UPDATE</button>
    </form> 
);
};

export default EditComments;

