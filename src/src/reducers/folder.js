import {
  SET_FOLDER,
  ADD_FOLDER
} from '../actions/note';

const folderState = {
  selectedFolder: "",
  folders: ["React", "Python", "Java", "HTML"],
};

export const folders = (state = folderState, action) => {
  switch (action.type) {
    case SET_FOLDER: {
      return Object.assign({}, state, {
        selectedFolder: action.id,
        tagFilter: ''
      })
    }

    case ADD_FOLDER: {
      return Object.assign({}, state, {
        folders: [...state.folders, action.value]
      })
    }

    default:
      return state
  }
}