import React, { Component } from 'react';

import Note from './Note';

export default class NoteList extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    if (!this.props.notes) {
      return <p> Loading Notes </p>
    }
    return (
    <div>
      {this.props.notes.filter((note) =>
        this.props.noteFilter ? note._id === this.props.noteFilter
        : this.props.tagFilter.length > 0 ? this.props.tagFilter.every((tag) => note.tags.indexOf(tag) > -1)
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
          handleNoteUpdate={this.props.handleNoteUpdate}/>
      )}
    </div>
  )}
}
