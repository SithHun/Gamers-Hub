// import React, { useState, useEffect } from 'react';
// import { Container, Card, Button, Row, Col } from 'react-bootstrap';
// import { useQuery, useMutation } from '@apollo/client';
// import { QUERY_ME } from '../utils/queries';
// import { REMOVE_GAME } from '../utils/mutations';
// import Auth from '../utils/auth';
// import { removeGameId } from '../utils/localStorage';

// const SavedGames = () => {
//   const { loading, data } = useQuery(QUERY_ME);
//   const [userData, setUserData] = useState({});

//   useEffect(() => {
//     if (data) {
//       setUserData(data.me);
//     }
//   }, [data]);

//   const [removeGame] = useMutation(REMOVE_GAME);

//   const handleDeleteGame = async (gameId) => {
//     const token = Auth.loggedIn() ? Auth.getToken() : null;

//     if (!token) {
//       return false;
//     }

//     try {
//       const { data } = await removeGame({
//         variables: { gameId },
//       });

//       if (data.removeGame) {
//         setUserData({
//           ...userData,
//           savedGames: userData.savedGames.filter((game) => game.gameId !== gameId),
//         });

//         // upon success, remove book's id from localStorage
//         removeGameId(gameId);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (loading) {
//     return <h2>LOADING...</h2>;
//   }

//   const savedGames = userData.savedGames || [];

//   return (
//     <>
//         <Container fluid className="text-light bg-dark p-5">
//           <h1>Viewing saved games!</h1>
//         </Container>
//       <Container>
//       <h2 className="pt-5">
//           {savedGames.length
//             ? `Viewing ${savedGames.length} saved ${savedGames.length === 1 ? 'game' : 'games'}:`
//             : 'You have no saved games!'}
//         </h2>
//         <Row>
//           {savedGames.map((game) => {
//             return (
//               <Col md="4" key={game.gameId}>
//                 <Card border="dark">
//                   {game.image && (
//                     <Card.Img src={game.image} alt={`The cover for ${game.title}`} variant="top" />
//                   )}
//                   <Card.Body>
//                     <Card.Title>{game.title}</Card.Title>
//                     {/* <p className="small">Authors: {game.authors.join(', ')}</p> */}
//                     <Card.Text>{game.description}</Card.Text>
//                     <Button className="btn-block btn-danger" onClick={() => handleDeleteGame(game.gameId)}>
//                       Delete this Game!
//                     </Button>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             );
//           })}
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default SavedGames;
