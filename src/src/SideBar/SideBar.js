import React, { Component } from 'react';
import TagBar from './TagBar';
import SideNoteBar from './SideNoteBar';
import {Link} from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';

import {
  setSearchFilter
} from '../actions/note';

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
    clearTagFilters={this.props.clearTagFilters}/>

  } else {
    sideBarView = <SideNoteBar
      notes={this.props.notes}
      setNoteFilter={this.props.setNoteFilter}
      clearTagFilters={this.props.clearTagFilters} />
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
  <div className="search-box">
    <input
      type='text'
      value={this.props.searchQuery}
      onChange={(e) => this.props.setSearchFilter(e.target.value)}
      name="searchQuery"/>
    <button><FontAwesome className='fa-search' name="search"/></button>
  </div>
  <Link to="/">
    {sideBarView}
  </Link>
  </div>
  )}
}

const mapStateToProps = state => ({
  searchQuery: state.searchQuery
});

const mapDispatchToProps = dispatch => ({
  setSearchFilter: (text) => dispatch(setSearchFilter(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
