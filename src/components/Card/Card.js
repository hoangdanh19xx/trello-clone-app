import React from "react";
import "./Card.scss";

function Card({ card }) {
  return (
    <li className="card-item">
      {card.cover && (
        <img src={card.cover} className="card-cover" alt="trello-app-img" />
      )}
      {card.title}
    </li>
  );
}

export default Card;
