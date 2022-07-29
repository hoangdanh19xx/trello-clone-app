import React from "react";
import "./Card.scss";

function Card({ card }) {
  return (
    <div className="card-item">
      {card.cover && (
        <img
          src={card.cover}
          className="card-cover"
          alt="trello-app-img"
          onMouseDown={(e) => e.preventDefault()}
        />
      )}
      {card.title}
    </div>
  );
}

export default React.memo(Card);
