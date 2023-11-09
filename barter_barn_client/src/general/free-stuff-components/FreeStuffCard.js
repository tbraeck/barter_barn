import React, { useState } from 'react';

const FreeStuffCard = ({
  stuff,
  user,
  userFreeStuff,
  setUserFreeStuff,
  handleUpdateFreeStuffs,
  isUserProfile,
  handleDeleteClickFreeStuff,
  handleSaveFreeStuffToUserProfile,
  handleUpdateUserFreeStuffs,
  uniqueUserFreeStuff
 
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [errors, setErrors] = useState([]);

  if (!stuff || !stuff.body) {
    return <div>Loading...</div>;
  }
  
  
  const { body, claimant_id} = stuff;

  const handleSave = () => {
    if (userFreeStuff.some(savedItem => savedItem.id === stuff.id)) {
      setErrors(['You have already saved this item.']);
      return;
    }
  
    if (stuff.user_id === user.id) {
      setErrors(['You cannot save an item you created.']);
      return;
    }
  
    console.log('Before calling handleSaveFreeStuffToUserProfile');
    const saveResult = handleSaveFreeStuffToUserProfile(stuff, 'save');
    console.log('After calling handleSaveFreeStuffToUserProfile');
  
    if (saveResult.success) {
      setIsSaved(true);
      setErrors([]);
    } else {
      setErrors([saveResult.message]);
    }
  };
  


  const handleDeleteSaved = () => {
    if (isUserProfile) {
      setErrors(["You can only delete free stuff in your profile."]);
      return;
    }
    handleDeleteClickFreeStuff(stuff.id);
  };
  
  const handleReturn = (stuff) => {
    fetch(`/free_stuffs/${stuff.id}/return`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to return item. Please try again.');
        }
      })
      .then((newStuff) => {
        const updatedUserFreeStuff = userFreeStuff.filter((item) => item.id !== newStuff.id);
        setUserFreeStuff(updatedUserFreeStuff);
  
        // Call the function to update the forum state
        handleUpdateFreeStuffs(newStuff);
      })
      .catch((error) => {
        console.error('Error returning item:', error);
        setErrors(['Failed to return item. Please try again.']);
      });
  };
  

  
  const handleClaim = () => {

      if (stuff.user_id === user.id) {
        setErrors(["You cannot claim your own item."]);
        return;
      }

      fetch(`/user_free_stuffs/${stuff.id}/claim`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(stuff)
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Failed to claim item. Please try again.');
          }
        })
        .then((newStuff) => {
          handleUpdateFreeStuffs(newStuff);
        })
        .catch((error) => {
          console.error('Error claiming item:', error);
          setErrors(['Failed to claim item. Please try again.']);
        });
  };

  return(
  <div className="goodCardContainer">
  <div className="goodCard">
    <img className='thumbImg' src={stuff.image} alt="Free Stuff" />
    <h2 className="goodTitle">{body}</h2>
    <div className="buttonContainer">

    {isUserProfile && (
      <>
        {stuff.user_id !== user.id && (
          <>
            <button onClick={() => handleSave(stuff.id)} className="crudButton saveButton">
              SAVE
            </button>
            <button     onClick={handleClaim} className="crudButton claimButton">
              CLAIM
            </button>
          </>
        )}
      </>
    )}
    {isSaved && <p>Item has been saved to your profile!</p>}
              {/* {claimMessage && <p className="claim-message">{claimMessage}</p>} */}
              {!isUserProfile && (
          <button
            onClick={() => {
              if (stuff.claimant_id === null) {
                handleDeleteSaved(stuff);
              } else {
                handleReturn(stuff);
              }
            }}
            className={stuff.claimant_id === null ? "redButton" : "greenButton"}
          >
            {stuff.claimant_id === null ? "DELETE" : "RETURN"}
          </button>
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
