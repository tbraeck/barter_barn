import React from 'react';
import UserItems from './UserItems'; 
import { useParams } from 'react-router-dom';

const UserProfile = ({ allForum, handleUpdateFreeStuffs, user, handleSaveGood, allComments, setAllComments, handleSaveGoods, handleSaveComment }) => {
  const { user_id } = useParams();

  return (
    <div className="userProfile">
      <div>
        <h1 className='userNameTitle'>{user.username}'s Saved Items</h1>
        <UserItems allForum={allForum} handleUpdateFreeStuffs={handleUpdateFreeStuffs} user={user} user_id={user_id} handleSaveItem={handleSaveGood} itemType="Goods" />
      </div>
      {/* <div>
        <h1 className='userNameTitle'>{user.username}'s Services</h1>
        <UserItems user={user} user_id={user_id} handleSaveItem={handleSaveGoods} itemType="Services" />
      </div>
      <div>
        <h1 className='userNameTitle'>{user.username}'s Free Stuff</h1>
        <UserItems user={user} user_id={user_id} handleSaveItem={handleSaveGoods} itemType="FreeStuff" />
      </div>
      <div>
        <h1 className='userNameTitle'>{user.username}'s Comments</h1>
        <UserItems user={user} user_id={user_id} handleSaveItem={handleSaveComment} itemType="Comments" />
      </div> */}
    </div>
  );
};

export default UserProfile;
