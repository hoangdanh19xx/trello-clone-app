import Column from "components/Column/Column";
import React from "react";
import "./BoardContent.scss";

function BoarContent() {
  return (
    <div className="board-content">
      <Column />
      <Column />
      <Column />
      <Column />
      <Column />
    </div>
  );
}

export default BoarContent;
