import fetch from 'isomorphic-fetch';
import axios from 'axios';

export const RECEIVE_NOTES = 'RECEIVE_NOTES';
export const REQUEST_NOTES = 'REQUEST_NOTES';
export const RECEIVE_TAGS = 'RECEIVE_TAGS';
export const SET_TAG_FILTERS = 'SET_TAG_FILTERS';
export const CREATE_NOTE = 'CREATE_NOTE';
export const TOGGLE_EDITING = 'TOGGLE_EDITING';
export const CLEAR_PENDING_TEXT = 'CLEAR_PENDING_TEXT';
export const UPDATE_NOTE_TEXT = 'UPDATE_NOTE_TEXT';

export const fetchNotes = () => {
  return function(dispatch) {
    dispatch(requestNotes());
    return fetch("http://localhost:3002/")
      .then(
        response => response.json(),
        error => console.log("fetch error", error)
      )
      .then(json =>
        dispatch(receiveNotes(json))
      )
      .then(json =>
      dispatch(receiveTags(json)))
  }
};

export const postNote = (note) => {
  return (dispatch) => {
    return axios.post('http://localhost:3002/', note)
      .then(
        () => dispatch(fetchNotes()),
        error => console.log(error.response.data)
      )
      .then(() => {
        dispatch(clearPendingText())
      })
  }
}

export const postUpdatedNote = (note) => {
  return (dispatch) => {
    return axios.post('http://localhost:3002/update', note)
      .then(
        () => dispatch(fetchNotes()),
        error => console.log(error.response.data)
      )
  }
}

export const deleteNote = (note) => {
  return (dispatch) => {
    return axios.delete(`http://localhost:3002/note/${note._id}`)
      .then(
        () => dispatch(fetchNotes()),
        error => console.log(error.response.data)
      )
  }
}

export const updateNoteText = (id, property, value) => {
  return {
    type: UPDATE_NOTE_TEXT,
    id,
    property,
    value
  }
}

export const requestNotes = () => {
  return {
    type: REQUEST_NOTES,
  }
};

export const receiveNotes = (notes) => {
  return {
      type: RECEIVE_NOTES,
      notes,
      receivedAt: Date.now()
  };
};

export const receiveTags = (notes) => {
  return {
    type: RECEIVE_TAGS,
    notes
  }
}

export const setTagFilters = (tag) => {
  return {
    type: SET_TAG_FILTERS,
    tag
  }
}

export const createNote = (target, text) => {
  return {
    type: CREATE_NOTE,
    target,
    text
  }
}

export const clearPendingText = () => {
  return {
    type: CLEAR_PENDING_TEXT
  }
}

export const toggleEditing = (id) => {
  return {
    type: TOGGLE_EDITING,
    id
  }
}
