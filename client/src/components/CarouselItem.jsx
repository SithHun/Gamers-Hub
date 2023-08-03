import React, { useState } from "react";

export default function CarouselItem(props) {
  const [play, setPlay] = useState(props.image);

  const handleHover = () => {
    if (play === props.image) {
      setPlay(props.clip);
    } else {
      setPlay(props.image);
    }
  };

  return (
    <img
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      className="carouselImage"
      src={play}
      text={props.name}
    ></img>
  );
}
