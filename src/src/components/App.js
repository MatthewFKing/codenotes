import React, { Component } from 'react';

import NoteList from './NoteList/NoteList';
import SideBar from './SideBar/SideBar';
import { NavLink } from 'react-router-dom';
import NoteForm from './NoteForm';

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

// Pin notes to the top of the App

class App extends Component {
  state = {
    new: false
  };

  componentDidMount(){
    this.props.fetchNotes();
  }

  toggleNoteEditing = (id) => {
    this.props.toggleEditing(id);
  }
  
  toggleNewNote = () => {
    this.setState({new: !this.state.new});
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
      <div className="modal" show="true">
        <h4>Hi</h4>
      </div>
      
      <SideBar
        tagSet={this.props.tags}
        getTagFilter={this.getTagFilter}
        tagFilters={this.props.tagFilters}
      />

    <div className="note-view">

    <div className="new-note-box">
      <NavLink to="/new" onClick={this.toggleNewNote}>
        <FontAwesome className='fa-plus' name="plus"/>
        New Note
      </NavLink>
      </div>
      
      {this.state.new ? <NoteForm toggleNewNote={this.toggleNewNote} />: null}
      
        <NoteList
          notes={this.props.notes}
          handleRemoveNote={this.handleRemoveNote}
          tagFilters={this.props.tagFilters}
          toggleNoteEditing={this.toggleNoteEditing}
          updateNoteText={this.updateNoteText}
          handleNoteUpdate={this.handleNoteUpdate}
          noteFilter={this.props.noteFilter}
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
      noteFilter: state.noteFilter
    });

  const mapDispatchToProps = dispatch => ({
    fetchNotes: () => dispatch(fetchNotes()),
    toggleEditing: (id) => dispatch(toggleEditing(id)),
    deleteNote: (id) => dispatch(deleteNote(id)),
    postUpdatedNote: (note) => dispatch(postUpdatedNote(note)),
    setTagFilters: (e) => dispatch(setTagFilters(e.target.innerHTML))
  });

  export default connect(mapStateToProps, mapDispatchToProps)(App);
