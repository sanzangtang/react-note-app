// action creators
import * as actionTypes from './actionTypes';
import axiosIns from './axiosIns';

export const setCurrentNote = selectedNote => {
  return {
    type: actionTypes.SET_CURRENT_NOTE,
    selectedNote: selectedNote
  };
};

export const fetchNotesAsync = (props = null) => {
  return (dispatch, getState) => {
    axiosIns
      .get('/notes.json')
      .then(resp => {
        dispatch(fetchNotesSuccess(resp.data));
        // redirect if received props
        if (props) {
          props.history.push('/notes/' + getState()._notes.newNote.id);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const fetchNotesSuccess = notes => {
  // check if backend returns a note or not
  if (notes) {
    return {
      type: actionTypes.FETCH_NOTES_SUCCESS,
      notes: notes
    };
  } else {
    return {
      type: actionTypes.FETCH_NOTES_SUCCESS,
      notes: {}
    };
  }
};

export const fetchNotesFail = () => {
  return {};
};

export const addNewNoteAsync = props => {
  return (dispatch, getState) => {
    const data = {
      title: 'untitled',
      content: '',
      date: new Date() // UTC
    };
    axiosIns
      .post('/notes.json', data)
      .then(resp => {
        // get response from server
        dispatch(addNewNoteSuccess(resp));

        // refetch a new list of notes
        dispatch(fetchNotesAsync(props));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const addNewNoteStart = () => {
  return {
    type: actionTypes.ADD_NEW_NOTE_START
  };
};

export const addNewNoteSuccess = resp => {
  return {
    type: actionTypes.ADD_NEW_NOTE_SUCCESS,
    resp: resp
  };
};

export const addNewNoteFail = resp => {
  return {};
};

// called every time title is changed
export const updateCurrentNoteTitle = title => {
  return {
    type: actionTypes.UPDATE_CURRENT_NOTE_TITLE,
    title: title
  };
};

export const updateCurrentNoteContent = content => {
  return {
    type: actionTypes.UPDATE_CURRENT_NOTE_CONTENT,
    content: content
  };
};

export const saveCurrentNoteAsync = content => {
  return (dispatch, getState) => {
    // save current note to redux
    // this will also update whole list of notes
    dispatch(updateCurrentNoteContent(content));

    // get a updated version of note
    const note = getState()._notes.currentNote;
    const noteId = note.id;

    // MUST keep the original data
    const data = {
      title: note.title,
      content: note.content,
      date: note.date
    };

    axiosIns
      .put('/notes/' + noteId + '.json', data)
      .then(resp => {
        dispatch(saveCurrentNoteSuccess(resp));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const saveCurrentNoteStart = () => {
  return {
    type: actionTypes.SAVE_CURRENT_NOTE_START
  };
};

// did not implment reducer yet
export const saveCurrentNoteSuccess = resp => {
  return {
    type: actionTypes.SAVE_CURRENT_NOTE_SUCCESS,
    resp: resp
  };
};

export const saveCurrentNoteFail = () => {
  return {
    type: actionTypes.SAVE_CURRENT_NOTE_FAIL
  };
};

export const clearCurrentNote = () => {
  return {
    type: actionTypes.CLEAR_CURRENT_NOTE
  };
};
