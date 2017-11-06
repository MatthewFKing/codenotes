import React, { Component } from 'react';
import NoteList from './NoteList/NoteList';
import SideBar from './SideBar/SideBar';
import axios from 'axios';
import NoteForm from './NoteForm';
import FontAwesome from 'react-fontawesome';
import { BrowserRouter,
  Route, Switch, NavLink } from 'react-router-dom';

export default class App extends Component {

  state = {
    tagSet: [],
    subTagSet: [],
    tagFilter: [],
    noteFilter: '',
    pendingCodeText: '',
    pendingNoteText: '',
    pendingNoteTitle: '',
    pendingNoteTags: '',
    searchQuery: '',
    notes: [],
  };

  componentDidMount(){
    this.requestNotes();
  }

  requestNotes = () => {
    axios.get('http://localhost:3002/')
      .then(response => {
        console.log(response);
        this.updateNoteState(response.data);
      })
      .catch(error => {
        console.log("error getting data", error);
      });
  };

  setNoteFilter = id => {
    this.setState({noteFilter: id});
  };

  updateNoteState = (notes) => {
    let tags = [];
    notes.map((note, index) => {
      return tags = [...tags, ...note.tags];
    });
    tags = Array.from(new Set(tags));
    this.setState({
      notes,
      tagSet: tags
    });
    return tags;
  };

  //NoteList
  toggleNoteEditing = (id) => {
    this.setState({
      notes: this.state.notes.map(note => {
        if(id === note._id) {
          return {
            ...note,
            isEditing: !note.isEditing
          };
        }
        return note;
      })
    });
  }

  //upload to server
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
    this.setState({
      notes: this.state.notes.map(note => {
        if(id === note._id) {
          return {
            ...note,
            [property]: value
          };
        }
        return note;
      })
    });
  }

  //Sidebar and NoteList
  clearTagFilters = () => {
    this.setState({
      tagFilter: [],
      subTagSet: [],
      noteFilter: false
    });
  }

  //Sidebar and NoteList
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

  //SideBar
  getTagFilter = (e) => {
    let currentTag = e.target.innerHTML;
    if(e.target.innerHTML !== 'View All') {
      this.setState({
        tagFilter: [currentTag],
        subTagSet: this.generateSubTagList(currentTag),
      });

    } else {
      this.setState({
        tagFilter: '',
        subTagSet: []
      });
    }
  }

  //Combine with getTagFilter
  getSubTagFilter = (e) => {
    let subTag = e.target.innerHTML;
    if (this.state.tagFilter.length < 2) {
    this.setState({
      tagFilter: [
        ...this.state.tagFilter,
        ...[subTag]
      ]
    });
    } else if (this.state.tagFilter.length === 2){
      this.setState({
        tagFilter: [
          ...this.state.tagFilter.slice(0, -1),
          ...[subTag]
        ]
      });
    }
  }

  //NoteForm or NoteList
  handleNewNoteInput = (e) => {
    const name = e.target.name;
    this.setState({[name]: e.target.value});
  }

  //NoteForm
  handleCodeInput = (value) => {
    this.setState({pendingCodeText: value});
  }

  //App
  handleNewNote = e => {
    e.preventDefault();
    let newNote = {
      title: this.state.pendingNoteTitle,
      text: this.state.pendingNoteText,
      code: this.state.pendingCodeText
    };
    axios.post('http://localhost:3002/', newNote)
      .then(response => {
        this.updateNoteState(response.data);
        this.props.history.push('/');
      })
      .catch(error =>{
        console.log(error);
      });
  };

  //App
  handleRemoveNote = id => {
    this.state.notes.map((note) => {
      if (note._id === id) {
        axios.delete(`http://localhost:3002/note/${note._id}`)
          .then(response => {
            this.updateNoteState(response.data);
          })
          .catch(err => {
            console.log(err);
          });
      }
      return null;
    });
  };

  handleNoteUpdate = id => {
    this.state.notes.map((note) => {
      if(note._id === id) {
        axios.post('http://localhost:3002/update', note)
          .then(response => {
            this.updateNoteState(response.data);
          })
          .catch(error =>{
            console.log(error);
          });
      }
      return null;
    });
  }

  render() {

    return (
    <BrowserRouter>
      <div className="main">
      <SideBar
        tagSet={this.state.tagSet}
        getTagFilter={this.getTagFilter}
        subTagSet={this.state.subTagSet}
        getSubTagFilter={this.getSubTagFilter}
        notes={this.state.notes}
        tagFilter={this.state.tagFilter}
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
          notes={this.state.notes}
          handleRemoveNote={this.handleRemoveNote}
          tagFilter={this.state.tagFilter}
          toggleNoteEditing={this.toggleNoteEditing}
          updateNoteText={this.updateNoteText}
          handleNoteUpdate={this.handleNoteUpdate}
          noteFilter={this.state.noteFilter}
          searchQuery={this.state.searchQuery}
        />} />
        <Route path="/new" render={ () => <NoteForm
          pendingNoteText={this.state.pendingNoteText}
          pendingNoteTitle={this.state.pendingNoteTitle}
          pendingNoteTags={this.state.pendingNoteTags}
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
