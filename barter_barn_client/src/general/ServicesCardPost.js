import React, { useState } from 'react';
import EditServices from './EditServices';
// import './GoodsCardPost.css'; // Import your custom CSS file for styling

const ServicesCardPost = ({
  service,
  userServices,
  allServices,
  setUserServices,
  user,
  handleUpdateSubmit,
  handleUpdateUserServices,
  handleDeleteClickServices,
}) => {
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const { id, title, description, image_url, good_or_service } = service;

  const handleShowEditForm = () => {
    setIsEditFormVisible(true);
  };

  const handleDelete = () => {
    handleDeleteClickServices(id);
  };

  return (
    <div
      className={`goodsCard ${isEditFormVisible ? 'editing' : ''}`}
      onDoubleClick={() =>
        setIsEditFormVisible((isEditFormVisible) => !isEditFormVisible)
      }
    >
      {isEditFormVisible ? (
        <EditServices
          user={user}
          allServices={allServices}
          service={service}
          handleShowEditForm={handleShowEditForm}
          userServices={userServices}
          setUserServices={setUserServices}
          handleUpdateSubmit={handleUpdateSubmit}
          isEditFormVisible={isEditFormVisible}
          setIsEditFormVisible={setIsEditFormVisible}
          handleUpdateUserServices={handleUpdateUserServices}
        />
      ) : (
        <div className="goodsCardContainer">
          <div className="goodsCardContent">
            <h1 className="goodsCardTitle">WHAT I OFFER: {title}</h1>
            <h2 className="goodsCardDescription"><em>DESCRIPTION:</em> {description}</h2>
            <h2 className="goodsCardDescription"><em>IMAGE:</em> {image_url}</h2>
            <h2 className="goodsCardDescription"><em>GOOD NEEDED:</em> {good_or_service}</h2>
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

export default ServicesCardPost;
