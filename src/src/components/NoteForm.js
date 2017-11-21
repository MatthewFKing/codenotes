import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import AceEditor from 'react-ace';
import { connect } from 'react-redux';

import {
  createNote,
  postNote,
} from '../actions/note';

import 'brace/mode/javascript';
import 'brace/mode/css';
import 'brace/mode/html';
import 'brace/mode/python';
import 'brace/theme/clouds_midnight';

let braceStyle = {
  height: "300px",
  width: "100%"
};

class NoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: 'javascript',
      languageOptions: ['javascript','html','css','python'],
      toggleLanguage: false
    };
  }

  toggleLanguageButton = () => {
    this.setState({toggleLanguage: !this.state.toggleLanguage});
  };

  handleNewLanguage = e => {
    this.setState({
      language: e.target.innerHTML,
      toggleLanguage: false
    });
  }

  returnHome = () => {
    this.props.history.push('/');
  }

  handleNewNoteInput = (e) => {
    const name = e.target.name;
    const { dispatch } = this.props;
    dispatch(createNote(name, e.target.value));
  }

  handleCodeInput = (value) => {
    const { dispatch } = this.props;
    dispatch(createNote("code", value));
  }

  handleNewNote = e => {
    e.preventDefault();
    let newNote = {
      title: this.props.pendingText.title,
      text: this.props.pendingText.body,
      code: this.props.pendingText.code
    };
    const { dispatch } = this.props;
    dispatch(postNote(newNote));
    this.returnHome();
  };

render() {
  let languageButton = null;
  if (!this.state.toggleLanguage) {
    languageButton =
        <button
          type="button"
          className="language-button"
          onClick={this.toggleLanguageButton}>
          {this.state.language}
        </button>;
  } else {
    languageButton =
        <ul>
          {this.state.languageOptions.map(option =>
            <li
              onClick={this.handleNewLanguage}>
              {option}
            </li>
          )}
          </ul>;
  }
  return (
<div>
  <div className="note-form">
    <form >
      <div className="note-input-group">

        <label><strong> Add a Note:</strong> </label>

        <input
          type="text"
          placeholder="Title"
          value={this.props.pendingText.title}
          onChange={this.handleNewNoteInput}
          name="title">
        </input>

        <textarea
          placeholder="Add a Note"
          onChange={this.handleNewNoteInput}
          onKeyPress={this.props.handleKeyPress}
          value={this.props.pendingText.body}
          name="body">
        </textarea>

        <AceEditor
          mode={this.state.language}
          theme="clouds_midnight"
          editorProps={{$blockScrolling: true}}
          name="code"
          value={this.props.pendingText.code}
          onChange={this.handleCodeInput}
          style={braceStyle}
        />

        <div className="form-buttons">
          {languageButton}
        </div>
        <button type="submit" onClick={this.handleNewNote}><FontAwesome className='fa fa-floppy-o'/></button>
        <button type="button" onClick={this.returnHome}><FontAwesome className='fa fa-times'/></button>
      </div>
    </form>
  </div>
</div>
)}
}

const mapStateToProps = state => ({
  pendingText: state.pendingText
});

export default connect(mapStateToProps)(NoteForm);
