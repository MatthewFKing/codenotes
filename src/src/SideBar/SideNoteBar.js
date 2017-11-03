import React from 'react';

const SideNoteBar = props =>
  <div>
  <ul className="tag-list">
    {props.notes.map((note) =>
      <li
      >
      {note.title}
      </li>
    )
    }
  </ul>
  </div>;

export default SideNoteBar;
