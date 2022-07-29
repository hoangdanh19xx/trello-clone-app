import React from "react";
import "./BoardBar.scss";

import BootstrapContainer from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function BoardBar() {
  return (
    <nav className="navbar-board">
      <BootstrapContainer className="trello-container">
        <Row>
          <Col sm={10} xs={12} className="col-no-padding">
            <div className="board-info">
              <div className="item board-logo-icon">
                <i className="fa-solid fa-coffee-bean"></i>&nbsp;&nbsp;
                <strong>MERNSTACK</strong>
              </div>
              <div className="divider"></div>

              <div className="item board-type">Private Workspace</div>
              <div className="divider"></div>

              <div className="item member-avatar">
                <img
                  src="https://images.unsplash.com/photo-1658786422874-f36281333baa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNDl8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                  alt="avatar"
                />
                <img
                  src="https://images.unsplash.com/photo-1658848588646-58417ec28548?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNTZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                  alt="avatar"
                />
                <img
                  src="https://images.unsplash.com/photo-1657299143322-934f44698807?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNjF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                  alt="avatar"
                />
                <img
                  src="https://images.unsplash.com/photo-1658786422874-f36281333baa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNDl8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                  alt="avatar"
                />
                <img
                  src="https://images.unsplash.com/photo-1658829839256-aa4ed17b0622?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNzd8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                  alt="avatar"
                />
                <span className="more-members">+7</span>
                <span className="invite">Invite</span>
              </div>
            </div>
          </Col>
          <Col sm={2} xs={12} className="col-no-padding">
            <div className="board-actions">
              <div className="item menu">
                <i className="fa-solid fa-ellipsis"></i>
                Show menu
              </div>
            </div>
          </Col>
        </Row>
      </BootstrapContainer>
    </nav>
  );
}

export default BoardBar;
