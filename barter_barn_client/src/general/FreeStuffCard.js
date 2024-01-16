import React, { useState, useContext} from 'react';
import { ForumContext } from '../contexts/ForumContext.js';
import { UserContext } from '../contexts/UserContext.js';

const FreeStuffCard = ({
  stuff,
  forum,
  handleDeleteClickFreeStuff,
  handleSaveFreeStuffToUserProfile,

}) => {
  const [errors, setErrors] = useState([]);
  const {setAllForum } = useContext(ForumContext)
  const {user, setUser} = useContext(UserContext);

  if (!stuff || !stuff.body) {
    return <div>Loading...</div>;
  }
  
  const { body} = stuff;

  const handleSave = () => {
    if (user.saved_free_stuffs.some(savedItem => savedItem.id === stuff.id)) {
      setErrors(['You have already saved this item.']);
      return;
    }
  
    if (stuff.user_id === user.id) {
      setErrors(['You cannot save an item you created.']);
      return;
    }
  
    const saveResult = handleSaveFreeStuffToUserProfile(stuff, 'save');

    if (saveResult.success) {
      // setIsSaved(true);
      setErrors([]);
    } else {
      setErrors([saveResult.message]);
    }
  };
  


const handleDeleteSaved = () => {
  
    handleDeleteClickFreeStuff(stuff.id);
  };
  

const handleClaim = () => {
  if (stuff.user_id === user.id) {
    setErrors(["You cannot claim your own item."]);
    return;
  }

  fetch(`/free_stuffs/${stuff.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to claim item. Please try again.');
      }
    })
    .then((newStuff) => {
      setAllForum((prevAllForum) => {
        const updatedAllForum = prevAllForum.map((forum) => {
          if (forum.id === 3) {
            const updatedFreeStuffs = forum.free_stuffs.map((item) =>
              item.id === newStuff.id ? newStuff : item
            );

            return { ...forum, free_stuffs: updatedFreeStuffs };
          }
          return forum;
        });

        setUser((prevUser) => ({
          ...prevUser,
          saved_free_stuffs: [...prevUser.saved_free_stuffs, newStuff],
        }));

        return updatedAllForum;
      });
    })
    .catch((error) => {
      console.error('Error claiming item:', error);
      setErrors(['Failed to claim item. Please try again.']);
    });
};
const handleReturn = () => {
  fetch(`/free_stuffs/${stuff.id}/return`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((returnedItem) => {
      if (returnedItem && returnedItem.id) {
        setAllForum((prevAllForum) => {
          const updatedAllForum = prevAllForum.map((forum) => {
            if (forum.id === 3) {
              const updatedFreeStuffs = forum.free_stuffs.map((item) =>
                item.id === returnedItem.id ? returnedItem : item
              );

              return { ...forum, free_stuffs: updatedFreeStuffs };
            }
            return forum;
          });

          return updatedAllForum;
        });
      }

      setUser((prevUser) => {
        const updatedClaimedFreeStuffs = prevUser.saved_free_stuffs.filter(
          (item) => item.id !== returnedItem.id
        );

        return { ...prevUser, saved_free_stuffs: updatedClaimedFreeStuffs };
      });
    })
    .catch((error) => {
      console.error('Error returning item:', error);
      setErrors(['Failed to return item. Please try again.']);
    });
};

  const renderButtons = () => {
    if(forum) {
      if(stuff.user_id !== user.id  &&  user.saved_free_stuffs.some(st => st.id === stuff.id)) {
        return ( 
        <button     onClick={handleClaim} className="crudButton claimButton">
        CLAIM
      </button>
        )
      } else if (stuff.user_id !== user.id) {
        return (
          <>
          <button onClick={() => handleSave(stuff.id)} className="crudButton saveButton">
          SAVE
        </button>
        <button onClick={() => handleClaim(stuff.id)} className="crudButton claimButton">
          CLAIM
        </button>
          </>
        )
      }
    } else {
      if(stuff.claimant_id === null) {
        return (
          <button onClick={() => handleDeleteSaved(stuff.id)} className="crudButton saveButton">
              DELETE
            </button>
        )
      } else {
        return (
          <button  onClick={() => handleReturn(stuff.id)} className="crudButton claimButton">
              RETURN
          </button>
        )
      }
    }
  }
  return(
  <div className="goodCardContainer">
  <div className="goodCard">
    <img className='thumbImg' src={stuff.image} alt="Free Stuff" />
    <h2 className="goodTitle">{body}</h2>
    <div className="buttonContainer">
      {renderButtons()}
    </div>
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
}

export default FreeStuffCard;
