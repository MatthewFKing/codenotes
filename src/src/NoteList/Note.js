import React from 'react';
import Highlighter from 'react-highlight-words';
import FontAwesome from 'react-fontawesome';
import HighLight from 'react-highlight';
import EditNote from './EditNote';

const Note = props => {

if(props.note.isEditing) {
  return (
    <EditNote
      note={props.note}
      handleNewNoteInput={props.handleNewNoteInput}
      setNoteText={props.setNoteText}
      handleRemoveNote={props.handleRemoveNote}
      toggleNoteEditing={props.toggleNoteEditing}
      handleCodeInput={props.handleCodeInput}/>
  );
  }
  return (
    <div className="note">
  <h3><strong>{props.note.title}</strong></h3>
  <p>
    <Highlighter
      searchWords={props.note.tags}
      textToHighlight={props.note.text}>
    </Highlighter>
  </p>
  <HighLight className="javascript">
  {props.note.code}
  </HighLight>
    {props.note.tags.map((tag) =>
    <i>{tag} </i>
  )}
  <button onClick={ () =>
    props.handleRemoveNote(props.note._id)}>
    <FontAwesome className='fa fa-trash'/>
  </button>
  <button onClick={ () =>
    props.toggleNoteEditing(props.note._id)}>
    <FontAwesome className='fa fa-pencil-square-o'/>
  </button>
</div>
  );
};

export default Note;
