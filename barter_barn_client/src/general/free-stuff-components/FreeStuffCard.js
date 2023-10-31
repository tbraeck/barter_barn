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
  const [isClaimed, setIsClaimed] = useState(stuff.claimed || false);
  // const [claimMessage, setClaimMessage] = useState("");
// const [isPending, setIsPending] = useState(false)
  // const isItemClaimed = userFreeStuff.some((savedItem) => savedItem.id === stuff.id);

  // const { claimed } = useParams();
  // const isItemClaimed = claimed === 'true';
  // const isItemSaved = isItemClaimed || stuff.claimed;

  if (!stuff || !stuff.body) {
    return <div>Loading...</div>;
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

  // const handleClaim = () => {
  //   if (!isClaimed) {
  //     // Ensure that 'allForum' is defined before using the filter method
  //     if (allForum) {
  //       const updatedForum = allForum.filter((item) => item.id !== stuff.id);
  //       setAllForum(updatedForum);
  //     }
  //     // Step 1: Remove the claimed item from the forum
  // //     const updatedForum = allForum.filter((item) => item.id !== stuff.id);
  // //     setAllForum(updatedForum);
  // // console.log(allForum)

  //     // Step 2: Add the claimed item to the user's profile
  //     handleSaveClaim(stuff);
  
  //     // Step 3: Send a message to the original poster
  //     fetch(`/free_stuffs/${stuff.id}/claim`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ userId: user.id }),
  //     })
  //       .then((response) => {
  //         if (!response.ok) {
  //           throw new Error('Failed to send message to original poster');
  //         }
  //         // Message sent to original poster successfully
  //         return response.json();
  //       })
  //       .then(() => {
  //         // Step 4: Send a message to the current user
  //         fetch('/messages', {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           body: JSON.stringify({
  //             recipientId: user.id,
  //             content: `The claimed item has been added to your profile.`,
  //           }),
  //         })
  //           .then((response) => {
  //             if (response.ok) {
  //               // Message sent to current user successfully
  //               return response.json();
  //             } else {
  //               throw new Error('Failed to send message to current user');
  //             }
  //           })
  //           .then(() => {
  //             // Step 5: Mark the item as claimed and set the claim message
  //             setIsClaimed(true);
  //             setClaimMessage("Claimed item is in your profile");
  //           })
  //           .catch((error) => {
  //             // Handle any errors in the second message sending process
  //             console.error('Error sending message to current user:', error);
  //           });
  //       })
  //       .catch((error) => {
  //         // Handle any errors in the first message sending process
  //         console.error('Error sending message to original poster:', error);
  //       });
  //     }
  // };
  
  return (
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
