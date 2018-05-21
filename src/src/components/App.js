import React, { Component } from 'react';

import NoteList from './NoteList/NoteList';
import SideBar from './SideBar/SideBar';
import { NavLink } from 'react-router-dom';
import NoteForm from './NoteForm/NoteForm';
import Navigation from './Navigation/Navigation';

import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';

import {
  fetchNotes,
} from '../actions/note';

// Pin notes to the top of the App

class App extends Component {
  state = {
    new: false
  };

  componentDidMount() {
    this.props.fetchNotes();
  }

  toggleNewNote = () => {
    this.setState({ new: !this.state.new });
  }

  render() {

    const { notes, tags, tagFilter } = this.props;

    return (
      <div className="main">
        <Navigation />

        <div className="new-note-box">
          <NavLink to="/" onClick={this.toggleNewNote}>
            <FontAwesome className='fa-plus' name="plus" />
            New Note
            </NavLink>
        </div>

        <SideBar
            notes={notes}
            tagSet={tags}
            getTagFilter={this.getTagFilter}
          />

        <div className="note-view">
          

          {this.state.new ? <NoteForm toggleNewNote={this.toggleNewNote} /> : null}

          <NoteList
            notes={notes}
            tagFilter={tagFilter}
            noteFilter={this.props.noteFilter}
          />

        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  notes: state.notes,
  tags: state.tags,
  tagFilter: state.tagFilter,
  noteFilter: state.noteFilter
});

const mapDispatchToProps = dispatch => ({
  fetchNotes: () => dispatch(fetchNotes()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
