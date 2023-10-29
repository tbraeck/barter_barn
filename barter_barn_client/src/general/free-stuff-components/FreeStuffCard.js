import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const FreeStuffCard = ({
  stuff,
  user,
  setUserFreeStuff,
  userFreeStuff,
  allForum,
  isUserProfile,
  handleDeleteClickFreeStuff,
  handleDeleteClickClaimFreeStuff,
  handleSaveFreeStuffToUserProfile,
  handleClaimFreeStuff,
  handleUpdateSubmitFreeStuff,
  setAllForum,
  handleSaveClaimFreeStuffToUserProfile
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isClaimed, setIsClaimed] = useState(false);
  // const [claimMessage, setClaimMessage] = useState("");

  // const isItemClaimed = userFreeStuff.some((savedItem) => savedItem.id === stuff.id);

  const { claimed } = useParams();
  const isItemClaimed = claimed === 'true';
  // const isItemSaved = isItemClaimed || stuff.claimed;

  if (!stuff || !stuff.body) {
    return null;
  }

  if (isClaimed) {
    return null;
  }

  const { body, image_url } = stuff;

  const handleSave = () => {
      const saveResult = handleSaveFreeStuffToUserProfile(stuff, 'save');
      if (saveResult.success) {
        setIsSaved(true);
        setErrors([]);
        console.log(stuff)
      } else {
        setErrors([saveResult.message]);
      }
    };

  // console.log(handleSave)

  const handleSaveClaim = () => {
      const saveResult = handleSaveClaimFreeStuffToUserProfile(stuff, 'claim');
      if (saveResult.success) {
        setIsSaved(true);
        setErrors([]);
        console.log(stuff)

      } else {
        setErrors([saveResult.message]);
      }
    }

  const handleDeleteSaved = () => {
    if (isUserProfile) {
      setErrors(["You can only delete free stuff in your profile."]);
      return;
    }
    handleDeleteClickFreeStuff(stuff.id);
  };


  const handleDeleteClaimed = () => {
    if (isUserProfile) {
      setErrors(["You can only delete free stuff in your profile."]);
      return;
    }
    handleDeleteClickFreeStuff(stuff.id);
  };

  // const handleClaim = () => {
  //   if (!isPending && !isClaimed) {
  //     setIsClaimed(true)
  //     // Step 1: Remove the claimed item from the forum
  //     const updatedForum = allForum.filter((item) => item.id !== stuff.id);
  //     setAllForum(updatedForum);
  
  //     // Step 2: Add the claimed item to the user's profile
  //     handleSave( stuff);
  //     setClaimMessage("Claimed item is in your profile");
  //     // Step 3: Send a message to the original poster
  //     sendMessageToOriginalPoster(stuff, user);
  
     
  //   }
  // };

  const handleClaim = () => {
    if (!isClaimed) {
      // Step 1: Remove the claimed item from the forum
      const updatedForum = allForum.filter((item) => item.id !== stuff.id);
      setAllForum(updatedForum);

      setIsClaimed(true);
console.log(isClaimed)
      // Step 2: Add the claimed item to the user's profile
      handleSaveClaim(stuff);
      console.log(isClaimed)

      // setClaimMessage('Claimed item is in your profile');

      // Step 3: Mark the item as claimed and set the claim message
    }
  };
  
  return (
            <div className="goodEdit">
          <div className="goodCardContainer">
            <div className="goodCard">
              <h2 className="goodTitle">{body}</h2>
              <p className="goodInfo">
                <strong>Image URL:</strong> {image_url}
              </p>
              <div className="buttonContainer">
                {isUserProfile ? (
                  <>
                    <button onClick={handleSave} className="crudButton saveButton">
                      SAVE
                    </button>
                    <button onClick={handleClaim} className="crudButton claimButton">
                      CLAIM
                    </button>
                  </>
                ) : isItemClaimed ? (
                  <button onClick={handleDeleteClaimed} className="crudButton claimButton">
                    UNCLAIM
                  </button>
                ) : (
                  <button onClick={handleDeleteSaved} className="crudButton deleteButton">
                    DELETE
                  </button>
                )}
              </div>
              {isClaimed ? (
  <p className="claim-message">Claimed item is now in your profile!</p>
) : (
  isSaved && <p className="saveMessage">Item has been saved to your profile!</p>
)}



              {errors.length > 0 && (
                <div className="error-messages">
                  {errors.map((error, index) => (
                    <p key={index} className="error-message">
                      {error}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>


  );
};

export default FreeStuffCard;
