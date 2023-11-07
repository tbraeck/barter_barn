import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';

const FreeStuffCard = ({
  stuff,
  user,
  setUserFreeStuff,
  userFreeStuff,
  setAllForum,
  allForum,
  handleAddFreeStuffs,
  handleAddToUserFreeStuff,
  isUserProfile,
  handleDeleteClickFreeStuff,
  handleDeleteClickClaimFreeStuff,
  handleSaveFreeStuffToUserProfile,
  handleClaimFreeStuff,
  handleSaveClaimFreeStuffToUserProfile,
  handleClaimFreeStuffToUserProfile,
  handleUpdateUserFreeStuffs
,
isClaimed,
setIsClaimed
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [errors, setErrors] = useState([]);
  // const [isClaimed, setIsClaimed] = useState(!!stuff.claimant_id);
  // console.log(handleClaimFreeStuff)
  // const [claimMessage, setClaimMessage] = useState("");
// const [isPending, setIsPending] = useState(false)
  // const isItemClaimed = userFreeStuff.some((savedItem) => savedItem.id === stuff.id);

  // const { claimed } = useParams();
  // const isItemClaimed = claimed === 'true';
  // const isItemSaved = isItemClaimed || stuff.claimed;

  if (!stuff || !stuff.body) {
    return <div>Loading...</div>;
  }

 
  // console.log(stuff)
  
  const { body} = stuff;

  const handleSave = () => {
      const saveResult = handleSaveFreeStuffToUserProfile(stuff, 'save');
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
  
  
  
  const handleClaim = () => {
    if (!isClaimed) {
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
          console.log('Claimed item data:', newStuff);
          handleAddFreeStuffs(newStuff);
          
          setUserFreeStuff([...userFreeStuff, newStuff])
          setIsClaimed(true);
        })
        .catch((error) => {
          console.error('Error claiming item:', error);
          setErrors(['Failed to claim item. Please try again.']);
        });
    }
  };
  
  
  
  
  
  

  const handleReturn = () => {
    if (isClaimed && stuff.claimant_id !== null) {
      fetch(`/free_stuffs/${stuff.id}/return`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (response.ok) {
            setIsClaimed(false);
  
            stuff.claimant_id = null;
  
            setUserFreeStuff((prevUserFreeStuff) => {
              return prevUserFreeStuff.map((item) => {
                if (item.id === stuff.id) {
                  return {
                    ...item,
                    claimant_id: null,
                  };
                }
                return item;
              });
            });
          } else {
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
  
  
  
  return(
  <div className="goodCardContainer">
  <div className="goodCard">
    <img className='thumbImg' src={stuff.image} alt="Free Stuff" />
    <h2 className="goodTitle">{body}</h2>
    <div className="buttonContainer">
      {isUserProfile &&  (
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
