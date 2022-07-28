import React from "react";
import BootstrapContainer from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import "./AppBar.scss";

function AppBar() {
  return (
    <nav className="navbar-app">
      <BootstrapContainer className="trello-container">
        <Row>
          <Col sm={5} xs={12} className="col-no-padding">
            <div className="app-actions">
              <div className="item all">
                <i className="fa-brands fa-themeco"></i>
              </div>
              <div className="item home">
                <i className="fa-solid fa-house"></i>
              </div>
              <div className="item boards">
                <i className="fa-solid fa-line-columns"></i>&nbsp;&nbsp;
                <strong>Boards</strong>
              </div>
              <div className="item search">
                <InputGroup className="group-search">
                  <Form.Control
                    className="input-search"
                    placeholder="Jump to..."
                  />
                  <InputGroup.Text className="input-icon-search">
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </InputGroup.Text>
                </InputGroup>
              </div>
            </div>
          </Col>
          <Col sm={2} xs={12} className="col-no-padding">
            <div className="app-branding text-center">
              <a href="!#" target="_blank">
                <img
                  src="https://images.unsplash.com/photo-1658830123727-4febcf91ec80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0MHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
                  alt="trello-logo"
                  className="top-logo"
                />
                <span className="trello-slogan">trello-clone</span>
              </a>
            </div>
          </Col>
          <Col sm={5} xs={12} className="col-no-padding">
            <div className="user-actions">
              <div className="item quick">
                <i className="fa-solid fa-plus"></i>
              </div>
              <div className="item news">
                <i className="fa-solid fa-circle-info"></i>
              </div>
              <div className="item notification">
                <i className="fa-solid fa-bell"></i>
              </div>
              <div className="item user-avatar">
                <img
                  src="https://images.unsplash.com/photo-1644982647711-9129d2ed7ceb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNDN8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                  alt="avatar-dev"
                  title="avatar"
                />
              </div>
            </div>
          </Col>
        </Row>
      </BootstrapContainer>
    </nav>
  );
}

export default AppBar;
