import React from 'react';
import PropTypes from 'prop-types';

import Note from './Note';

const NoteList = props =>
    <div>
      {props.notes.filter((note) =>
        props.tagFilter.length > 0
          ? props.tagFilter.every((tag) => note.tags.indexOf(tag) > -1)
          : note )
        .map((note, index) =>
        <Note
          note={note}
          handleRemoveNote={props.handleRemoveNote}
          toggleNoteEditing={props.toggleNoteEditing}
          setNoteText={text => props.updateNoteText(text, note._id)}
          handleCodeInput={props.handleCodeInput}/>
      )}
    </div>;

    NoteList.PropTypes = {
      notes: PropTypes.array.isRequired,
      handleNewNoteInput: PropTypes.func.isRequired,
      handleNewNote: PropTypes.func.isRequired,
      handleRemoveNote: PropTypes.func.isRequired,
      handleKeyPress: PropTypes.func.isRequired,
      tagFilter: PropTypes.array.isRequired,
    }

export default NoteList;
