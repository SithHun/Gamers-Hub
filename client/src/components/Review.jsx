import React, { useEffect } from "react";
import WebFont from "webfontloader";
import { Link } from 'react-router-dom';

export default function Review(props) {

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Lumanosimo", "Audiowide", "Press Start 2P"],
      },
    });
  });

  return (
    <div className="reviewCard">
      <h4 className="quote">
        "<span className="title">{props.title} </span>"
      </h4>
      <div className="flexWrapper gamePanel">
        <img className="thumbnail" src={props.image} alt={props.title}></img>
        {/* <h5 className="game">{props.game}</h5> */}
        <h5 className="game"><Link to={`/search?query=${props.game}`}>{props.game}</Link></h5>
        <h5 className="platform">{props.platform}</h5>
        <div className="reviewRating">
          <h5 className="ratingText">{props.rating}</h5>
          <h5 className="outOf">/100</h5>
        </div>
      </div>
      <div className="flexWrapper">
        <h6 className="reviewBody">
          {props.body}
          <span className="elipse">
            ...<span className="readMore">Read More</span>
          </span>
        </h6>
      </div>
      <h5 className="author">- {props.author}</h5>
      <h6 className="date">{props.date}</h6>
    </div>
  );
}
