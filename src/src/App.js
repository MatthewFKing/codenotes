import React, { Component } from 'react';
import NoteList from './NoteList/NoteList';
import SideBar from './SideBar/SideBar';
import axios from 'axios';
import NoteForm from './NoteForm';
import FontAwesome from 'react-fontawesome';
import { BrowserRouter,
  Route, Switch, NavLink } from 'react-router-dom';

export default class App extends Component {
//set up Router.

  state = {
    tagSet: [],
    formShowMe: false,
    subTagSet: [],
    tagFilter: [],
    pendingCodeText: '',
    pendingNoteText: '',
    pendingNoteTitle: '',
    pendingNoteTags: '',
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

  updateNoteText = (text, id) => {
    this.setState({
      notes: this.state.notes.map(note => {
        if(id === note._id) {
          return {
            ...note,
            text
          };
        }
        return note;
      })
    });
  }

  clearTagFilters = () => {
    this.setState({
      tagFilter: [],
      subTagSet: []
    });
  }

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

  generateSubTagList = (currentTag) => {
    let tags = [];
    this.state.notes.filter(note => note.tags.indexOf(currentTag) !== -1)
      .map((note) => {
        tags = [...tags, ...note.tags];
      });
    tags = Array.from(new Set(tags));
    tags.splice((tags.indexOf(currentTag)),1);
    return tags;
  }

  switchFormView = () => {
    this.setState({formShowMe: !this.state.formShowMe});
  };

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

  getTags = () => {
    let wordList = this.state.pendingNoteText.split(' ');
    let tagList = [];
    wordList.map((word, index) => {
      if(word.charAt(0) === '#') {
        tagList.push(word);
      }
    });
    return tagList;
  }

  handleNewNoteInput = (e) => {
    const name = e.target.name;
    this.setState({[name]: e.target.value});
  }

  handleCodeInput = (value) => {
    this.setState({pendingCodeText: value});
  }

  handleNewNote = e => {
    e.preventDefault();
    let newNote = {
      title: this.state.pendingNoteTitle,
      text: this.state.pendingNoteText,
      tags: this.getTags(),
      code: this.state.pendingCodeText
    };
    axios.post('http://localhost:3002/', newNote)
      .then(response => {
        this.updateNoteState(response.data);
        this.setState({formShowMe: false});
      })
      .catch(error =>{
        console.log(error);
      });
  };

  handleRemoveNote = id => {
    this.state.notes.map((note, index) => {
      if (note._id === id) {
        return this.setState({
          notes:[
          ...this.state.notes.slice(0, index),
          ...this.state.notes.slice(index+1)
          ]
        });
      }
    });
  };

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
        clearTagFilters={this.clearTagFilters}/>

    <div className="note-view">
    <div className="new-note-box">
      <NavLink to="/new">
        <FontAwesome className='fa-plus'/>
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
          handleCodeInput={this.handleCodeInput}
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
