import React, { Component } from 'react';
import TagBar from './TagBar';
import SideNoteBar from './SideNoteBar';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';

import {
  setSearchFilter,
  clearTagFilters,
  setNoteFilter
} from '../../actions/note';

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNotes: false,
      tagActive: true,

    };
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
    tagFilters={this.props.tagFilters}
    clearTagFilters={this.props.clearTagFilters}
    notes={this.props.notes} />

  } else {
    sideBarView = <SideNoteBar
      notes={this.props.notes}
      setNoteFilter={this.props.setNoteFilter}
      clearTagFilters={(id) => this.props.clearTagFilters(id)} />
  }
  return (
  <nav className="navbar navbar-inverse"  id="sidebar-wrapper">
    <button type="button"
      className={this.state.tagActive ? "active-button":'inactive-button'}
      onClick={() => this.toggleTags()}>
      Tags
    </button>
    <button type="button"
      className={this.state.tagActive ? '':"active-button"}
      onClick={() => this.toggleNotes()}>Notes
    </button>
    <div className="search-box">
      <input
        placeholder="search notes"
        type='text'
        value={this.props.searchQuery}
        onChange={(e) => this.props.setSearchFilter(e.target.value)}
        name="searchQuery"/>
      <button><FontAwesome className='fa-search' name="search"/></button>
    </div>
    {sideBarView}
  </nav>
  )}
}

const mapStateToProps = state => ({
  searchQuery: state.searchQuery,
  notes: state.notes,
  subTagSet: state.subTagSet
});

const mapDispatchToProps = dispatch => ({
  setSearchFilter: (text) => dispatch(setSearchFilter(text)),
  clearTagFilters: () => dispatch(clearTagFilters()),
  setNoteFilter: (id) => dispatch(setNoteFilter(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
