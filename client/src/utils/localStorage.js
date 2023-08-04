export const getSavedGameIds = () => {
  const savedGameIds = localStorage.getItem('saved_games')
    ? JSON.parse(localStorage.getItem('saved_games'))
    : [];

  return savedGameIds;
};

export const saveGameIds = (gameIdArr) => {
  if (gameIdArr.length) {
    localStorage.setItem('saved_games', JSON.stringify(gameIdArr));
  } else {
    localStorage.removeItem('saved_games');
  }
};

// OLD CODE

// export const removeGameId = (gameId) => {
//   const savedGameIds = localStorage.getItem('saved_games')
//     ? JSON.parse(localStorage.getItem('saved_games'))
//     : null;

//   if (!savedGameIds) {
//     return false;
//   }

//   const updatedSavedGameIds = savedGameIds?.filter((savedGameId) => savedGameId !== gameId);
//   localStorage.setItem('saved_games', JSON.stringify(updatedSavedGameIds));

//   return true;
// };

// CONVERT TO NUMBER for gameId

// export function removeGameId(gameIdString) {
//   let savedGameIds = JSON.parse(localStorage.getItem('saved_games')) || [];
  
//   // Convert the gameId to number
//   const gameId = Number(gameIdString);

//   console.log("Before removing: ", savedGameIds); 

//   const updatedSavedGameIds = savedGameIds.filter((id) => id !== gameId);

//   console.log("After removing: ", updatedSavedGameIds); 
  
//   localStorage.setItem('saved_games', JSON.stringify(updatedSavedGameIds));
// }

// CONVERT TO STRING for gameId

export function removeGameId(gameId) {
  let savedGameIds = JSON.parse(localStorage.getItem('saved_games')) || [];

  const updatedSavedGameIds = savedGameIds.filter((id) => String(id) !== gameId);
  
  localStorage.setItem('saved_games', JSON.stringify(updatedSavedGameIds));
}
