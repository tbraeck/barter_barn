

import React, { useEffect, useState, useContext } from 'react'; 
import GoodsCard from './GoodsCard';
// import ServicesCard from './ServicesCard';
// import FreeStuffCard from './FreeStuffCard'
import { useParams } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const ForumCard = ({ allForum, setAllForum, handleAdd }) => {
  const [forum, setForum] = useState({
    goods: [],
    services: [],
    free_stuffs: [],
  });
  // const [userDrawings, setUserDrawings] = useState([])

console.log(forum)
console.log(allForum)

  const { user } = useContext(UserContext);
  const { id } = useParams();

// const isUserProfile = user.username !== forum.name;


useEffect(() => {
  const selectedForum = allForum.find(f => f.id === parseInt(id));
  if(selectedForum) {
    setForum(selectedForum)
  }
}, [allForum, id])

// const handleSaveDrawingToUserProfile = (drawing) => {
//   if (!isUserProfile) {
//     return {
//       success: false,
//       message: "Saving drawings is not allowed in your profile.",
//     };
//   }

//   return fetch(`/users/${user.id}/user_drawings`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(drawing),
//   })
//     .then((response) => {
//       if (response.ok) {
//         return response.json().then((savedDrawing) => {
//           setUserDrawings([...userDrawings, savedDrawing]);
//           return {
//             success: true,
//             message: 'Drawing saved to profile!',
//           };
//         });
//       } else {
//         throw new Error('Failed to save drawing to user profile');
//       }
//     })
//     .catch((error) => {
//       console.error('Error saving drawing:', error);
//       return {
//         success: false,
//         message: error.message,
//       };
//     });
// };

// const handleDeleteClick = (user_id, drawing_id) => {
//   fetch(`/users/${user_id}/user_drawings/${drawing_id}`, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": 'application/json',
//     },
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error('Failed to delete drawing');
//       }
//       return response.json();
//     })
//     .then(() => {
//       const deleteDrawing = category.drawings.filter(r => r.id !== drawing_id);
//       const updatedDrawings = categories.map(c => c.id === category.id ? { ...c, drawings: deleteDrawing } : c);
//       setCategories(updatedDrawings);
//       handleUpdateSubmit(drawing_id, deleteDrawing);
//     })
//     .catch((error) => {
//       console.error('Error deleting drawing:', error);
//     });
// };

// const handleUpdateSubmit = (drawing_id, updatedDrawing) => {
//   fetch(`/users/${user.id}/user_drawings/${drawing_id}`, {
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(updatedDrawing),
//   })
//     .then(r => r.json())
//     .then(savedDrawing => {
//       console.log(savedDrawing);
//       const updatedUserDrawings = userDrawings.map(drawing =>
//         drawing.id === drawing_id ? savedDrawing : drawing
//       );
//       setUserDrawings(updatedUserDrawings);
//     })
//     .catch((error) => {
//       console.error('Error updating drawing:', error);
//     });
// };

const catGoods = forum.goods.map((good) => (
  <div key={good.id}>
    <GoodsCard
     good={good}
     user={user}
     forum={forum}
     allForum={allForum}
    //  handleDeleteClick={handleDeleteClick}
    //  isUserProfile={isUserProfile}
    //  handleUpdateSubmit={handleUpdateSubmit}
    //  handleSaveDrawingToUserProfile={handleSaveDrawingToUserProfile}
    />
  </div>
))

// const catServices = forum.services.map((service) => (
//   <div key={service.id}>
//     <ServicesCard
//      service={service}
//      user={user}
//      forum={forum}
//      allForum={allForum}
//      handleDeleteClick={handleDeleteClick}
//      isUserProfile={isUserProfile}
//      handleUpdateSubmit={handleUpdateSubmit}
//      handleSaveDrawingToUserProfile={handleSaveDrawingToUserProfile}
//     />
//   </div>
// ))

// const catFreeStuff = forum.free_stuffs.map((stuff) => (
//   <div key={stuff.id}>
//     <FreeStuffCard
//      stuff={stuff}
//      user={user}
//      forum={forum}
//      allForum={allForum}
//      handleDeleteClick={handleDeleteClick}
//      isUserProfile={isUserProfile}
//      handleUpdateSubmit={handleUpdateSubmit}
//      handleSaveDrawingToUserProfile={handleSaveDrawingToUserProfile}
//     />
//   </div>
// ))

return(
  <div className="category-container">
        <div className="categoryBox">
          <div className="subTitle">
            <div className="catName">
              <h1>
                <em>{forum.name}</em>
              </h1>
            </div>
          </div>
          <div className="grid-container">
            <div className="drawingList">
              <div className="drawingGrid">
                <ul className="catDrawings">{catGoods}</ul> 
              </div>
            </div>
            {/* <div className="newUserForm">
              <NewUserDrawing
                categories={categories}
                setCategories={setCategories}
                category={category}
                handleAdd={handleAdd}
                user={user}
              />
            </div> */}
           </div>
        </div>
      </div>
)}

export default ForumCard;

