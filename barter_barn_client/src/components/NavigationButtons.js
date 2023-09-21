import React from 'react';
import { useNavigate } from 'react-router-dom';

function NavigationButtons() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const goForward = () => {
    navigate(1); // Go forward to the next page (if available)
  };

  return (
    <div className="navigation-buttons">
      <button onClick={goBack}>&larr; Back</button>
      <button onClick={goForward}>Forward &rarr;</button>
    </div>
  );
}

export default NavigationButtons;
