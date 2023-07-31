import React from "react";
import { Carousel } from "react-bootstrap";
import gameData from "../utils/gameData.json";

export default function GameCarousel() {
  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <img
            src={gameData[30].background_image}
            text={gameData[30].name}
          ></img>
          <Carousel.Caption>
            <h3>{gameData[30].name}</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={gameData[40].background_image}
            text={gameData[40].name}
          ></img>
          <Carousel.Caption>
            <h3>{gameData[40].name}</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
