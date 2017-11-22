import React, { Component } from 'react';
import { connect } from 'react-redux';

import Note from './Note';

class NoteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortedNotes: []
    }
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
    if (this.props.notes.length < 0) {
      return <p> Loading Notes... </p>
    }
    return (
      //move to const in render
    <div>
      {this.props.notes.filter((note) =>
        this.props.noteFilter ? note._id === this.props.noteFilter
        : this.props.tagFilters.length > 0 ? this.props.tagFilters.every((tag) => note.tags.indexOf(tag) > -1)
        : this.props.searchQuery ? note.title.toLowerCase().indexOf(this.props.searchQuery.toLowerCase()) > -1
        || note.text.toLowerCase().indexOf(this.props.searchQuery.toLowerCase()) > -1
        : note )
        .map((note, i) =>
        <Note
          key={i}
          note={note}
          handleRemoveNote={this.props.handleRemoveNote}
          toggleNoteEditing={this.props.toggleNoteEditing}
          setNoteText={e => this.props.updateNoteText(e, note._id)}
          handleNoteUpdate={this.props.handleNoteUpdate}
        />
      )}
    </div>
  )}
}

const mapStateToProps = state => ({
  searchQuery: state.searchQuery
});

export default connect(mapStateToProps)(NoteList);
