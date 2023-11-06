import React, { useState, useEffect, useCallback } from 'react';
import GoodsCard from './goods-components/GoodsCard';

const FeaturedCard = ({ forum, allForum, user, allGoods, handleSaveGoodToUserProfile }) => {
  const [randomIndex, setRandomIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  // Define handleRandomize using useCallback
  const handleRandomize = useCallback(() => {
    if (allGoods.length > 0) {
      const newIndex = Math.floor(Math.random() * allGoods.length);
      setRandomIndex(newIndex);
      setIsSaved(false);
    }
  }, [allGoods]);

  const isUserProfile = user.id === (forum?.user_id || null);

  const handleSave = () => {
    setIsSaved(true);
    handleSaveGoodToUserProfile(randomItem);
  };

  useEffect(() => {
    handleRandomize();
  }, [handleRandomize, allGoods]);

  const randomItem = allGoods[randomIndex];

  return (
    <div className="featured-card">
      {!isSaved && randomItem ? (
        <div>
          <GoodsCard
            good={randomItem}
            handleSave={handleSave}
            isUserProfile={isUserProfile}
            featured={true}
          />
        </div>
      ) : null}
    </div>
  );
};

export default FeaturedCard;
