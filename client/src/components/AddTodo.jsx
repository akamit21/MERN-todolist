import React, { Component } from "react";
import { Container, Form } from "react-bootstrap";

class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      priority: "",
      notes: "",
      completed: false
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <Container className="mt-5">
        <Form>
          <Form.Group controlId="">
            <Form.Label className="font-weight-bold">
              Todo Description
            </Form.Label>
            <Form.Control
              type="text"
              name="description"
              size="lg"
              placeholder="Todo Description"
              value={this.state.description}
              onChange={e => this.handleChange(e)}
            />
          </Form.Group>
          <Form.Group controlId="">
            <Form.Label className="font-weight-bold">
              Select Priority
            </Form.Label>
            <Form.Control
              as="select"
              name="priority"
              size="lg"
              onChange={e => this.handleChange(e)}
            >
              <option defaultValue="">Choose ... </option>
              <option>Critical</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="">
            <Form.Label className="font-weight-bold">Extra Notes</Form.Label>
            <Form.Control
              as="textarea"
              name="notes"
              size="lg"
              rows="3"
              value={this.state.notes}
              onChange={e => this.handleChange(e)}
            />
          </Form.Group>
        </Form>
      </Container>
    );
  }
}

export default AddTodo;
