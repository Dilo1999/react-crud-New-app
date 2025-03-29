import React from 'react';
import { Button, Container, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function FirstScreen() {
  return (
    <Container className="text-center mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h1 className="mb-4 display-4"><b>Welcome to CRUD Application</b></h1><br></br>
          <Image src="/CRUD.jpeg" alt="CRUD Operations" width={900} height={800} fluid rounded className="mb-5 shadow-lg" />
          <Link to="/second"><br></br>
            <Button variant="primary" size="xl" className="px-4 py-3">ENTER</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default FirstScreen;
