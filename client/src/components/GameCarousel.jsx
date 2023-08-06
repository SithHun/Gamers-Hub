import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import gameData from "../utils/gameData.json";
import CarouselItem from "./CarouselItem";
import { Link } from "react-router-dom";

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
              <Carousel.Caption >
                <h3><Link className="carouselLink" to={`/search?query=${game.name}`}>{game.name}</Link></h3>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
}
