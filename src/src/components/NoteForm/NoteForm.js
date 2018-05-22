import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import AceEditor from 'react-ace';
import { connect } from 'react-redux';

import './NoteForm.css';

import {
  createNote,
  postNote,
} from '../../actions/note';

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
      languageOptions: ['javascript', 'html', 'css', 'python'],
      toggleLanguage: false
    };
  }

  toggleLanguageButton = () => {
    this.setState({ toggleLanguage: !this.state.toggleLanguage });
  };

  handleNewLanguage = e => {
    this.setState({
      language: e.target.innerHTML,
      toggleLanguage: false
    });
  }

  handleNewNoteInput = (e) => {
    const name = !e.target ? 'code' : e.target.name;
    const value = !e.target ? e : e.target.value;
    this.props.createNote(name, value);
  }

  handleNewNote = e => {
    e.preventDefault();
    let newNote = {
      title: this.props.pendingText.title,
      text: this.props.pendingText.body,
      code: this.props.pendingText.code,
      folder: this.props.folder,
    };
    const { dispatch } = this.props;
    dispatch(postNote(newNote));
    this.props.toggleNewNote();
  };

  render() {

    const { folder, pendingText } = this.props;

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
      <div className="note">
        <form >
          <div className="note-input-group">

            <label><strong> Add a Note:</strong> </label>
            <label><strong> {folder}</strong> </label>
            <input
              type="text"
              placeholder="Title"
              value={pendingText.title}
              onChange={this.handleNewNoteInput}
              name="title">
            </input>

            <textarea
              placeholder="Add a Note"
              onChange={this.handleNewNoteInput}
              onKeyPress={this.props.handleKeyPress}
              value={pendingText.body}
              name="body">
            </textarea>

            <AceEditor
              mode={this.state.language}
              theme="clouds_midnight"
              editorProps={{ $blockScrolling: true }}
              name="code"
              value={pendingText.code}
              onChange={this.handleNewNoteInput}
              style={braceStyle}
            />

            <div className="form-buttons">
              {languageButton}
            </div>
            <button type="submit" onClick={this.handleNewNote}><FontAwesome className='fa fa-floppy-o' /></button>
            <button type="button" onClick={this.props.toggleNewNote}><FontAwesome className='fa fa-times' /></button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  pendingText: state.pendingText,
  folder: state.selectedFolder,
});

const mapDispatchToProps = dispatch => ({
  createNote: (name, value) => dispatch(createNote(name, value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(NoteForm);
