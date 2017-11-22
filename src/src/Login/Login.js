import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

export default class Login extends Component {
    state = {
        show: false
    }
    
    componentDidMount() {
        this.setState({show: true});
    }
    
    render() {
    return (
        <div className="modal-container">
            <Modal show={this.state.show}>
                <Modal.Header>
                    <Modal.Title>Sign in</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label>Email</label>
                            <input className="form-control" type="text" />
                            <label>Password</label>
                            <input className="form-control" type="password" />
                            <button className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
    }
};