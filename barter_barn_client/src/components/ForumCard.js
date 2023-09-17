import React, {useEffect, useState, useContext} from 'react'
import PostCard from './PostCard'
// import NewUserDrawing from './NewUserDrawing'
import { useParams } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext';
// import './styles/CategoryCard.css';

const ForumCard = ({allForum, setAllForum, handleAdd}) => {
  const [forum, setForum] = useState({
    posts: [],
    comments: []
})

const [userPosts, setUserPosts] = useState([])
const [userComments, setUserComments] = useState([])


const { user } = useContext(UserContext);

const {id, userId, postId, commentId} = useParams()

const parsedUserId = parseInt(userId, 10);

useEffect(() => {
  const selectedForum = allForum.find(forum => forum.id === parseInt(id));
  if(selectedForum) {
    setForum(selectedForum)
  }
}, [allForum, id])

const handleSavePostsToUserProfile = (post) => {
  fetch(`http://localhost:3000/users/${user.id}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to save post to user profile');
      }
    })
    .then((savedPost) => {
      setUserPosts([...userPosts, savedPost]); 
      handleUpdateSubmit(savedPost); 
      console.log('Post saved to user profile:', savedPost);
    })
    .catch((error) => {
      console.error('Error saving post:', error);
    });
};

const handleDeleteClick = (user_id, post_id) => {
  fetch(`http://localhost:3000/users/${user_id}/drawings/${post_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": 'application/json'
    }
  })
  .then(() => {
    const deletePost = forum.posts.filter(p => p.id !== id)
    const updatedPosts = allForum.map( f => f.id === forum.id ? {...f, posts: deletePost} : f)
    setAllForum(updatedPosts)
    handleUpdateSubmit(id, deletePost)
  })
  }
 
  const handleUpdateSubmit = (post_id, updatedPost) => {
    fetch(`http://localhost:3000/users/${user.id}/user_posts/${post_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPost),
    })
      .then(r => r.json())
      .then(savedPost => {
        console.log(savedPost)
        const updatedUserPosts = userPosts.map(post =>
          post.id === postId ? savedPost : post
        );
        setUserPosts(updatedUserPosts);
      });
  };

const forumPosts = forum.posts.map((post) => (
  <div key={post.id}>
    <PostCard
      post={post}
      user={{ id: parsedUserId }}
      forum={forum}
      allForum={allForum}
      handleDeleteClick={handleDeleteClick}
      handleUpdateSubmit={handleUpdateSubmit}
      handleSavePostToUserProfile={handleSavePostsToUserProfile}
    />
  </div>
))

return(
  <div className="forum-container">
        <div className="forumBox">
          <div className="subTitle">
            <div className="forumName">
              <h1>
                <em>{forum.name}</em>
              </h1>
            </div>
          </div>
          <div className="grid-container">
            <div className="postList">
              <div className="postGrid">
                <ul className="forumPosts">{forumPosts}</ul> 
              </div>
            </div>
            <div className="newUserForm">
              {/* <NewUserDrawing
                categories={categories}
                setCategories={setCategories}
                category={category}
                handleAdd={handleAdd}
                user={user}
              /> */}
            </div>
          </div>
        </div>
      </div>
);
};

export default ForumCard;

