import React, { useCallback, useEffect, useState } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";

import "./Column.scss";
import Card from "components/Card/Card";
import ConfirmModal from "components/Common/ConfirmModal";
import { mapOrder } from "utilities/sorts";
import { MODAL_ACTION_CONFIRM } from "utilities/constants";
import {
  saveContentAfterPressEnter,
  selectAllInlineText,
} from "utilities/contentEditable";

function Column({ column, onCardDrop, onUpdateColumn }) {
  const cards = mapOrder(column.cards, column.cardOrder, "id");

  const [showConfirmModal, setShowConfimModal] = useState(false);
  const toggleShowConfirmModal = () => setShowConfimModal(!showConfirmModal);

  const [columnTitle, setColumnTitle] = useState("");
  const handleColumnTitleChange = useCallback(
    (e) => setColumnTitle(e.target.value),
    []
  );

  useEffect(() => {
    setColumnTitle(column.title);
  }, [column.title]);

  const onConfirmModalAction = (type) => {
    if (type === MODAL_ACTION_CONFIRM) {
      const newColumn = {
        ...column,
        _destroy: true,
      };
      onUpdateColumn(newColumn);
    }
    toggleShowConfirmModal();
  };

  const handleColumnTitleBlur = () => {
    const newColumn = {
      ...column,
      title: columnTitle,
    };
    onUpdateColumn(newColumn);
  };

  return (
    <div className="column">
      <header className="column-drag-handle">
        <div className="column-title">
          <Form.Control
            type="text"
            size="sm"
            className="trello-content-editable"
            value={columnTitle}
            onChange={handleColumnTitleChange}
            onBlur={handleColumnTitleBlur}
            onKeyDown={saveContentAfterPressEnter}
            onClick={selectAllInlineText}
            onMouseDown={(e) => e.preventDefault()}
            spellCheck="false"
          />
        </div>
        <div className="column-dropdown-actions">
          <Dropdown>
            <Dropdown.Toggle
              id="dropdown-basic"
              size="sm"
              className="dropdown-btn"
            ></Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item>Add card...</Dropdown.Item>
              <Dropdown.Item onClick={toggleShowConfirmModal}>
                Remove column...
              </Dropdown.Item>
              <Dropdown.Item>
                Move all cards in this column (beta)...
              </Dropdown.Item>
              <Dropdown.Item>
                Move all cards in this column (beta)...
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>
      <div className="card-list">
        <Container
          groupName="columns"
          onDrop={(dropResult) => onCardDrop(column.id, dropResult)}
          getChildPayload={(index) => cards[index]}
          dragClass="card-ghost"
          dropClass="card-ghost-drop"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: "card-drop-preview",
          }}
          dropPlaceholderAnimationDuration={200}
        >
          {cards.map((card, index) => (
            <Draggable key={index}>
              <Card card={card} />
            </Draggable>
          ))}
        </Container>
      </div>
      <footer>
        <div className="footer-actions">
          <i className="fa-solid fa-plus icon"></i>
          Add another card
        </div>
      </footer>

      <ConfirmModal
        show={showConfirmModal}
        onAction={onConfirmModalAction}
        title="Remove column"
        content={`Are you sure want to remove <strong>${column.title}</strong>. <br/>All related cards will also be removed!`}
      />
    </div>
  );
}

export default Column;
