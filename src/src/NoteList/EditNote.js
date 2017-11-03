import React from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/mode/css';
import 'brace/mode/html';
import 'brace/mode/python';
import 'brace/theme/clouds_midnight';
let braceStyle = {
  height: "300px",
  width: "100%"
};

const EditNote = props =>
<div className="note">
  <input
    type="text"
    value={props.note.title}
    onChange={props.handleNewNoteInput}
    name="pendingNoteTitle">
  </input>
  <textarea
    type="text"
    value={props.note.text}
    onChange={e => props.setNoteText(e.target.value)}
    name="pendingNoteText">
  </textarea>
  <AceEditor
    mode="javascript"
    theme="clouds_midnight"
    editorProps={{$blockScrolling: true}}
    name="pendingCodeText"
    value={props.note.code}
  onChange={props.handleCodeInput}
  style={braceStyle}/>

  <button onClick={ () =>
    props.handleRemoveNote(props.note._id)}>
    x
  </button>
  <button onClick={ () =>
    props.toggleNoteEditing(props.note._id)}>
    save
  </button>
</div>;

export default EditNote;
