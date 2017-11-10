import * as NoteActionTypes from '../actions/note';

const initialState = {
    notes: []
};

export default function Note(state=initialState, action){
    switch(action.type){
        
        case NoteActionTypes.GET_NOTES: {
            
        }
        
        case NoteActionTypes.RECEIVE_NOTES: {
            
        }
        
        case NoteActionTypes.ADD_NOTE: {
            
        }
        
        case NoteActionTypes.REMOVE_NOTE: {
            
        }
        
        case NoteActionTypes.UPDATE_NOTE: {
            
        }
    }
}