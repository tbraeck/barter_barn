import React from 'react';
import UserComments from './UserComments';
import { useParams } from 'react-router-dom';

// import './styles/UserProfile.css';

const UserProfile = ({ user, categories, handleSaveComment}) => {
  const {user_id} = useParams();

  return (
    <div className="userProfile">
        <h1 className='userNameTitle'> {user.username}'s Comments</h1>
        <UserComments user={user} user_id={user_id}  handleSaveComment={handleSaveComment}  />
    </div>
  );
};

export default UserProfile;
