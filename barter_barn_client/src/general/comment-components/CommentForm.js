import React, { useState } from 'react';

const CommentForm = ({ handleAddComment,setIsCommentFormVisible }) => {
//   const [comment, setComment] = useState('');
  const [commentText, setCommentText] = useState('');


//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (comment.trim() === '') {
//       // Don't submit empty comments
//       return;
//     }

//     // Call the callback function to add the comment
//     handleAddComment(comment);

//     // Clear the input field
//     setComment('');
//   };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
  
    // Check if commentText is not empty
    if (commentText.trim() === '') {
      // Display an error or prevent submission
      return;
    }
  
    // Pass the commentText to the parent component
    handleAddComment(commentText);
  
    // Clear the comment text field
    setCommentText('');
  
    // Optionally, hide the comment form after submission
    setIsCommentFormVisible(false);
  };
  
  return (
    <div className="comment-form">
      <h3>Add a Comment</h3>
      <form onSubmit={handleCommentSubmit}>
  <input
    type="text"
    placeholder="Enter your comment..."
    value={commentText}
    onChange={(e) => setCommentText(e.target.value)}
  />
  <button type="submit">Submit</button>
</form>
    </div>
  );
};

export default CommentForm;
