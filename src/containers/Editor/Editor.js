import React, { Component } from 'react';
import pell from 'pell';
import defaultStyles from 'pell/dist/pell.min.css';
import customStyles from './Editor.css';
import { withStyles } from 'material-ui/styles';

// use redux here for now may change later
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

const styles = theme => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
    position: 'relative',
    height: '100vh',
    overflowX: 'auto'
  }
});

class Editor extends Component {
  _initPell = () => {
    // initialize pell
    // detail docs https://github.com/jaredreich/pell
    pell.init({
      element: this.container, // created by ref
      onChange: () => {}, // do nothing
      // onChange: html => this.setState({ htmlOutput: html }),
      // use css modules and this is for style customization
      classes: {
        actionbar: [
          defaultStyles['pell-actionbar'],
          customStyles['pell-actionbar']
        ].join(' '),
        button: defaultStyles['pell-button'],
        content: [
          defaultStyles['pell-content'],
          customStyles['pell-content']
        ].join(' '),
        selected: defaultStyles['pell-button-selected']
      }
    });
  };

  // fetch from redux NOT from backend!

  // The cool thing is that when refresh the page on the note page
  // since fetching data from backend takes some time
  // thus, current note will not be set
  _fecthCurrentNote = () => {
    const noteId = this.props.match.params.noteId;
    if (this.props.notes[noteId] !== undefined) {
      const selectedNote = { ...this.props.notes[noteId], id: noteId }; // add id key
      return selectedNote;
    } else {
      return null;
    }
  };

  componentDidMount() {
    console.log('Editor: componentDidMount()');
    this._initPell();

    if (this._fecthCurrentNote()) {
      // dispatch action: setting current note to redux
      this.props.onSetCurrentNote(this._fecthCurrentNote());
      // render default content
      this.container.content.innerHTML = this._fecthCurrentNote().content;
    } else {
      this.props.history.push('/notes'); // redirect if note is not found
    }
  }

  // from react doc:
  // "This is also a good place to do network requests
  // as long as you compare the current props to previous props"
  componentDidUpdate(prevProps) {
    console.log('Editor: componentDidUpdate()');

    // only if route path changed then fetch new data
    if (prevProps.location.pathname !== this.props.location.pathname) {
      if (this._fecthCurrentNote()) {
        this.props.onSetCurrentNote(this._fecthCurrentNote());
        this.container.content.innerHTML = this._fecthCurrentNote().content;
      } else {
        this.props.history.push('/notes'); // redirect if note is not found
      }
    }

    // save notes to redux if save button is triggered
    if (this.props.ifSaveCurrentNote) {
      this.props.onSaveCurrentNote(this.container.content.innerHTML);
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <main className={classes.content}>
        <div style={{ height: '85px' }} />
        {/* create a ref */}
        <div ref={el => (this.container = el)} />
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {
    ifSaveCurrentNote: state._notes.ifSaveCurrentNote
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetCurrentNote: selectedNote =>
      dispatch(actions.setCurrentNote(selectedNote)),
    onSaveCurrentNote: content =>
      dispatch(actions.saveCurrentNoteAsync(content))
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Editor)
);
