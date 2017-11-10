export const GET_NOTES = 'note/GET_NOTES';
export const RECEIVE_NOTES = 'note/RECEIVE_NOTES';
export const ADD_NOTE = 'note/ADD_NOTE';
export const REMOVE_NOTE = 'note/REMOVE_NOTE';
export const UPDATE_NOTE = 'note/UPDATE_NOTE';
import axios from 'axios';

export const getNotes = () => {
    return axios.get('http://localhost:3002/')
        .then(response => {
            dispatch(receiveNotes(response.data));
        });
};

export const receiveNotes = (notes) => {
  return {
      type: RECEIVE_NOTES,
      notes
  };
};
export const addNote = note => {
    return {
        type: ADD_NOTE,
        note
    };
};

export const removeNote = id => {
    return {
        type: REMOVE_NOTE,
        id
    };
};

export const updateNote = (id, note) => {
    return {
        type: UPDATE_NOTE,
        id,
        note
    };
};