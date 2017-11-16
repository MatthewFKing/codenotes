import { combineReducers } from 'redux';

import {
  REQUEST_NOTES,
  RECEIVE_NOTES,
  RECEIVE_TAGS,
  SET_TAG_FILTERS,
  CREATE_NOTE,
  TOGGLE_EDITING,
  CLEAR_PENDING_TEXT,
  UPDATE_NOTE_TEXT
} from '../actions/note';

const initialState = {
  isFetching: false,
  notes: [],
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
       state.notes.map(note => {
        return tagList = [...tagList, ...note.tags];
      });
      return {
        ...state, tags: Array.from(new Set(tagList))
      }
    }
    case SET_TAG_FILTERS: {
      if (action.tag.toLowerCase() === "view all") {
        return Object.assign({}, state, {
          tagFilters: []
        });
      } else if (state.tagFilters.length === 2) {
        return {
          ...state,
          tagFilters: [...state.tagFilters.slice(0, -1), ...[action.tag]]
        }
      } else {
        return {
          ...state,
          tagFilters: [...state.tagFilters, ...[action.tag]]
        }
      }
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
