// action creators
import * as actionTypes from './actionTypes';
import axiosIns from './axiosIns';
import * as globalActions from './global';

export const setCurrentNote = selectedNote => {
  return {
    type: actionTypes.SET_CURRENT_NOTE,
    selectedNote: selectedNote
  };
};

export const fetchNotesAsync = (props = null) => {
  return (dispatch, getState) => {
    const uid = getState()._auth.uid;
    const idToken = getState()._auth.idToken;

    axiosIns
      // .get('/notes.json')
      .get(`/users/${uid}/notes.json?auth=${idToken}`)
      .then(resp => {
        // due to firebase's nature
        // data is ordered by date (from old to new)
        // we want to reverse it
        const oldNotes = resp.data;

        const notes = Object.keys(oldNotes)
          .reverse()
          .map(key => {
            return { ...oldNotes[key], id: key };
          });

        dispatch(fetchNotesSuccess(notes));

        // redirect to the new note route if received props
        if (props) {
          props.history.push('/notes/' + getState()._notes.newNote.id);
        }
      })
      .catch(error => {
        dispatch(globalActions.setGlobalError(error));
        // console.log(error);
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

    const uid = getState()._auth.uid;
    const idToken = getState()._auth.idToken;

    axiosIns
      // .post('/notes.json', data)
      .post(`/users/${uid}/notes.json?auth=${idToken}`, data)
      .then(resp => {
        // get response from server
        dispatch(addNewNoteSuccess(resp));

        // refetch a new list of notes
        // and pass 'props` to indicate the action is adding a new note
        dispatch(fetchNotesAsync(props));
      })
      .catch(error => {
        // console.log(error);
        dispatch(globalActions.setGlobalError(error));
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

    const uid = getState()._auth.uid;
    const idToken = getState()._auth.idToken;

    axiosIns
      // .put('/notes/' + noteId + '.json', data)
      .put(`/users/${uid}/notes/${noteId}.json?auth=${idToken}`, data)
      .then(resp => {
        // extend animation time
        setTimeout(() => {
          dispatch(saveCurrentNoteSuccess(resp));
          setTimeout(() => {
            dispatch(saveCurrentNoteDone());
          }, 2000);
        }, 1000);
      })
      .catch(error => {
        dispatch(globalActions.setGlobalError(error));
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

export const saveCurrentNoteDone = () => {
  return {
    type: actionTypes.SAVE_CURRENT_NOTE_DONE
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

export const setNoteForDelete = noteId => {
  return {
    type: actionTypes.SET_NOTE_FOR_DELETE,
    noteId: noteId
  };
};

export const deleteNoteSuccess = () => {
  return {
    type: actionTypes.DELETE_NOTE_SUCCESS
  };
};

export const deleteNoteAsync = props => {
  return (dispatch, getState) => {
    const noteId = getState()._notes.noteForDelete;
    const uid = getState()._auth.uid;
    const idToken = getState()._auth.idToken;

    axiosIns
      // .delete('/notes/' + noteId + '.json')
      .delete(`/users/${uid}/notes/${noteId}.json?auth=${idToken}`)
      .then(resp => {
        dispatch(deleteNoteSuccess());
        // refetch a list of notes
        dispatch(fetchNotesAsync());

        console.log(props);
        // redirecting to dashboard
        props.history.push('/notes');
      })
      .catch(error => {
        dispatch(globalActions.setGlobalError(error));
      });
  };
};
