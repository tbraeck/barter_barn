import React from 'react';
import UserItems from './UserItems'; 
import { useParams } from 'react-router-dom';

const UserProfile = ({ allForum, handleUpdateFreeStuffs, user, setUser, handleSaveGood }) => {
  const { user_id } = useParams();

  return (
    <div className="userProfile">
      <div>
        <h1 className='userNameTitle'>{user.username}'s Saved Items</h1>
        <UserItems allForum={allForum} handleUpdateFreeStuffs={handleUpdateFreeStuffs} user={user} user_id={user_id} setUser={setUser } handleSaveItem={handleSaveGood} itemType="Goods" />
      </div>
    </div>
  );
};

export default UserProfile;
