import React, { useEffect, useState } from "react";
import { isEmpty } from "lodash";

import "./BoardContent.scss";

import Column from "components/Column/Column";
import { mapOrder } from "utilities/sorts";

import { initialData } from "actions/initalData";

function BoarContent() {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const boardFromDB = initialData.boards.find(
      (board) => board.id === "board-1"
    );

    if (boardFromDB) {
      setBoard(boardFromDB);
      setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, "id"));
    }
  }, []);

  if (isEmpty(board)) {
    return (
      <div className="not-found" style={{ padding: "10px", color: "white" }}>
        Board not found!
      </div>
    );
  }

  return (
    <div className="board-content">
      {columns.map((column) => (
        <Column key={column.id} column={column} />
      ))}
    </div>
  );
}

export default BoarContent;
