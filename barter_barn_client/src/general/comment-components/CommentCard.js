import React, { useState, useEffect } from 'react';


const CommentCard = ({ comment, user, allForum, userComments, setUserComments, handleUpdateSubmitComment, handleUpdateUserComments, handleDeleteClickComment, handleSaveCommentToUserProfile, isUserProfile }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    // Fetch comments for the good when the component mounts
    fetch(`/users/${user.id}/comments`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.error('Failed to fetch comments');
          throw new Error('Failed to fetch comments');
        }
      })
      .then((data) => {
        setComments(data.comments);
      })
      .catch((error) => {
        console.error('Error fetching comments:', error);
      });
  }, [comment.id]);

  const handleSubmitComment = (e) => {
    e.preventDefault();

    if (user) {
      fetch(`/${comment.id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment: newComment }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            console.error('Failed to save comment');
            throw new Error('Failed to save comment');
          }
        })
        .then((savedComment) => {
          // Update the comments state with the new comment
          setComments([...comments, savedComment.comment]);
          // Clear the newComment field
          setNewComment('');
        })
        .catch((error) => {
          console.error('Error saving comment:', error);
        });
    }
  };

  const commentItems = comments.map((comment, index) => (
    <div key={index} className="comment">
      {comment}
    </div>
  ));

  return (
    <div className="comments">
      <h3>Comments:</h3>
      {commentItems}
      
      {isUserProfile && (
        <form onSubmit={handleSubmitComment}>
          <textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            required
          />
          <button type="submit">Submit Comment</button>
        </form>
      )}
    </div>
  );
};

export default CommentCard;


// import React, { useState } from 'react';
// import EditGoods from '../editing-components/EditGoods';

// const GoodsCard = ({ good, user, allForum, userGoods, setUserGoods, isUserProfile, handleUpdateSubmitGood, handleUpdateUserGoods, handleDeleteClickGood, handleSaveGoodToUserProfile }) => {
//   const [isEditFormVisible, setIsEditFormVisible] = useState(false);
//   const [isSaved, setIsSaved] = useState(false);
//   const [isCommentFormVisible, setIsCommentFormVisible] = useState(false);
//   const [errors, setErrors] = useState([]);
//   const [commentData, setCommentData] = useState({
//     name: '',
//     commentText: '',
//     contactInfo: '',
//     availableTimes: '',
//   });

//   if (!good || !good.title) {
//     return <div>Loading...</div>;
//   }


//   const { title, description, image_url, good_or_service } = good;

//   const timeOptions = [
//     'Morning (9:00 AM - 12:00 PM)',
//     'Afternoon (12:00 PM - 3:00 PM)',
//     'Evening (3:00 PM - 6:00 PM)',
//     'Night (6:00 PM - 9:00 PM)',
//   ];

//   const handleShowEditForm = () => {
//     if (isUserProfile) {
//       setErrors(["You can only edit goods in your profile."]);
//       return;
//     }
//     setIsEditFormVisible(true);
//   };

//   const handleSaveGood = () => {
//     const saveResult = handleSaveGoodToUserProfile(good);
//     if (saveResult.success) {
//       setIsSaved(true);
//       setErrors([]);
//       console.log(good)

//     } else {
//       setErrors([saveResult.message]);
//     }
//   };

//   const handleDelete = (good) => {
//     if (isUserProfile) {
//       setErrors(["You can only delete goods in your profile."]);
//       return;
//     }
//     handleDeleteClickGood(good.id);
//   };

//   const handleCommentButtonClick = () => {
//     setIsCommentFormVisible(true);
//   };


//   const handleCommentSubmit = (e) => {
//     e.preventDefault();
//     // Handle comment submission logic here, e.g., sending data to the server
//     // You can access the comment data in the commentData state
//     // Reset the comment form and hide it when done
//     window.alert('Comment has been saved to your profile!');

//     setIsCommentFormVisible(false);
//     setCommentData({
//       name: '',
//       contactInfo: '',
//       availableTimes: '',
//     });
//   };

//   return (
//     <div className='goodEdit' onDoubleClick={() => setIsEditFormVisible((isEditFormVisible)=>!isEditFormVisible)}>
//       {isEditFormVisible ? 
//         <EditGoods
//           user={user}
//           allForum={allForum}
//           good={good}
//           handleShowEditForm={handleShowEditForm}
//          userGoods={userGoods}
//          setUserGoods={setUserGoods}
//           handleUpdateSubmitGood={handleUpdateSubmitGood}
//           isEditFormVisible={isEditFormVisible}
//           setIsEditFormVisible={setIsEditFormVisible}
//           handleUpdateUserGoods={handleUpdateUserGoods}
//         />
//        : (
//         <div className="goodCardContainer">
//           <div className='goodCard'>
//             <h2 className='goodTitle'>{title}</h2>
//             <p className='goodDescription'>{description}</p>
//             <p className='goodInfo'><strong>Image URL:</strong>{image_url}</p>
//             <p className='goodInfo'><strong>Service needed:</strong> {good_or_service}</p>
//             <div className='buttonContainer'>
//             {isUserProfile && (
//                 <button onClick={handleSaveGood} className='crudButton saveButton'>
//                   SAVE
//                 </button>
//               )}
//                 {isSaved && <p>Item has been saved to your profile!</p>}

//               {!isUserProfile && (
//                   <>
//                     <button onClick={handleDelete} className='crudButton deleteButton'>
//                       DELETE
//                     </button>
//                     <button onClick={handleShowEditForm} className='crudButton editButton'>
//                       EDIT
//                     </button>
//                   </>
//                 )}
//                  {isUserProfile && (
//                 <button onClick={handleCommentButtonClick} className='crudButton commentButton'>
//                   COMMENT
//                 </button>
//               )}
//             </div>
//             {isSaved && <p className='saveMessage'>Item has been saved to your profile!</p>}
//             {errors.length > 0 && (
//               <div className="error-messages">
//                 {errors.map((error, index) => (
//                   <p key={index} className="error-message">
//                     {error}
//                   </p>
//                 ))}
//               </div>
//             )}
//             {isCommentFormVisible && (
//               <form onSubmit={handleCommentSubmit} className='commentForm'>
//                 <h3 className='commentTitle'>Leave a Comment</h3>
//                 <div className='formField'>
//                   <label htmlFor='name'>Name:</label>
//                   <input
//                     type='text'
//                     id='name'
//                     name='name'
//                     value={commentData.name}
//                     onChange={(e) => setCommentData({ ...commentData, name: e.target.value })}
//                     required
//                   />
//                 </div>
//                 <div className='formField'>
//                   <label htmlFor='contactInfo'>Comment or Question:</label>
//                   <input
//                     type='text'
//                     id='commentInfo'
//                     name='commentInfo'
//                     value={commentData.commentText}
//                     onChange={(e) => setCommentData({ ...commentData, commentText: e.target.value })}
//                     required
//                   />
//                 </div>
//                 <div className='formField'>
//                   <label htmlFor='contactInfo'>Contact Information:</label>
//                   <input
//                     type='text'
//                     id='contactInfo'
//                     name='contactInfo'
//                     value={commentData.contactInfo}
//                     onChange={(e) => setCommentData({ ...commentData, contactInfo: e.target.value })}
//                     required
//                   />
//                 </div>
//                 <div className='formField'>
//                     <label htmlFor='availableTimes'>Available Times:</label>
//                     <select
//                       id='availableTimes'
//                       name='availableTimes'
//                       value={commentData.availableTimes}
//                       onChange={(e) => setCommentData({ ...commentData, availableTimes: e.target.value })}
//                       required
//                     >
//                       <option value=''>Select a time...</option>
//                       {timeOptions.map((time, index) => (
//                         <option key={index} value={time}>
//                           {time}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <button type="submit" className='crudButton submitButton'>Submit Comment</button>
//                   {isSaved && <p className='saveMessage'>Comment has been saved to your profile!</p>}

//               </form>
//             )}
            
//           </div>
//         </div>
//       )}

//     </div>
//   );
// };

// export default GoodsCard;
