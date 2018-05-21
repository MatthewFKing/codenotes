import {
  REQUEST_NOTES,
  RECEIVE_NOTES,
  RECEIVE_TAGS,
  CREATE_NOTE,
  TOGGLE_EDITING,
  CLEAR_PENDING_TEXT,
  UPDATE_NOTE_TEXT,
  SET_SEARCH_FILTER,
  CLEAR_TAG_FILTERS,
  SET_NOTE_FILTER,
  SET_FOLDER,
  SET_TAG_FILTER,
} from '../actions/note';

const initialState = {
  isFetching: false,
  notes: [
    {
      title: "Note Number One",
      text: "#note #first #test",
      code: "This is the code for the first note",
      tags: ["#note", "#first", "#test"],
      _id: "123",
      folder: "React"
    },
    {
      title: "Note Number Two",
      text: "#note #second #test",
      code: "This is the code for the second note",
      tags: ["#note", "#second", "#test"],
      _id: "321",
      folder: "Python"
    },
    ],
  tags: [],
  tagFilter: '',
  pendingText: {
    code: "",
    body: "",
    title: ""
},
  selectedFolder: "",
  folders: ["React", "Python", "Java", "HTML"],
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

    case SET_FOLDER: {
      return Object.assign({}, state, {
        selectedFolder: action.id,
        tagFilter: ''
      })
    }

    case SET_TAG_FILTER: {
      return Object.assign({}, state, {
        tagFilter: action.id
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
