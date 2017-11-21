import React, { Component } from 'react';

import NoteList from './NoteList/NoteList';
import SideBar from './SideBar/SideBar';
import { NavLink } from 'react-router-dom';

import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';

import {
  fetchNotes,
  setTagFilters,
  toggleEditing,
  updateNoteText,
  postUpdatedNote,
  deleteNote
} from '../actions/note';


class App extends Component {
  state = {
    subTagSet: [],
    noteFilter: '',
  };

  componentDidMount(){
    this.props.fetchNotes();
  }

  setNoteFilter = id => {
    this.setState({noteFilter: id});
  };

  toggleNoteEditing = (id) => {
    this.props.toggleEditing(id);
  }

  updateNoteText = (e, id) => {
    let property = '';
    let value = '';
    if (!e.target) {
      property = "code";
      value = e;
    } else if (e.target.name === "editNoteText") {
      property = "text";
      value = e.target.value;
    } else {
      property = "title";
      value = e.target.value;
    }
    const { dispatch } = this.props;
    dispatch(updateNoteText(id, property, value));
  }

  clearTagFilters = () => {
    this.setState({
      tagFilter: [],
      subTagSet: [],
      noteFilter: false
    });
  }

  generateSubTagList = (currentTag) => {
    let tags = [];
    this.props.notes.filter(note => note.tags.indexOf(currentTag) !== -1)
      .map((note) => {
        return tags = [...tags, ...note.tags];
      });
    tags = Array.from(new Set(tags));
    tags.splice((tags.indexOf(currentTag)),1);
    return tags;
  }

  getTagFilter = (e) => {
    this.props.setTagFilters(e);
  }

  //App
  handleRemoveNote = id => {
    this.props.notes.map((note) => {
      if (note._id === id) {
        this.props.deleteNote(note);
      }
      return null;
    });
  };

  handleNoteUpdate = id => {
    this.props.notes.map((note) => {
      if(note._id === id) {
       this.props.postUpdatedNote(note);
      }
      return null;
    });
  }

  render() {

    return (
      <div className="main">
      <SideBar
        tagSet={this.props.tags}
        getTagFilter={this.getTagFilter}
        subTagSet={this.state.subTagSet}
        getSubTagFilter={this.getSubTagFilter}
        notes={this.props.notes}
        tagFilters={this.props.tagFilters}
        clearTagFilters={this.clearTagFilters}
        setNoteFilter={this.setNoteFilter}
      />

    <div className="note-view">

    <div className="new-note-box">
      <NavLink to="/new">
        <FontAwesome className='fa-plus' name="plus"/>
         Add a Note
      </NavLink>
      </div>

        <NoteList
          notes={this.props.notes}
          handleRemoveNote={this.handleRemoveNote}
          tagFilters={this.props.tagFilters}
          toggleNoteEditing={this.toggleNoteEditing}
          updateNoteText={this.updateNoteText}
          handleNoteUpdate={this.handleNoteUpdate}
          noteFilter={this.state.noteFilter}
        />

    </div>
  </div>
    )
  }
  }

  const mapStateToProps = state => ({
      notes: state.notes,
      isFetching: state.isFetching,
      tags: state.tags,
      tagFilters: state.tagFilters,
      pendingText: state.pendingText,
    });

  const mapDispatchToProps = dispatch => ({
    fetchNotes: () => dispatch(fetchNotes()),
    toggleEditing: (id) => dispatch(toggleEditing(id)),
    deleteNote: (id) => dispatch(deleteNote(id)),
    postUpdatedNote: (note) => dispatch(postUpdatedNote(note)),
    setTagFilters: (e) => dispatch(setTagFilters(e.target.innerHTML))
  });

  export default connect(mapStateToProps, mapDispatchToProps)(App);
