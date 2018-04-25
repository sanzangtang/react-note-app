import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Editor from '../Editor/Editor';
import TopBar from '../../components/TopBar/TopBar';
import SideBar from '../../components/SideBar/SideBar';
import Dashboard from '../../components/Dashboard/Dashboard';
import { Route, Switch } from 'react-router-dom';
import AddButton from '../../components/AddButton/AddButton';

// redux
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%'
  }
});

class MainLayout extends React.Component {
  state = {
    mobileOpen: false
  };

  _handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  _handleAddNewNote = () => {
    // call backend create a new empty note with id
    this.props.onAddNewNote(this.props); // pass props for redirecting
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

    // solve the routing issue
    // fix the issue that it will be called twice
    if (this.props.location.pathname === '/notes' && this.props.currentNote) {
      this.props.onClearCurrentNote();
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AddButton handleAddNewNote={this._handleAddNewNote} />
        <TopBar
          handleDrawerToggle={this._handleDrawerToggle}
          handleSaveCurrentNote={this.props.onSaveCurrentNoteStart}
          onChangeTitleHandler={this._onChangeTitleHandler}
          notes={this.props.notes}
          currentNote={this.props.currentNote}
          location={this.props.location} // for checking routes and update title
        />

        <SideBar
          handleDrawerToggle={this._handleDrawerToggle}
          mobileOpen={this.state.mobileOpen}
          notes={this.props.notes}
        />

        <Switch>
          {/* nested route */}
          <Route
            path={this.props.match.url + '/:noteId'} // full path: /notes/:noteID
            exact
            render={props => (
              <Editor
                {...props}
                notes={this.props.notes}
                clearAddNewNote={this.props.onClearAddNewNote}
              />
            )} // pass notes down
          />
          <Route
            path={this.props.match.url}
            render={props => <Dashboard {...props} notes={this.props.notes} />}
          />
        </Switch>
      </div>
    );
  }
}

MainLayout.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    notes: state._notes.notes,
    currentNote: state._notes.currentNote,
    newNote: state._notes.newNote
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
    onSaveCurrentNoteStart: () => dispatch(actions.saveCurrentNoteStart())
  };
};

// redux connect
export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(MainLayout)
);
