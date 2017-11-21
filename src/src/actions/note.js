import axios from 'axios';

export const RECEIVE_NOTES = 'RECEIVE_NOTES';
export const REQUEST_NOTES = 'REQUEST_NOTES';
export const RECEIVE_TAGS = 'RECEIVE_TAGS';
export const SET_TAG_FILTERS = 'SET_TAG_FILTERS';
export const CREATE_NOTE = 'CREATE_NOTE';
export const TOGGLE_EDITING = 'TOGGLE_EDITING';
export const CLEAR_PENDING_TEXT = 'CLEAR_PENDING_TEXT';
export const UPDATE_NOTE_TEXT = 'UPDATE_NOTE_TEXT';
export const SET_SEARCH_FILTER = 'SET_SEARCH_FILTER';
export const CLEAR_TAG_FILTERS = "CLEAR_TAG_FILTERS";
export const SET_NOTE_FILTER = "SET_NOTE_FILTER";

export const fetchNotes = () => {
  return (dispatch) => {
    dispatch(requestNotes());
    return axios.get("http://localhost:3002/")
      .then(
        response => dispatch(receiveNotes(response.data)),
        error => console.log("fetch error", error)
      )
      .then(response =>
      dispatch(receiveTags(response)))
  }
};

export const postNote = (note) => {
  return (dispatch) => {
    return axios.post('http://localhost:3002/', note)
      .then(
        () => dispatch(fetchNotes()),
        error => console.log(error)
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

export const clearTagFilters = () => ({
  type: CLEAR_TAG_FILTERS
})

export const setNoteFilter = (id) => ({
  type: SET_NOTE_FILTER,
  id
})

export const updateNoteText = (id, property, value) => ({
    type: UPDATE_NOTE_TEXT,
    id,
    property,
    value
});

export const requestNotes = () => ({
    type: REQUEST_NOTES,
});

export const receiveNotes = (notes) => ({
      type: RECEIVE_NOTES,
      notes,
      receivedAt: Date.now()
});

export const setSearchFilter = (text) => ({
    type: SET_SEARCH_FILTER,
    text
});

export const receiveTags = (notes) => ({
    type: RECEIVE_TAGS,
    notes
});

export const setTagFilters = (tag) => ({
    type: SET_TAG_FILTERS,
    tag
});

export const createNote = (target, text) => ({
    type: CREATE_NOTE,
    target,
    text
});

export const clearPendingText = () => ({
    type: CLEAR_PENDING_TEXT
});

export const toggleEditing = (id) => ({
    type: TOGGLE_EDITING,
    id
});
