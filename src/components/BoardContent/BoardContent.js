import React, { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { isEmpty, cloneDeep } from "lodash";
import { Container } from "react-smooth-dnd";
import BootstrapContainer from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./BoardContent.scss";
import ListColumns from "components/ListColumns/ListColumns";
import { applyDrag } from "utilities/dragDrop";
import {
  createNewColumnAPI,
  updateBoardAPI,
  updateColumnAPI,
  updateCardAPI,
} from "actions/ApiCall";

import { useSelector, useDispatch } from "react-redux";
import {
  fetchFullBoardDetailsAPI,
  selectCurrentFullBoard,
  updateCurrentFullBoard,
} from "redux/activeBoard/activeBoardSlice";

function BoardContent() {
  const dispatch = useDispatch();
  const board = useSelector(selectCurrentFullBoard);
  const [columns, setColumns] = useState([]);
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false);
  const toggleOpenNewColumnForm = () =>
    setOpenNewColumnForm(!openNewColumnForm);

  const newColumnInputRef = useRef(null);

  const [newColumnTitle, setNewColumnTitle] = useState("");
  const onNewColumnTitleChange = (e) => setNewColumnTitle(e.target.value);

  useEffect(() => {
    const boardId = "62dfc91c3f7de993ea2c3b23";
    dispatch(fetchFullBoardDetailsAPI(boardId));
  }, [dispatch]);

  useEffect(() => {
    if (board) {
      setColumns(board.columns);
    }
  }, [board]);

  useEffect(() => {
    if (newColumnInputRef && newColumnInputRef.current) {
      newColumnInputRef.current.focus();
    }
  }, [openNewColumnForm]);

  if (isEmpty(board)) {
    return (
      <div className="not-found" style={{ padding: "10px", color: "white" }}>
        Board not found!
      </div>
    );
  }

  const onColumnDrop = (dropResult) => {
    const originalColumns = cloneDeep(columns);
    let newColumns = [...columns];
    newColumns = applyDrag(newColumns, dropResult);

    const originalBoard = cloneDeep(board);
    let newBoard = { ...board };
    newBoard.columnOrder = newColumns.map((c) => c._id);
    newBoard.columns = newColumns;

    setColumns(newColumns);
    updateCurrentFullBoard(newBoard);

    // Call api update columnOrder in board details
    updateBoardAPI(newBoard._id, newBoard).catch(() => {
      setColumns(originalColumns);
      updateCurrentFullBoard(originalBoard);
    });
  };

  const onCardDrop = (columnId, dropResult) => {
    const { removedIndex, addedIndex } = dropResult;
    if (removedIndex !== null || addedIndex !== null) {
      const originalColumns = cloneDeep(columns);
      let newColumns = [...columns];

      let currentColumn = newColumns.find((c) => c._id === columnId);
      if (!currentColumn) return;
      const newCards = applyDrag(currentColumn.cards, dropResult);
      const newCardOrder = newCards.map((i) => i._id);

      currentColumn = {
        ...currentColumn,
        cards: newCards,
        cardOrder: newCardOrder,
      };

      const currentColumnIndex = newColumns.findIndex(
        (c) => c._id === columnId
      );
      newColumns.splice(currentColumnIndex, 1, currentColumn);

      const originalBoard = cloneDeep(board);
      let newBoard = { ...board };
      newBoard.columnOrder = newColumns.map((c) => c._id);
      newBoard.columns = newColumns;

      flushSync(() => setColumns(newColumns));
      flushSync(() => updateCurrentFullBoard(newBoard));

      if (removedIndex !== null && addedIndex !== null) {
        /**
         * Action: move card inside its column
         * Call api update cardOrder in current column
         */
        updateColumnAPI(currentColumn._id, currentColumn).catch(() => {
          flushSync(setColumns(originalColumns));
          flushSync(() => updateCurrentFullBoard(originalBoard));
        });
      } else {
        /**
         * Action: move card between two column
         */
        // Call api update cardOrder in current column
        updateColumnAPI(currentColumn._id, currentColumn).catch(() => {
          flushSync(setColumns(originalColumns));
          flushSync(() => updateCurrentFullBoard(originalBoard));
        });

        if (addedIndex !== null) {
          let currentCard = cloneDeep(dropResult.payload);
          currentCard.columnId = currentColumn._id;
          // Call api update columnId in current card
          updateCardAPI(currentCard._id, currentCard);
        }
      }
    }
  };

  const addNewColumn = () => {
    if (!newColumnTitle) {
      newColumnInputRef.current.focus();
      return;
    }

    const newColumnToAdd = {
      boardId: board._id,
      title: newColumnTitle.trim(),
    };

    createNewColumnAPI(newColumnToAdd).then((newColumn) => {
      const newColumns = [...columns];
      newColumns.push(newColumn);

      let newBoard = { ...board };
      newBoard.columnOrder = newColumns.map((c) => c._id);
      newBoard.columns = newColumns;

      setColumns(newColumns);
      updateCurrentFullBoard(newBoard);
      setNewColumnTitle("");
      toggleOpenNewColumnForm();
    });
  };

  const onUpdateColumnState = (newColumnToUpdate) => {
    const columnIdToUpdate = newColumnToUpdate._id;

    let newColumns = [...columns];
    const columnIndexToUpdate = newColumns.findIndex(
      (i) => i._id === columnIdToUpdate
    );

    if (newColumnToUpdate._destroy) {
      // remove column
      newColumns.splice(columnIndexToUpdate, 1);
    } else {
      // update column
      newColumns.splice(columnIndexToUpdate, 1, newColumnToUpdate);
    }

    let newBoard = { ...board };
    newBoard.columnOrder = newColumns.map((c) => c._id);
    newBoard.columns = newColumns;
    setColumns(newColumns);
    updateCurrentFullBoard(newBoard);
  };

  return (
    <div className="board-content">
      <Container
        orientation="horizontal"
        onDrop={onColumnDrop}
        getChildPayload={(index) => columns[index]}
        dragHandleSelector=".column-drag-handle"
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: "column-drop-preview",
        }}
      >
        <ListColumns
          columns={columns}
          onCardDrop={onCardDrop}
          onUpdateColumnState={onUpdateColumnState}
        />
      </Container>

      <BootstrapContainer>
        {!openNewColumnForm ? (
          <Row>
            <Col className="add-new-column" onClick={toggleOpenNewColumnForm}>
              <i className="fa-solid fa-plus icon"></i>
              Add another column
            </Col>
          </Row>
        ) : (
          <Row>
            <Col className="enter-new-column">
              <Form.Control
                type="text"
                size="sm"
                placeholder="Enter column title..."
                className="input-enter-new-column"
                ref={newColumnInputRef}
                value={newColumnTitle}
                onChange={onNewColumnTitleChange}
                onKeyDown={(e) => e.key === "Enter" && addNewColumn()}
              />
              <Button variant="success" size="sm" onClick={addNewColumn}>
                Add column
              </Button>
              <span className="cancel-icon" onClick={toggleOpenNewColumnForm}>
                <i className="fa-solid fa-trash"></i>
              </span>
            </Col>
          </Row>
        )}
      </BootstrapContainer>
    </div>
  );
}

export default BoardContent;
