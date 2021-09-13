import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

class BookFormModel extends React.Component {
  render() {
    return (
      <div>
        <Modal show={this.props.show} onHide={this.props.handleClose} >
          <Modal.Header closeButton>
            <Modal.Title>Add Your Book</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form onSubmit={this.props.handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>The Book Name</Form.Label>
                <Form.Control type="text" name="bookName" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>The Book Description</Form.Label>
                <Form.Control type="text" name="bookDescription" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>The Book Status</Form.Label>
                <Form.Control type="text" name="bookStatus" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Your Email</Form.Label>
                <Form.Control type="text" name="email" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>{" "}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary">Close</Button>
            <Button variant="primary">Save changes</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default BookFormModel;
