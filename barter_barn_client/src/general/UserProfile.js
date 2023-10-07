import React from 'react';
import UserItems from './UserItems';
import { useParams } from 'react-router-dom';

// import './styles/UserProfile.css';

const UserProfile = ({ user, allForum, handleSaveGood, handleSaveGoods, handleSaveComment}) => {
  const {user_id} = useParams();

  return (
    <div className="userProfile">
      {/* <div>
          <h1 className='userNameTitle'> {user.username}'s Comments</h1>
          <UserComments user={user} user_id={user_id}  handleSaveComment={handleSaveComment}  />
      </div> */}
       {/* <div>
          <h1 className='userNameTitle'> {user.username}'s Comments</h1>
          <UserSavedPosts user={user} user_id={user_id}  handleSavePost={handleSavePost}  />
       </div> */}
        <div>
          <h1 className='userNameTitle'> {user.username}'s Comments</h1>
          <UserItems user={user} user_id={user_id}  handleSaveGood={handleSaveGood}  />
        </div>
    </div>
  );
};

export default UserProfile;
