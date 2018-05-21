import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

export default class Signup extends Component {
  // doesn't look like you need state/lifecycle in this component, you can use a functional component (const) instead of a class  

    constructor(props) {
        super(props);
        this.state = {};
    }


render() {
  return (
    <div className="modal-container">
      <Modal show={true}>
        <Modal.Header>
          <Modal.Title>Sign in</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label>Name</label>
                <input className="form-control" type="text" />
              <label>Email</label>
                <input className="form-control" type="text" />
              <label>Password</label>
                <input className="form-control" type="password" />
              <label>Confirm Password</label>
                <input className="form-control" type="password" />
              <button className="btn btn-primary">Submit</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

}