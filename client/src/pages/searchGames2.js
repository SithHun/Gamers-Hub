// import React, { useState, useEffect } from "react";
// import { Container, Col, Form, Button, Card, Row } from "react-bootstrap";
// import { useMutation } from "@apollo/client";
// import { searchRAWGGames } from "../utils/API";
// import { SAVE_GAME } from "../utils/mutations";
// import Auth from "../utils/auth";
// import { saveGameIds, getSavedGameIds } from "../utils/localStorage";
// import formatDate from '../utils/formatDate'

const SearchGames = () => {
  const [searchedGames, setSearchedGames] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [savedGameIds, setSavedGameIds] = useState(getSavedGameIds());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

//   const [saveGame] = useMutation(SAVE_GAME);

  useEffect(() => {
    return () => saveGameIds(savedGameIds);
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return true;
    }

    try {
      setLoading(true);

      const response = await searchRAWGGames(searchInput);

      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const { results } = await response.json();

      const gameData = results.map((game) => ({
        gameId: game.id,
        title: game.name,
        image: game.background_image || "",
        released: game.released,
        genres: game.genres.map(genre => genre.name).join(', ')
      }));

      setSearchedGames(gameData);
      setSearchInput("");

      setLoading(false);
      setError(null);
      // console.log(gameData);
    } catch (err) {
      setLoading(false);
      setError("An error occurred while searching.");
      console.error(err);
    }
  };

  const handleSaveGame = async (gameId) => {
    const gameToSave = searchedGames.find((game) => game.gameId === gameId);
      // const gameIdStr = gameId.toString();
      // const gameToSave = searchedGames.find((game) => game.gameId === gameIdStr);

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    if (!gameToSave) {
      console.error(`No game found with id ${gameId}`);
      return;
    }

    // const gameData = {
    //   title: gameToSave.title,
    //   gameId: gameToSave.gameId.toString(),
    //   image: gameToSave.image,
    //   released: gameToSave.released.toString(),
    //   genres: gameToSave.genres,
    //   link: gameToSave.link
    // };

    // console.log(gameToSave);

    const gameData = {
      title: gameToSave.title,
      description: gameToSave.description || "No description available", // use a default value if no description
      gameId: gameToSave.gameId.toString(),
      // gameId: gameId.toString(),
      image: gameToSave.image,
    };


    // console.log("gameData: ", gameData);

    try {
      const { data } = await saveGame({
        variables: { gameData },
      });

      // console.log("saveGame response: ", data);

      if (data.saveGame) {
        setSavedGameIds([...savedGameIds, gameToSave.gameId]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="text-light bg-transparent p-5">
        <Container style={{padding: "5px", margin: "10px",  }} >
          {/* <h1>Search for Games!</h1> */}
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={10} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search for a game"
                />
              </Col>
              <Col xs={8} md={4}>
                <Button
                  type="submit"
                  variant="success"
                  size="lg"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Submit Search"}
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>

      {/* {error && <div className="error">{error}</div>} */}

      <Container>
        <h2 className="pt-5">
          {searchedGames.length
            ? `Viewing ${searchedGames.length} results:`
            : ""}
        </h2>
        <Row>
          {searchedGames.map((game, key) => {
            return (
              <Col md="3" key={key}>
                <div className="card-container">
                <Card key={game.gameId} border="dark">
                  {game.image ? (
                    <Card.Img
                      src={game.image}
                      alt={`The cover for ${game.title}`}
                      variant="top"
                      className="img-fluid card-image"
                    />
                  ) : null}
                  <Card.Body className="reviewCardtwo text-center">
                    <Card.Title>{game.title}</Card.Title>
                    {/* <Card.Text>{game.rating}</Card.Text> */}
                    <Card.Text>Released {game.released ? formatDate(game.released) : 'N/A'}</Card.Text>
                    <Card.Text>{game.genres}</Card.Text>
                    <div className="fixed-button-wrapper">
                    {Auth.loggedIn() && (
                      <Button
                        disabled={savedGameIds?.some(
                          (savedGameId) => savedGameId === game.gameId
                        )}
                        className="btn-block btn-info"
                        onClick={() => handleSaveGame(game.gameId)}
                      >
                        {savedGameIds?.some(
                          (savedGameId) => savedGameId === game.gameId
                        )
                        ? "Saved"
                        : "ADD"}
                      </Button>
                    )}
                    </div>
                  </Card.Body>
                </Card>
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

// export default SearchGames;
//adjust code edit gane search