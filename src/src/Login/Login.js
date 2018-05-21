import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

export default class Login extends Component {
    state = {
        show: false
    }
    
    // why are you using componentDidMount instead of setting show to true initially?
    // it also doesn't look like there are any other functions to set state, so you might not need state at all

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