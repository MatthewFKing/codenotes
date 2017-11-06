import React from 'react';


const SideNoteBar = props =>
  <div>
  <ul className="tag-list">
    <li
      onClick={props.clearTagFilters}>
      View All
    </li>
    {props.notes.map((note, i) =>
      <li key={note._id}
      onClick={() => props.setNoteFilter(note._id)}>
      {note.title}
      </li>
    )}
  </ul>
  </div>;

export default SideNoteBar;
