import React, { Component } from 'react';
import NoteList from './NoteList/NoteList';
import SideBar from './SideBar/SideBar';
import NoteForm from './NoteForm';
import FontAwesome from 'react-fontawesome';
import { BrowserRouter,
  Route, Switch, NavLink } from 'react-router-dom';

import {
  fetchNotes,
  setTagFilters,
  createNote,
  toggleEditing,
  postNote,
  updateNoteText,
  postUpdatedNote,
  deleteNote
} from './actions/note';
import { connect } from 'react-redux';

class App extends Component {

  state = {
    subTagSet: [],
    noteFilter: '',
    searchQuery: ''
  };

  componentDidMount(){
    const { dispatch } = this.props;
    dispatch(fetchNotes());
  }

  setNoteFilter = id => {
    this.setState({noteFilter: id});
  };

  toggleNoteEditing = (id) => {
    const { dispatch } = this.props;
    dispatch(toggleEditing(id));
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
    this.state.notes.filter(note => note.tags.indexOf(currentTag) !== -1)
      .map((note) => {
        return tags = [...tags, ...note.tags];
      });
    tags = Array.from(new Set(tags));
    tags.splice((tags.indexOf(currentTag)),1);
    return tags;
  }

  getTagFilter = (e) => {
    const { dispatch } = this.props;
    dispatch(setTagFilters(e.target.innerHTML));
  }
  handleNewNoteInput = (e) => {
    const name = e.target.name;
    const { dispatch } = this.props;
    dispatch(createNote(name, e.target.value));
  }
  handleCodeInput = (value) => {
    const { dispatch } = this.props;
    dispatch(createNote("code", value));
  }

  handleNewNote = e => {
    e.preventDefault();
    let newNote = {
      title: this.props.pendingText.title,
      text: this.props.pendingText.body,
      code: this.props.pendingText.code
    };
    const { dispatch } = this.props;
    dispatch(postNote(newNote));
  };

  //App
  handleRemoveNote = id => {
    const { dispatch } = this.props;
    this.props.notes.map((note) => {
      if (note._id === id) {
        dispatch(deleteNote(note));
      }
      return null;
    });
  };

  handleNoteUpdate = id => {
    const { dispatch } = this.props;
    this.props.notes.map((note) => {
      if(note._id === id) {
        dispatch(postUpdatedNote(note));
      }
    });
    return null;
  }

  render() {

    return (
    <BrowserRouter>
      <div className="main">
      <SideBar
        tagSet={this.props.tags}
        getTagFilter={this.getTagFilter}
        subTagSet={this.state.subTagSet}
        getSubTagFilter={this.getSubTagFilter}
        notes={this.state.notes}
        tagFilters={this.props.tagFilters}
        clearTagFilters={this.clearTagFilters}
        setNoteFilter={this.setNoteFilter}
        searchQuery={this.state.searchQuery}
        handleNewNoteInput={this.handleNewNoteInput}/>

    <div className="note-view">
    <div className="new-note-box">
      <NavLink to="/new">
        <FontAwesome className='fa-plus' name="plus"/>
         Add a Note
      </NavLink>
      </div>

      <Switch>
        <Route exact path="/" render={ () => <NoteList
          notes={this.props.notes}
          handleRemoveNote={this.handleRemoveNote}
          tagFilters={this.props.tagFilters}
          toggleNoteEditing={this.toggleNoteEditing}
          updateNoteText={this.updateNoteText}
          handleNoteUpdate={this.handleNoteUpdate}
          noteFilter={this.state.noteFilter}
          searchQuery={this.state.searchQuery}
        />} />
        <Route path="/new" render={ () => <NoteForm
          pendingText={this.props.pendingText}
          handleNewNoteInput={this.handleNewNoteInput}
          handleNewNote={this.handleNewNote}
          switchFormView={this.switchFormView}
          pendingCodeText={this.state.pendingCodeText}
          handleCodeInput={this.handleCodeInput}
          />} />
      </Switch>
    </div>
  </div>
    </BrowserRouter>
    )
  }
  }
  const mapStateToProps = state => (
    {
      notes: state.notes,
      isFetching: state.isFetching,
      tags: state.tags,
      tagFilters: state.tagFilters,
      pendingText: state.pendingText
    }
  );

  export default connect(mapStateToProps)(App);
