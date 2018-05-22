import React from 'react';

const SubList = props => {

  let tags = [];

  props.notes.map((note, i) => {
    if (note.folder === props.folder) {
      tags = [...tags, ...note.tags.map(tag => tag)]
    }
    return tags;
  });
  
  return (
    <div className="sublist">
    <h4>Tags</h4>
      <ul className="subtag-list nav sidebar-nav">
        <li onClick={ () => props.setTagFilter('')}>View All</li>
        {tags.map((tag, i) =>
          <li key={i} onClick={() => props.setTagFilter(tag)}>
            {tag}
          </li>)}
      </ul>
    </div>
      )
    };
    
    export default SubList;
