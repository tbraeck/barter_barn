import React from 'react';
import UserComments from './UserComments';
import UserGoods from './UserGoods';
import UserSavedPosts from './UserSavedPosts';
import { useParams } from 'react-router-dom';

// import './styles/UserProfile.css';

const UserProfile = ({ user, handleSaveGood, handleSavePost, handleSaveComment}) => {
  const {user_id} = useParams();

  return (
    <div className="userProfile">
        <h1 className='userNameTitle'> {user.username}'s Comments</h1>
        <UserComments user={user} user_id={user_id}  handleSaveComment={handleSaveComment}  />
        <h1 className='userNameTitle'> {user.username}'s Comments</h1>
        <UserSavedPosts user={user} user_id={user_id}  handleSavePost={handleSavePost}  />
        <h1 className='userNameTitle'> {user.username}'s Comments</h1>

        <UserGoods user={user} user_id={user_id}  handleSaveGood={handleSaveGood}  />
    </div>
  );
};

export default UserProfile;
