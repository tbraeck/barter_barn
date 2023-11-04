import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';

const FreeStuffCard = ({
  stuff,
  user,
  setUserFreeStuff,
  userFreeStuff,
  allForum,
  setAllForum,
  isUserProfile,
  handleDeleteClickFreeStuff,
  handleDeleteClickClaimFreeStuff,
  handleSaveFreeStuffToUserProfile,
  handleClaimFreeStuff,
  handleAddFreeStuffs,
  handleSaveClaimFreeStuffToUserProfile,
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isClaimed, setIsClaimed] = useState(stuff.claimant_id !== null);
  // const isClaimed = !!stuff.claimant_id; 

  // const [claimMessage, setClaimMessage] = useState("");
// const [isPending, setIsPending] = useState(false)
  // const isItemClaimed = userFreeStuff.some((savedItem) => savedItem.id === stuff.id);

  // const { claimed } = useParams();
  // const isItemClaimed = claimed === 'true';
  // const isItemSaved = isItemClaimed || stuff.claimed;
// console.log(stuff)
  if (!stuff || !stuff.body) {
    return <div>Loading...</div>;
  }

  // if (isClaimed) {
  //   return null;
  // }
  const { body } = stuff;

  const handleSave = () => {
      const saveResult = handleSaveFreeStuffToUserProfile(stuff, 'save');
      if (saveResult.success) {
        setIsSaved(true);
        setErrors([]);
      } else {
        setErrors([saveResult.message]);
      }
    };

  const handleSaveClaim = () => {
      const saveResult = handleSaveClaimFreeStuffToUserProfile(stuff, 'claim');
      if (saveResult.success) {
        setIsSaved(true);
        setErrors([]);
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

  const handleClaim = () => {
    if (!isClaimed) {
      // Step 1: Remove the claimed item from the forum
      const updatedForum = allForum.filter((item) => item.id !== stuff.id);
      setAllForum(updatedForum);
  
      // Step 2: Add the claimed item to the user's profile
      const saveResult = handleSaveClaimFreeStuffToUserProfile(stuff, true);
      if (saveResult.success) {
        setIsSaved(true);
        setErrors([]);
      } else {
        setErrors([saveResult.message]);
      }
      
      setIsClaimed(true); // Set isClaimed to true when the item is claimed
    }
  };
  
  

  const handleReturn = () => {
    if (stuff.claimant_id === user.id) {
      // The user can return the item because they are the claimant
      fetch(`/freestuffs/${stuff.id}/return`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (response.ok) {
            // Update the UI to reflect the changes after a successful return
            setIsClaimed(false);
          } else {
            // Handle errors if the return action is not successful
            console.error('Error returning item:', response);
            setErrors(['Failed to return item. Please try again.']);
          }
        })
        .catch((error) => {
          console.error('Error returning item:', error);
          setErrors(['Failed to return item. Please try again.']);
        });
    } else {
      // The user cannot return the item because they are not the claimant
      setErrors(['You can only return items you claimed.']);
    }
  };  
  
  return (
    <div className="goodCardContainer">
      {isClaimed && (
        <div className="goodCard">
          <h2 className="goodTitle">{body}</h2>
          <img src={stuff.image} className='cardImage' alt="  Preview" />    
          <div className="buttonContainer">
            {isUserProfile && (
              <>
                <button onClick={handleSave} className="crudButton saveButton">
                  SAVE
                </button>
                <button onClick={handleClaim} className="crudButton claimButton">
                  CLAIM
                </button>
              </>
            )}
    
            {isSaved && <p>Item has been saved to your profile!</p>}
    
            {!isUserProfile && (
              <>
                <button onClick={() => handleDeleteSaved(stuff)} className="crudButton deleteButton">
                  DELETE
                </button>
                {!isClaimed && (
                  <button onClick={handleReturn} className="crudButton returnButton">
                    RETURN
                  </button>
                )}
              </>
            )}
          </div>
    
          {isSaved && <p className="saveMessage">Item has been saved to your profile!</p>}
    
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
      )}
    </div>
  
  );
  
};

export default FreeStuffCard;
