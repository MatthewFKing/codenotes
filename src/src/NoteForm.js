import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import AceEditor from 'react-ace';
import { withRouter } from 'react-router-dom';


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
    <form onSubmit={this.props.handleNewNote}>
      <div className="note-input-group">
        <label><strong> Add a Note:</strong> </label>
        <input
          type="text"
          placeholder="Title"
          value={this.props.pendingNoteTitle}
          onChange={this.props.handleNewNoteInput}
          name="pendingNoteTitle">
        </input>
        <textarea
          placeholder="Add a Note"
          onChange={this.props.handleNewNoteInput}
          onKeyPress={this.props.handleKeyPress}
          value={this.props.pendingNoteText}
          name="pendingNoteText">
        </textarea>
        <AceEditor
          mode={this.state.language}
          theme="clouds_midnight"
          editorProps={{$blockScrolling: true}}
          name="pendingCodeText"
          value={this.props.pendingCodeText}
        onChange={this.props.handleCodeInput}
        style={braceStyle}/>
        <div className="form-buttons">
        {languageButton}
          </div>
        <button type="submit" onClick={this.returnHome}><FontAwesome className='fa fa-floppy-o'/></button>
        <button type="button" onClick={() => this.props.switchFormView()}><FontAwesome className='fa fa-times'/></button>
      </div>
    </form>
  </div>
</div>
)}
}

export default withRouter(NoteForm);
