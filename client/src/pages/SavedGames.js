import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Row, Col, Modal, Form } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME, QUERY_DISCUSSIONS } from '../utils/queries';
import { REMOVE_GAME, ADD_DISCUSSION } from '../utils/mutations';
import Auth from '../utils/auth';
import { removeGameId } from '../utils/localStorage';
import { EDIT_DISCUSSION, DELETE_DISCUSSION } from '../utils/mutations';


const SavedGames = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [userData, setUserData] = useState({});
  const [selectedGame, setSelectedGame] = useState(null);
  const [show, setShow] = useState(false);
  const [newDiscussion, setNewDiscussion] = useState("");
  const [editingDiscussion, setEditingDiscussion] = useState(null);
  const [updatedDiscussionBody, setUpdatedDiscussionBody] = useState("");

  const {
    loading: loadingDiscussions,
    data: discussionsData,
    refetch: refetchDiscussions,
  } = useQuery(QUERY_DISCUSSIONS, {
    variables: { gameId: selectedGame },
    skip: !selectedGame,
  });

  // hooks for mutations
  const [removeGame] = useMutation(REMOVE_GAME);
  const [addDiscussion] = useMutation(ADD_DISCUSSION);
  const [editDiscussion] = useMutation(EDIT_DISCUSSION);
  const [deleteDiscussion] = useMutation(DELETE_DISCUSSION);


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

  const handleDeleteDiscussion = async (discussionId, gameId) => {
    try {
      await deleteDiscussion({
        variables: { userId: userData._id, gameId },
      });
      // Refetch discussions to immediately reflect the changes in the UI.
      refetchDiscussions();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditDiscussion = async () => {
    if (editingDiscussion && updatedDiscussionBody) {
      try {
        await editDiscussion({
          variables: { userId: userData._id, gameId: selectedGame, body: updatedDiscussionBody },
        });
        // Reset the states and refetch discussions.
        setEditingDiscussion(null);
        setUpdatedDiscussionBody("");
        refetchDiscussions();
      } catch (err) {
        console.error(err);
      }
    }
  };


  if (loading) {
    return <h2>LOADING...</h2>;
  }

  const savedGames = userData.savedGames || [];

  return (
    <>
      <Container fluid className="text-light bg-dark p-5">
        <h1>Welcome back!</h1>
        <h3>{userData.username}</h3>
      </Container>
      <Container>
        <h2 className="pt-5">
          {savedGames.length
            ? `${savedGames.length} added ${savedGames.length === 1 ? 'collection' : 'collections'}:`
            : 'You have no saved collection!'}
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
      <Modal show={show} onHide={handleClose} centered dialogClassName="custom-modal" size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Discussions</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ margin: "10px" }}>
          {!loadingDiscussions && discussionsData && discussionsData.discussions.length > 0
            ? discussionsData.discussions.map((discussion) => (
                <div key={discussion._id}>
                  <p>
                    <strong>{discussion.userId.username}</strong>: {discussion.body}
                  </p>
                  {editingDiscussion === discussion._id ? (
                    <div>
                      <Form.Control
                        type="text"
                        value={updatedDiscussionBody}
                        onChange={(e) => setUpdatedDiscussionBody(e.target.value)}
                        placeholder="Update your discussion here..."
                      />
                      <Button onClick={handleEditDiscussion}>Apply changes</Button>
                      <Button onClick={() => setEditingDiscussion(null)}>Cancel</Button>
                    </div>
                  ) : (
                    <div>
                      <Button onClick={() => {
                        setEditingDiscussion(discussion._id);
                        setUpdatedDiscussionBody(discussion.body);
                      }}>
                        Edit
                      </Button>
                      <Button onClick={() => handleDeleteDiscussion(discussion._id, discussion.gameId)}>
                        Delete
                      </Button>
                    </div>
                  )}
                </div>
              ))
            : "No discussions for this game yet."}
  
          {/* Add discussion form */}
          <Form onSubmit={handleAddDiscussion} style={{ padding: '1em' }}>
          <Row className="align-items-center">
          <Col>
            <Form.Group>
              {/* <Form.Label>Add a Discussion</Form.Label> */}
              <Form.Control
                type="text"
                value={newDiscussion}
                onChange={(e) => setNewDiscussion(e.target.value)}
                placeholder="Write your discussion here..."
                style={{ marginTop: "35px" }}
              />
            </Form.Group>
            </Col>
            <Col xs="auto">
            <Button variant="primary" type="submit" style={{ color: 'azure', backgroundColor: 'teal', borderColor: 'teal', marginTop: "35px" }}>
              Submit
            </Button>
            </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} style={{ color: 'azure', backgroundColor: 'teal', borderColor: 'teal'}}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
  
};

export default SavedGames;
