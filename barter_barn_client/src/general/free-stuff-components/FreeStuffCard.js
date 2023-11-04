import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';

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
  handleSaveClaimFreeStuffToUserProfile,
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isClaimed, setIsClaimed] = useState(stuff.claimant_id || true);
  // const [claimMessage, setClaimMessage] = useState("");
// const [isPending, setIsPending] = useState(false)
  // const isItemClaimed = userFreeStuff.some((savedItem) => savedItem.id === stuff.id);

  // const { claimed } = useParams();
  // const isItemClaimed = claimed === 'true';
  // const isItemSaved = isItemClaimed || stuff.claimed;

  if (!stuff || !stuff.body) {
    return <div>Loading...</div>;
  }

  if (!isClaimed) {
    return null;
  }

  const { body, image_url } = stuff;

  const handleSave = () => {
      const saveResult = handleSaveFreeStuffToUserProfile(stuff, 'save');
      if (saveResult.success) {
        setIsSaved(true);
        setErrors([]);
      } else {
        setErrors([saveResult.message]);
      }
    };

  // const handleSaveClaim = () => {
  //     const saveResult = handleSaveClaimFreeStuffToUserProfile(stuff, 'claim');
  //     if (saveResult.success) {
  //       setIsSaved(true);
  //       setErrors([]);
  //     } else {
  //       setErrors([saveResult.message]);
  //     }
  //   }
 

  const handleDeleteSaved = () => {
    if (isUserProfile) {
      setErrors(["You can only delete free stuff in your profile."]);
      return;
    }
    handleDeleteClickFreeStuff(stuff.id);
  };

  // const handleDeleteClaimed = () => {
  //   if (isUserProfile) {
  //     setErrors(["You can only delete free stuff in your profile."]);
  //     return;
  //   }
  //   handleDeleteClickFreeStuff(stuff.id);
  // };

<<<<<<< HEAD
  const handleClaim = () => {
    if (!isClaimed) {
      // Step 1: Remove the claimed item from the forum
      const updatedForum = allForum.filter((item) => item.id !== stuff.id);
      setAllForum(updatedForum);
  
      // Step 2: Add the claimed item to the user's profile
      const saveResult = handleSaveClaimFreeStuffToUserProfile(stuff, 'claim');
      if (saveResult.success) {
        setIsSaved(true);
        setErrors([]);
      } else {
        setErrors([saveResult.message]);
      }
      
      setIsClaimed(true); // Set isClaimed to true when the item is claimed
    }
  };
=======
  // const handleClaim = () => {
  //   if (!isPending && !isClaimed) {
  //     setIsClaimed(true)
  //     // Step 1: Remove the claimed item from the forum
  //     const updatedForum = allForum.filter((item) => item.id !== stuff.id);
  //     setAllForum(updatedForum);
>>>>>>> parent of 5a38c15 (commit saturday morning)
  
  //     // Step 2: Add the claimed item to the user's profile
  //     handleSave( stuff);
  //     setClaimMessage("Claimed item is in your profile");
  //     // Step 3: Send a message to the original poster
  //     sendMessageToOriginalPoster(stuff, user);
  
     
  //   }
  // };

  const handleReturn = () => {
    if (isClaimed && stuff.claimant_id === user.id) {
      // Make an API request to the "return" endpoint to handle the return action
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
            // setClaimMessage('Item has been returned to the forum');
            // You may need to add logic to move the item back to the original forum
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
    } 
  };
  
  
  return (
      <div className="goodCardContainer">
        <div className="goodCard">
          <h2 className="goodTitle">{body}</h2>
          
          <div className="buttonContainer">
            {isUserProfile && (
              <>
                <button onClick={handleSave} className="crudButton saveButton">
                  SAVE
                </button>
                <button onClick={handleSaveClaim} className="crudButton claimButton">
                  CLAIM
                </button>
              </> 
            )}
              {isSaved && <p>Item has been saved to your profile!</p>}
              {/* {claimMessage && <p className="claim-message">{claimMessage}</p>} */}
            {!isUserProfile && (
             <>
             <button onClick={() => handleDeleteSaved(stuff)} className='crudButton deleteButton'>
               DELETE
             </button>
             <button onClick={handleReturn} className="crudButton returnButton">
                RETURN
              </button>
                        
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
      </div>
   
  );
};

export default FreeStuffCard;
