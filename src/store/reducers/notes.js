import * as actionTypes from '../actions/actionTypes';

const initialState = {
  notes: [],
  currentNote: null,
  ifSaveCurrentNote: false,
  newNote: null,
  loading: false,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_NOTE:
      return {
        ...state,
        currentNote: action.selectedNote
      };
    case actionTypes.UPDATE_CURRENT_NOTE_TITLE:
      return {
        ...state,
        currentNote: {
          ...state.currentNote,
          title: action.title
        }
      };
    case actionTypes.UPDATE_CURRENT_NOTE_CONTENT:
      // also append the updated note into the notes
      // no refecthing data to save requests
      return {
        ...state,
        notes: {
          ...state.notes,
          [state.currentNote.id]: {
            ...state.currentNote,
            content: action.content
          }
        },
        currentNote: {
          ...state.currentNote,
          content: action.content
        },
        ifSaveCurrentNote: false
      };
    case actionTypes.SAVE_CURRENT_NOTE_START:
      return {
        ...state,
        ifSaveCurrentNote: true
      };
    case actionTypes.SAVE_CURRENT_NOTE_SUCCESS:
      return {
        ...state
      };
    case actionTypes.CLEAR_CURRENT_NOTE:
      return {
        ...state,
        currentNote: null
      };
    case actionTypes.ADD_NEW_NOTE_START:
      return {
        ...state
      };
    case actionTypes.ADD_NEW_NOTE_SUCCESS:
      return {
        ...state,
        newNote: {
          id: action.resp.data.name
        }
      };
    case actionTypes.FETCH_NOTES_SUCCESS:
      return {
        ...state,
        notes: action.notes
      };
    default:
      return state;
  }
};

export default reducer;
