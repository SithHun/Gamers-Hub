import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import gameData from "../utils/gameData.json";
import CarouselItem from "./CarouselItem";

export default function GameCarousel() {
  const gamesArr = gameData.slice(0, 5);

  return (
    <div>
      <Carousel>
        {gamesArr.map((game, key) => {
          return (
            <Carousel.Item key={key}>
              <CarouselItem
                image={game.background_image}
                clip={game.clip}
              ></CarouselItem>
              <Carousel.Caption>
                <h3>{game.name}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
}
