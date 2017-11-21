import React from 'react';
import FontAwesome from 'react-fontawesome';


const TagBar = props =>{
  if (props.tagFilters.length > 0){
    return (
      <div>
      <h3 className="sidebar-brand" onClick={props.clearTagFilters}>
        <FontAwesome name="left" className='fa fa-arrow-left'/>
        {props.tagFilters[0]}
      </h3>
     <ul className="subtag-list nav sidebar-nav">
      {props.subTagSet.map((tag, i) =>
        <li key={i} onClick={props.getTagFilter}>
          {tag}
        </li>
      )}
    </ul>
    </div>
    )
  }
return (
  <div>
  <ul className="tag-list nav sidebar-nav">
      <li
        onClick={props.clearTagFilters}>
        View All
      </li>
      {props.tagSet.map((tag, i) =>
        <li
          key={i}
          onClick={props.getTagFilter}>
          {tag}
        </li>
      )}
    </ul>
  </div>
)};

export default TagBar;
