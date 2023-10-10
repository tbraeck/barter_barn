// Comments.js

import React, { useState, useEffect } from 'react';

const Comments = ({ good, user, isUserProfile }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    // Fetch comments for the good when the component mounts
    fetch(`/users/goods/${good.id}/comments`)
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
  }, [good.id]);

  const handleSubmitComment = (e) => {
    e.preventDefault();

    if (user) {
      fetch(`//goods/${good.id}/comments`, {
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

export default Comments;
