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
  handleSaveFreeStuffToUserProfile,
  isClaimed,
  setIsClaimed
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [errors, setErrors] = useState([]);

// console.log(userFreeStuff)
// console.log(allForum[2].free_stuffs)


  if (!stuff || !stuff.body) {
    return <div>Loading...</div>;
  }

 
  // console.log(stuff)
  
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
  
  const handleReturn = () => {
  if (!isClaimed && stuff && stuff.claimant_id !== null) {
    fetch(`/free_stuffs/${stuff.id}/return`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          // Remove the returned item from userFreeStuff
          setUserFreeStuff((prevUserFreeStuff) => {
            return prevUserFreeStuff.filter((item) => item.id !== stuff.id);
          });

          // Find the forum to which the claimed item belongs
          const updatedAllForum = allForum[2].free_stuffs.map((f) => {
            if (f && f.id === stuff.forum_id) {
              // Filter out the returned item from free_stuffs in the forum
              const updatedFreeStuffs = f.free_stuffs.filter((st) => st.id !== stuff.id);
              const newForum = { ...f, free_stuffs: updatedFreeStuffs };
              return newForum;
            }
            return f;
          });

          setAllForum(updatedAllForum);
          setErrors([]);
        } else {
          console.error('Error returning item:', response);
          setErrors(['Failed to return item. Please try again.']);
        }
      })
      .catch((error) => {
        console.error('Error returning item:', error);
        setErrors(['Failed to return item. Please try again.']);
      });
  } else {
    // Handle cases where the conditions are not met (e.g., not claimed or claimant_id is null)
    setErrors(['Item cannot be returned.']);
  }
};

  
  const handleClaim = () => {
    if (!isClaimed) {

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
          handleAddFreeStuffs(newStuff);
          
          setIsClaimed(true);
        })
        .catch((error) => {
          console.error('Error claiming item:', error);
          setErrors(['Failed to claim item. Please try again.']);
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
        handleReturn(allForum);
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
