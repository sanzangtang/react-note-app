import * as actionTypes from '../actions/actionTypes';

const initialState = {
  notes: [],
  currentNote: null,
  ifSaveCurrentNote: false,
  saveNoteState: {
    loading: false,
    success: false
  },
  newNote: null,
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
      // no refecthing data to save request times

      const oldNotes = state.notes.slice();

      const noteIndex = oldNotes.findIndex(val => {
        return val.id === state.currentNote.id;
      });

      // must updat both title and content
      oldNotes[noteIndex] = {
        ...oldNotes[noteIndex],
        title: state.currentNote.title,
        content: action.content
      };

      return {
        ...state,
        notes: oldNotes,
        currentNote: {
          ...state.currentNote,
          content: action.content
        },
        ifSaveCurrentNote: false
      };
    case actionTypes.SAVE_CURRENT_NOTE_START:
      return {
        ...state,
        ifSaveCurrentNote: true, // trigger editor to call saveCurrentNoteAsync()
        // update saving status
        saveNoteState: {
          ...state.saveNoteState,
          loading: true,
          success: false
        }
      };
    case actionTypes.SAVE_CURRENT_NOTE_SUCCESS:
      return {
        ...state,
        // update saving status
        saveNoteState: {
          ...state.saveNoteState,
          loading: false,
          success: true
        }
      };
    case actionTypes.SAVE_CURRENT_NOTE_DONE:
      return {
        ...state,
        saveNoteState: {
          ...state.saveNoteState,
          loading: false,
          success: false
        }
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
