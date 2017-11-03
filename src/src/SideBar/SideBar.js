import React, { Component } from 'react';
import TagBar from './TagBar';
import SideNoteBar from './SideNoteBar';
import {Link} from 'react-router-dom';

export default class SideBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showNotes: false,
      tagActive: true,
    }
    this.toggleTags = this.toggleTags.bind(this);
  }

  componentDidMount() {
  }

  toggleTags = () => {
    this.setState({
      showNotes: false,
      tagActive: true
    });
  }

  toggleNotes = () => {
    this.setState({
      showNotes: true,
      tagActive: false
    });
  }




render() {
  let sideBarView = null;
  if(!this.state.showNotes) {
    sideBarView =   <TagBar
    tagSet={this.props.tagSet}
    subTagSet={this.props.subTagSet}
    getTagFilter={this.props.getTagFilter}
    getSubTagFilter={this.props.getSubTagFilter}
    tagFilter={this.props.tagFilter}
    clearTagFilters={this.props.clearTagFilters}/>

  } else {
    sideBarView = <SideNoteBar
      notes={this.props.notes} />
  }
  return (
  <div className="sidebar">
  <div>
    <button type="button"
      className={this.state.tagActive ? "active-button":''}
      onClick={() => this.toggleTags()}>
      Tags
    </button>
    <button type="button"
      className={this.state.tagActive ? '':"active-button"}
      onClick={() => this.toggleNotes()}>Notes</button>
  </div>
  <Link to="/">
    {sideBarView}
  </Link>
  </div>
  )}
}
