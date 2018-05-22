import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import Folders from './Folders';
import SubList from './SubList';
import SubNoteList from './SubNoteList';

import './SideBar.css';

import {
  setSearchFilter,
  setNoteFilter,
  setFolder,
  setTagFilter,
  addFolder
} from '../../actions/note';

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNotes: false,
      tagActive: true
    };
  }

  toggleSubListView = () => {
    this.setState({ showNotes: !this.state.showNotes });
  }

  render() {

    const { folder, folders, searchQuery, notes } = this.props;

    let subList = null;
    if (this.props.folder !== "" && !this.state.showNotes) {
      subList =
        <SubList
          folder={folder}
          notes={notes}
          setTagFilter={this.props.setTagFilter} />;
    } else if (this.props.folder !== "" && this.state.showNotes) {
      subList =
        <SubNoteList
          folder={folder}
          notes={notes}
          setTagFilter={this.props.setTagFilter} />;
    }
    return (

      <div className="sidebar navbar navbar-inverse" id="sidebar-wrapper">

        <div className="search-box">
          <input
            placeholder="search notes"
            type='text'
            value={searchQuery}
            onChange={(e) => this.props.setSearchFilter(e.target.value)}
            name="searchQuery" />
          <button><FontAwesome className='fa-search' name="search" /></button>
        </div>

        <div className="folder-bar">

          <Folders
            folders={folders}
            setFolder={this.props.setFolder}
            addFolder={this.props.addFolder} />

          {subList}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  searchQuery: state.searchQuery,
  notes: state.notes,
  subTagSet: state.subTagSet,
  folder: state.selectedFolder,
  folders: state.folders,
  tagFilter: state.tagFilter,
});

const mapDispatchToProps = dispatch => ({
  setSearchFilter: (text) => dispatch(setSearchFilter(text)),
  setNoteFilter: (id) => dispatch(setNoteFilter(id)),
  setFolder: (id) => dispatch(setFolder(id)),
  setTagFilter: (tag) => dispatch(setTagFilter(tag)),
  addFolder: (value) => dispatch(addFolder(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
