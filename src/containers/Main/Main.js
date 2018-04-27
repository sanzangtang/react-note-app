import React from 'react';
import PropTypes from 'prop-types';
import Editor from '../../components/Editor/Editor';
import TopBar from '../../components/TopBar/TopBar';
import SideBar from '../../components/SideBar/SideBar';
import Dashboard from '../../components/Dashboard/Dashboard';
import { Route, Switch } from 'react-router-dom';
import FloatButton from '../../components/FloatButton/FloatButton';
import Loading from '../../components/Loading/Loading';

// redux
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

// hoc
import withError from '../../hoc/withError';

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
    backgroundColor: theme.palette.background.default
  }
});

class Main extends React.Component {
  state = {
    mobileOpen: false,
    snackOpen: false
  };

  _handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  _handleAddNewNote = () => {
    // call backend create a new empty note with id
    this.props.onAddNewNote(this.props); // pass props for redirecting
  };

  _openSnackBar = () => {
    this.setState({ snackOpen: true });
  };

  _closeSnackBar = () => {
    this.setState({ snackOpen: false });
  };

  _showConfirmDeleteNote = noteId => {
    // show snack bar
    this._openSnackBar();

    // in the dashboard we get note id back when button is clicked
    // this is handled similarily when deleting note inside a note
    this.props.onSetNoteForDelete(noteId);
  };

  _handleDeleteNote = () => {
    // close snack bar immediately when clicking confirm
    this._closeSnackBar();
    this.props.onDeleteNote(this.props); // for redirecting
  };

  _onChangeTitleHandler = event => {
    // console.log(event.target.value);
    this.props.onUpdateCurrentNoteTitle(event.target.value);
    // return event.target.value;
  };

  componentDidMount() {
    console.log('MainLayout: componentDidMount()');
    // load notes data when component is mounted
    this.props.onfetchNotes();
  }

  componentDidUpdate(prevProps) {
    console.log('MainLayout: componentDidUpdate()');

    // clear current note
    // solve the routing issue
    // fix the issue that it will be called twice
    if (this.props.location.pathname === '/notes' && this.props.currentNote) {
      this.props.onClearCurrentNote();
    }

    // loading starts when App mounts
    // last stage of Main component
    // clear loading state
    if (this.props.loading) {
      setTimeout(() => {
        this.props.onClearGlobalLoading();
      }, 1500); // extends animation time here (to deceive user)
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Loading loading={this.props.loading} />
        <div className={classes.root}>
          <FloatButton handleAddNewNote={this._handleAddNewNote} />
          <TopBar
            handleDrawerToggle={this._handleDrawerToggle}
            handleSaveCurrentNote={this.props.onSaveCurrentNoteStart}
            onChangeTitleHandler={this._onChangeTitleHandler}
            notes={this.props.notes}
            currentNote={this.props.currentNote}
            location={this.props.location} // for checking routes and update title
            saveNoteState={this.props.saveNoteState}
            // for handle delete notes (snack bar)
            snackOpen={this.state.snackOpen}
            showConfirmDeleteNote={this._showConfirmDeleteNote} // NOT this.props!
            closeSnackBar={this._closeSnackBar}
            handleDeleteNote={this._handleDeleteNote}
          />

          <SideBar
            handleDrawerToggle={this._handleDrawerToggle}
            mobileOpen={this.state.mobileOpen}
            notes={this.props.notes}
            onLogout={this.props.onLogout}
          />

          <Switch>
            {/* nested route */}
            <Route
              path={this.props.match.url + '/:noteId'} // full path: /notes/:noteID
              exact
              render={props => (
                <Editor
                  {...props} // router props
                  onSetCurrentNote={this.props.onSetCurrentNote}
                  onSaveCurrentNote={this.props.onSaveCurrentNote}
                  ifSaveCurrentNote={this.props.ifSaveCurrentNote}
                  notes={this.props.notes}
                  // clearAddNewNote={this.props.onClearAddNewNote}
                />
              )} // pass notes down
            />
            <Route
              path={this.props.match.url} // path: /notes
              render={props => (
                <Dashboard
                  {...props}
                  notes={this.props.notes}
                  // for handle delete notes (snack bar)
                  snackOpen={this.state.snackOpen}
                  showConfirmDeleteNote={this._showConfirmDeleteNote}
                  closeSnackBar={this._closeSnackBar}
                  handleDeleteNote={this._handleDeleteNote}
                />
              )}
            />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    notes: state._notes.notes,
    currentNote: state._notes.currentNote,
    // newNote: state._notes.newNote,
    saveNoteState: state._notes.saveNoteState,
    ifSaveCurrentNote: state._notes.ifSaveCurrentNote,
    error: state._global.gError,
    loading: state._global.gLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onfetchNotes: () => dispatch(actions.fetchNotesAsync()),
    // pass props for redirecting
    onAddNewNote: props => dispatch(actions.addNewNoteAsync(props)),
    onUpdateCurrentNoteTitle: title =>
      dispatch(actions.updateCurrentNoteTitle(title)),
    onClearCurrentNote: () => dispatch(actions.clearCurrentNote()),
    onSaveCurrentNoteStart: () => dispatch(actions.saveCurrentNoteStart()),
    onSetNoteForDelete: noteId => dispatch(actions.setNoteForDelete(noteId)),
    onSetCurrentNote: selectedNote =>
      dispatch(actions.setCurrentNote(selectedNote)),
    onSaveCurrentNote: content =>
      dispatch(actions.saveCurrentNoteAsync(content)),
    onDeleteNote: props => dispatch(actions.deleteNoteAsync(props)),
    // for error hoc
    onClearGlobalError: () => dispatch(actions.clearGlobalError()),
    // for loading
    onClearGlobalLoading: () => dispatch(actions.clearGlobalLoading()),
    onLogout: () => dispatch(actions.clearAuthStateAndStorage())
  };
};

// redux connect
export default connect(mapStateToProps, mapDispatchToProps)(
  withError(Main, styles)
);
