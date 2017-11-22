//import { combineReducers } from 'redux';

import {
  REQUEST_NOTES,
  RECEIVE_NOTES,
  RECEIVE_TAGS,
  SET_TAG_FILTERS,
  CREATE_NOTE,
  TOGGLE_EDITING,
  CLEAR_PENDING_TEXT,
  UPDATE_NOTE_TEXT,
  SET_SEARCH_FILTER,
  CLEAR_TAG_FILTERS,
  SET_NOTE_FILTER
} from '../actions/note';

const initialState = {
  isFetching: false,
  notes: [
    {
      title: "Note Number One",
      text: "#note #first #test",
      code: "This is the code for the first note",
      tags: ["#note", "#first", "#test"],
      _id: "123"
    },
    {
      title: "Note Number Two",
      text: "#note #second #test",
      code: "This is the code for the second note",
      tags: ["#note", "#second", "#test"],
      _id: "321"
    },
    ],
  tags: [],
  tagFilters: [],
  subTagSet: [],
  pendingText: {
    code: "",
    body: "",
    title: ""
}
}

export default function notes(state = initialState, action) {
  switch(action.type) {
    case REQUEST_NOTES:
      return Object.assign({}, state, {
        isFetching: true
      })

    case RECEIVE_NOTES:
      return Object.assign({}, state, {
        isFetching: false,
        notes: action.notes,
        lastUpdated: action.receivedAt
      })

    case RECEIVE_TAGS:{
      let tagList = [];
      if (state.notes) {
        state.notes.map(note => {
          return tagList = [...tagList, ...note.tags];
        });
        return {
          ...state, tags: Array.from(new Set(tagList))
        }
      } else {
        return state
      }
    }

    case SET_TAG_FILTERS: {
      if (state.tagFilters.length === 1) {
        let subTags = [];
        state.notes.filter(note => note.tags.indexOf(state.tagFilters[0]) !== -1)
          .map((note) => {
            return subTags = [...subTags, ...note.tags];
          });
        subTags = Array.from(new Set(subTags));
        subTags.splice((subTags.indexOf(state.tagFilters[0])),1);
        return {
          ...state,
          tagFilters: [...state.tagFilters, ...[action.tag]],
          subTagSet: subTags
        }
      } else if (state.tagFilters.length === 2) {
        return {
          ...state,
          tagFilters: [...state.tagFilters.slice(0, -1), ...[action.tag]]
        }
      } else {
        let subTags = [];
        state.notes.filter(note => note.tags.indexOf(action.tag) !== -1)
          .map((note) => {
            return subTags = [...subTags, ...note.tags];
          });
        subTags = Array.from(new Set(subTags));
        subTags.splice((subTags.indexOf(action.tag)),1);
        return {
          ...state,
          tagFilters: [...state.tagFilters, ...[action.tag]],
          subTagSet: subTags
        }
      }
    }

    case CLEAR_TAG_FILTERS: {
      return Object.assign({}, state, {
        tagFilters: [],
        noteFilter: ''
      })
    }

    case SET_NOTE_FILTER: {
      return Object.assign({}, state, {
        noteFilter: action.id
      })
    }

    case SET_SEARCH_FILTER: {
      return Object.assign({}, state, {
        searchQuery: action.text
      });
    }

    case CREATE_NOTE: {
      const pendingInput = {
        ...state.pendingText,
        [action.target]: action.text
      }
        return {
          ...state,
          pendingText: pendingInput
        }
      }

      case CLEAR_PENDING_TEXT: {
        return Object.assign({}, state, {
          pendingText: {
            code: "",
            body: "",
            title: ""
          }
        });
      }

      case UPDATE_NOTE_TEXT: {
        const updatedNote = state.notes.map(note => {
          if (note._id === action.id) {
            return {
              ...note,
              [action.property]: action.value
            }
          }
          return note;
        })
        return {
          ...state,
          notes: updatedNote
        }
      }

    case TOGGLE_EDITING: {
      const noteEditing = state.notes.map(note => {
        if (note._id === action.id) {
          return {
            ...note,
            isEditing: !note.isEditing
          }
        }
        return note;
      })
      return {
        ...state,
        notes: noteEditing
      }
    }

    default:
      return state
  }
}
