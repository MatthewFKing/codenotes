import React from 'react';

const SubNoteList = props => {
  
  return (
    <div className="sublist">
    <h4>Notes</h4>
      <ul className="subtag-list nav sidebar-nav">
        <li onClick={ () => props.setTagFilter('')}>View All</li>
        {props.notes.map((note, i) =>
          <li key={i} onClick={() => props.setTagFilter(note.title)}>
            {note.title}
          </li>)}
      </ul>
    </div>
      )
    };
    
    export default SubNoteList;
