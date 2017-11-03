import React from 'react';
import FontAwesome from 'react-fontawesome';


const TagBar = props =>{
  if (props.subTagSet.length > 0){
    return (
      <div>
      <h3 onClick={props.clearTagFilters}>
        <FontAwesome className='fa fa-arrow-left'/>
        {props.tagFilter[0]}

      </h3>
     <ul className="subtag-list">
    {props.subTagSet.map((tag, index) =>
    <li
      onClick={props.getSubTagFilter}>
      {tag}
    </li>
    )}
    </ul>
    </div>
    )
  }
return (
  <div>
  <ul className="tag-list">
      <li
        onClick={props.getTagFilter}>
        View All
      </li>
      {props.tagSet.map((tag, index) =>
        <li
          onClick={props.getTagFilter}>
          {tag}
        </li>
      )}
    </ul>
  </div>
)};

export default TagBar;
