export {
  setCurrentNote,
  addNewNoteAsync,
  clearAddNewNote,
  fetchNotesAsync,
  updateCurrentNoteTitle,
  updateCurrentNoteContent,
  clearCurrentNote,
  saveCurrentNoteStart,
  saveCurrentNoteAsync,
  setNoteForDelete,
  deleteNoteAsync
} from './notes';

export {
  signInAsync,
  signUpAsync,
  checkAuthStateAsync,
  clearAuthStateAndStorage,
  confirmLogout
} from './auth';

export {
  clearGlobalError,
  setGlobalLoading,
  clearGlobalLoading
} from './global';
