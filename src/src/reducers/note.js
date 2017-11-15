import { combineReducers } from 'redux';

import {
  REQUEST_NOTES,
  RECEIVE_NOTES,
  RECEIVE_TAGS,
  SET_TAG_FILTERS,
  CREATE_NOTE,
  TOGGLE_EDITING
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
    case CREATE_NOTE:
      return Object.assign({}, state, {
        pendingText: {[action.target]: action.text}
      });

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
