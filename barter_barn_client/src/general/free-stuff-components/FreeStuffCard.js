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
    return null;
  }

  if (isClaimed) {
    return null;
  }

  const { body, image_url } = stuff;

  const handleSave = () => {
  if (!isPending) {
    // Check if the item is not pending
    const saveResult = handleSaveFreeStuffToUserProfile(stuff, 'save'); // Pass 'save' as the buttonClicked parameter
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
    if (!isPending && !isClaimed) {
      // Step 1: Remove the claimed item from the forum
      const updatedForum = allForum.filter((item) => item.id !== stuff.id);
      setAllForum(updatedForum);
  
      // Step 2: Add the claimed item to the user's profile
      handleSave(stuff);
  
      // Step 3: Send a message to the original poster
      fetch(`/free_stuffs/${stuff.id}/claim`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.id }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to send message to original poster');
          }
          // Message sent to original poster successfully
          return response.json();
        })
        .then(() => {
          // Step 4: Send a message to the current user
          fetch('/messages', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              recipientId: user.id,
              content: `The claimed item has been added to your profile.`,
            }),
          })
            .then((response) => {
              if (response.ok) {
                // Message sent to current user successfully
                return response.json();
              } else {
                throw new Error('Failed to send message to current user');
              }
            })
            .then(() => {
              // Step 5: Mark the item as claimed and set the claim message
              setIsClaimed(true);
              setClaimMessage("Claimed item is in your profile");
            })
            .catch((error) => {
              // Handle any errors in the second message sending process
              console.error('Error sending message to current user:', error);
            });
        })
        .catch((error) => {
          // Handle any errors in the first message sending process
          console.error('Error sending message to original poster:', error);
        });
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
