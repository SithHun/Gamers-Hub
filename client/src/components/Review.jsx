import React from "react";

export default function Review(props) {
  return (
    <div>
        <img src={props.image}></img>
      <h4>"{props.title}"</h4>
      <h5>{props.rating} / 5</h5>
      <h5>{props.game}</h5>
      <h6>
        {props.body} <span>- {props.author}</span>
      </h6>
    </div>
  );
}
