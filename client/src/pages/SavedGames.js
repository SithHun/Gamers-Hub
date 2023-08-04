import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Row, Col, Modal, Form } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME, QUERY_DISCUSSIONS } from '../utils/queries';
import { REMOVE_GAME, ADD_DISCUSSION } from '../utils/mutations';
import Auth from '../utils/auth';
import { removeGameId } from '../utils/localStorage';

const SavedGames = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [userData, setUserData] = useState({});
  const [selectedGame, setSelectedGame] = useState(null);
  const [show, setShow] = useState(false);
  const [newDiscussion, setNewDiscussion] = useState("");

  const {
    loading: loadingDiscussions,
    data: discussionsData,
    refetch: refetchDiscussions,
  } = useQuery(QUERY_DISCUSSIONS, {
    variables: { gameId: selectedGame },
    skip: !selectedGame,
  });

  const [removeGame] = useMutation(REMOVE_GAME);
  const [addDiscussion] = useMutation(ADD_DISCUSSION);

  useEffect(() => {
    if (data) {
      setUserData(data.me);
    }
  }, [data]);

  const handleShow = (gameId) => {
    setSelectedGame(gameId);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleDeleteGame = async (gameId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeGame({
        variables: { gameId },
      });

      if (data.removeGame) {
        setUserData({
          ...userData,
          savedGames: userData.savedGames.filter((game) => String(game.gameId) !== gameId),
        });
        
        removeGameId(String(gameId));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddDiscussion = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addDiscussion({
        variables: {
          gameId: selectedGame,
          body: newDiscussion,
          userId: userData._id,
        },
      });

      refetchDiscussions();
      setNewDiscussion("");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  const savedGames = userData.savedGames || [];

  return (
    <>
      <Container fluid className="text-light bg-dark p-5">
        <h1>Viewing saved games!</h1>
      </Container>
      <Container>
        <h2 className="pt-5">
          {savedGames.length
            ? `Viewing ${savedGames.length} saved ${savedGames.length === 1 ? 'game' : 'games'}:`
            : 'You have no saved games!'}
        </h2>
        <Row>
          {savedGames.map((game) => {
            return (
              <Col md="4" key={game.gameId}>
                <Card border="dark">
                  {game.image && (
                    <Card.Img src={game.image} alt={`The cover for ${game.title}`} variant="top" />
                  )}
                  <Card.Body>
                    <Card.Title>{game.title}</Card.Title>
                    <Card.Text>{game.description}</Card.Text>
                    <Button className="btn-block btn-danger" onClick={() => handleDeleteGame(game.gameId)}>
                      Delete this Game!
                    </Button>
                    <Button variant="primary" onClick={() => handleShow(game.gameId)}>
                      Show Discussions
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>

      {/* Discussion modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Discussions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!loadingDiscussions && discussionsData && discussionsData.discussions.length > 0
            ? discussionsData.discussions.map((discussion) => (
                <p key={discussion._id}>
                  <strong>{discussion.userId.username}</strong>: {discussion.body}
                </p>
              ))
            : "No discussions for this game yet."}

          {/* Add discussion form */}
          <Form onSubmit={handleAddDiscussion}>
            <Form.Group>
              <Form.Label>Add a Discussion</Form.Label>
              <Form.Control
                type="text"
                value={newDiscussion}
                onChange={(e) => setNewDiscussion(e.target.value)}
                placeholder="Write your discussion here..."
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SavedGames;
