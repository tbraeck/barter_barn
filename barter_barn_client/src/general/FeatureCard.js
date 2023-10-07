import React, { useState, useEffect } from 'react';
import GoodsCard from './GoodsCard';

const FeaturedCard = ({ allGoods }) => {
  const [randomIndex, setRandomIndex] = useState(0);

  const handleRandomize = () => {
    if (allGoods.length > 0) {
      const newIndex = Math.floor(Math.random() * allGoods.length);
      setRandomIndex(newIndex);
    }
  };

  useEffect(() => {
    // Call handleRandomize to set the initial random item when the component loads
    handleRandomize();
  }, [allGoods]);

  const randomItem = allGoods[randomIndex];

  return (
    <div className="featured-card">
      {/* No button needed */}
      {randomItem && <GoodsCard good={randomItem} />} {/* Pass randomItem as a prop */}
    </div>
  );
};

export default FeaturedCard;