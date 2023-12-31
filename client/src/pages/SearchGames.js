import React, { useState, useEffect } from "react";
import { Container, Col, Form, Button, Card, Row } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { searchRAWGGames } from "../utils/API";
import { SAVE_GAME } from "../utils/mutations";
import Auth from "../utils/auth";
import { saveGameIds, getSavedGameIds } from "../utils/localStorage";
import formatDate from '../utils/formatDate'
import { useLocation } from "react-router-dom";
// import SiteFooter from "../components/Footer";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchGames = () => {
  const [searchedGames, setSearchedGames] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [savedGameIds, setSavedGameIds] = useState(getSavedGameIds());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [saveGame] = useMutation(SAVE_GAME);

  let query = useQuery().get("query");

  useEffect(() => {
    if (query) {
      setSearchInput(query);
      handleFormSubmit(null, query); // manually trigger search
    }
  }, [query]);

  useEffect(() => {
    return () => saveGameIds(savedGameIds);
  });

  const handleFormSubmit = async (event, queryInput) => {
    if (event) event.preventDefault();

    const input = queryInput || searchInput;

    if (!input) {
      return false;
    }

    // if (!searchInput) {
    //   return false;
    // }

    try {
      setLoading(true);

      const response = await searchRAWGGames(input);

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
<Container fluid className="text-light bg-dark pt-5 pb-5">
  <Container style={{ marginLeft: "25px" }}>
    <h1 className="searchHeader">Search for Games!</h1>
    <Form onSubmit={handleFormSubmit}>
      <Row style={{ margin: "4px", paddingTop: "12px" }}>
        <Col xs={12} md={4}>
          <Form.Control
            className="search-input"
            name="searchInput"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            type="text"
            size="lg"
            placeholder="Search for a game"
          />
        </Col>
        <Col xs={12} md={2}>
          <Button
            type="submit"
            variant="success"
            size="lg"
            disabled={loading}
            style={{ color: 'black', backgroundColor: 'darkgray', borderColor: 'gray' }}
            className="hoverButton"
          >
            {loading ? "Loading..." : "Search"}
          </Button>
        </Col>
      </Row>
    </Form>
  </Container>
</Container>

      {error && <div className="error">{error}</div>}

      <Container>
        {/* <h2 className="pt-5">
          {searchedGames.length
            ? `Viewing ${searchedGames.length} results:`
            : "Search for a game to begin"}
        </h2> */}
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
                        className={
                          savedGameIds?.some(
                            (savedGameId) => savedGameId === game.gameId
                          )
                          ? "saved-button"
                          : "add-button"
                        }
                        onClick={() => handleSaveGame(game.gameId)}
                      >
                        {savedGameIds?.some(
                          (savedGameId) => savedGameId === game.gameId
                        )
                        ? "saved"
                        : "add"}
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
      {/* <SiteFooter /> */}
    </>
  );
};

export default SearchGames;
