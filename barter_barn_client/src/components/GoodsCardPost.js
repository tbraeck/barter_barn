import React, { useState } from 'react';
import EditGoods from './EditGoods';
// import './GoodsCardPost.css'; // Import your custom CSS file for styling

const GoodsCardPost = ({
  good,
  userGoods,
  allGoods,
  setUserGoods,
  user,
  handleUpdateSubmit,
  handleUpdateUserGoods,
  handleDeleteClick,
}) => {
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const { id, title, description, image_url, good_or_service } = good;
console.log(title, description)
  const handleShowEditForm = () => {
    setIsEditFormVisible(true);
  };

  const handleDelete = () => {
    handleDeleteClick(id);
  };

  return (
    <div
      className={`goodsCard ${isEditFormVisible ? 'editing' : ''}`}
      onDoubleClick={() =>
        setIsEditFormVisible((isEditFormVisible) => !isEditFormVisible)
      }
    >
      {isEditFormVisible ? (
        <EditGoods
          user={user}
          allGoods={allGoods}
          good={good}
          handleShowEditForm={handleShowEditForm}
          userGoods={userGoods}
          setUserGoods={setUserGoods}
          handleUpdateSubmit={handleUpdateSubmit}
          isEditFormVisible={isEditFormVisible}
          setIsEditFormVisible={setIsEditFormVisible}
          handleUpdateUserGoods={handleUpdateUserGoods}
        />
      ) : (
        <div className="goodsCardContainer">
          <div className="goodsCardContent">
            <h1 className="goodsCardTitle">PRODUCT: {title}</h1>
            <h2 className="goodsCardDescription">DESCRIPTION: {description}</h2>
            <h2 className="goodsCardDescription">IMAGE: {image_url}</h2>
            <h2 className="goodsCardDescription">SERVICE NEEDED: {good_or_service}</h2>
            <button className="goodsCardButton btn btn-secondary">SAVE</button>
            <button onClick={handleDelete} className="goodsCardButton btn btn-secondary">
              DELETE
            </button>
            <button
              onClick={handleShowEditForm}
              className="goodsCardButton btn btn-secondary"
            >
              EDIT
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoodsCardPost;
