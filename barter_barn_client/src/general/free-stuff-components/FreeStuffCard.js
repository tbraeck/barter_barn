import React, { useState } from 'react';
// import EditFreeStuff from '../editing-components/EditFreeStuff';

const FreeStuffCard = ({
  stuff,
  user,
  setUserFreeStuff,
  userFreeStuff,
  allForum,
  isUserProfile,
  // handleUpdateUserFreeStuffs,
  handleDeleteClickFreeStuff,
  handleSaveFreeStuffToUserProfile,
  handleClaimFreeStuff,
  handleUpdateSubmitFreeStuff,
  setAllForum,
  sendMessageToOriginalPoster
  
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isPending, setIsPending] = useState(stuff.pending); // Check if the item is pending
  const [errors, setErrors] = useState([]);
  const [isClaimed, setIsClaimed] = useState(stuff.claimed || false);
  const [claimMessage, setClaimMessage] = useState("");

  if (!stuff || !stuff.body) {
    // If the item is missing data, don't render it.
    return null;
  }

  if (isClaimed) {
    // If the item is claimed, return null to not render it.
    return null;
  }

  const { body, image_url } = stuff;


//   console.log(isClaimed); // Check if isClaimed changes to true when claimed
// console.log(claimMessage);

  const handleSave = () => {
    if (!isPending) {
      // Check if the item is not pending
      const saveResult = handleSaveFreeStuffToUserProfile(stuff);
      if (saveResult.success) {
        setIsSaved(true);
        setErrors([]);
      } else {
        setErrors([saveResult.message]);
      }
    }
  };

  const handleDelete = () => {
    if (isUserProfile) {
      setErrors(["You can only delete free stuff in your profile."]);
      return;
    }
    handleDeleteClickFreeStuff(stuff.id);
  };



  // const handleUpdateUserFreeStuffs = (updatedStuff) => {
  //   setUserFreeStuff((prevUserFreeStuff) => {
  //     // Map through the previous items and update the claimed item
  //     console.log(updatedStuff)
  //     const updatedUserFreeStuffs = prevUserFreeStuff.map((item) =>
  //       item.id === updatedStuff.id ? { ...item, claimed: false } : item
  //     );
  
  //     return updatedUserFreeStuffs;
  //   });
  // };

  const handleUpdateUserFreeStuffs = (updatedStuff) => {
    setUserFreeStuff((prevUserFreeStuff) => {
      const updatedUserFreeStuffs = prevUserFreeStuff.map((item) =>
        item.id === updatedStuff.id ? { ...item, claimed: false } : item
      );
  
      return updatedUserFreeStuffs;
    });
  };
console.log(claimMessage)
  const handleClaim = () => {
    if (!isPending && !isClaimed) {
  setIsClaimed(false)
      // Step 1: Remove the claimed item from the forum
      const updatedForum = allForum.filter((item) => item.id !== stuff.id);
      setAllForum(updatedForum);
  
      // Step 2: Add the claimed item to the user's profile
      handleUpdateUserFreeStuffs([...userFreeStuff, stuff]);
  
      // Step 3: Send a message to the original poster
      sendMessageToOriginalPoster(stuff, user);
  
      setClaimMessage("Claimed item is in your profile");
    }
  };
  

  return (
    <div className="goodEdit" >
      
        <div className="goodCardContainer">
          <div className="goodCard">
            <h2 className="goodTitle">{body}</h2>
            <p className="goodInfo">
              <strong>Image URL:</strong> {image_url}
            </p>
            <div className="buttonContainer">
              {isUserProfile && (
                <>
                <button onClick={handleSave} className="crudButton saveButton">
                  SAVE
                </button>
                 <button onClick={handleClaim} className="crudButton claimButton" disabled={isPending}>
                 CLAIM
               </button>
               </> 
              )}
              {claimMessage && 
                  <p className="claim-message">{claimMessage}</p>
                }
              
              {!isUserProfile && (
                  <button onClick={handleDelete} className="crudButton deleteButton">
                    DELETE
                  </button>
                 
              )}
                
            </div>
            {isSaved && <p className="saveMessage">Item has been saved to your profile!</p>}
            {isPending && <p className="pendingMessage">This item is pending.</p>}
           
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
