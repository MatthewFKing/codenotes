import React, { Component } from 'react';
import { connect } from 'react-redux';

import Note from './Note';

import { 
  toggleEditing,
  postUpdatedNote,
  deleteNote,
  updateNoteText,
} from '../../actions/note';

class NoteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortedNotes: []
    }
  }

  handleNoteUpdate = id => {
    this.props.notes.map((note) => {
      if (note._id === id) {
        this.props.postUpdatedNote(note);
      }
      return null;
    });
  }

  handleRemoveNote = id => {
    this.props.notes.map((note) => {
      if (note._id === id) {
        this.props.deleteNote(note);
      }
      return null;
    });
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
    this.props.updateNoteText(id, property, value);
  }
  
  sortNotes = (notes) => {
    this.props.filter(note => {
      if (this.props.noteFilter){
        return note._id === this.props.noteFilter
      } else if(this.props.tagFilters.length > 0) {
        return this.props.tagFilters.every(tag => note.tags.indexOf(tag) > -1)
      } else if (this.props.searchQuery) {
        return note.title.toLowerCase().indexOf(this.props.searchQuery.toLowerCase()) > -1 || note.text.toLowerCase().indexOf(this.props.searchQuery.toLowerCase()) > -1
      } else {
        return note
      }
    })
  }
  
  render() {

    const { notes, tagFilter, searchQuery, folder } = this.props;

    if (!notes) {
      return <p> Loading Notes... </p>
    }
    return (
      
    <div className="notelist">
      {notes.filter((note) =>
        tagFilter ? note.tags.indexOf(tagFilter) > -1
        : folder ? note.folder === folder
        : searchQuery ? note.title.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1
        || note.text.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1
        : note )

        .map((note, i) =>
        <Note
          key={i}
          note={note}
          handleRemoveNote={this.handleRemoveNote}
          toggleEditing={this.props.toggleEditing}
          setNoteText={e => this.updateNoteText(e, note._id)}
          handleNoteUpdate={this.handleNoteUpdate}
        />
      )}
    </div>
  )}
}

const mapStateToProps = state => ({
  searchQuery: state.searchQuery,
  folder: state.selectedFolder,
  tagFilter: state.tagFilter
});

const mapDispatchToProps = dispatch => ({
  toggleEditing: (id) => dispatch(toggleEditing(id)),
  postUpdatedNote: (note) => dispatch(postUpdatedNote(note)),
  deleteNote: (id) => dispatch(deleteNote(id)),
  updateNoteText: (id, property, value) => dispatch(updateNoteText(id, property, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NoteList);
