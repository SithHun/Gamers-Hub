import React from "react";

export default function SearchItems(props) {
    return (
        <div className="reviewCard">
      <h4 className="quote">"<span className="title">{props.title} </span>"</h4>
      <div className="flexWrapper gamePanel">
        <img className="thumbnail" src={props.image}></img>
        <h5 className="game">{props.game}</h5>
        <h5 className="reviewRating">{props.rating}<span className="outOf">/100</span></h5>
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