import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import pell from 'pell';
import './Editor.css';

const styles = theme => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
    position: 'relative',
    height: '100vh',
    overflowX: 'auto',
    overflowY: 'hidden',
    maxWidth: '800px',
    margin: '0 auto'
  }
});

class Editor extends Component {
  _initPell = () => {
    // initialize pell
    // detail docs https://github.com/jaredreich/pell
    pell.init({
      element: this.container, // created by ref
      onChange: () => {} // do nothing
    });
  };

  // fetch from redux NOT from backend!
  // The cool thing is that when refresh the page on the note page
  // since fetching data from backend takes some time
  // thus, current note will not be set
  _fecthCurrentNote = () => {
    const noteId = this.props.match.params.noteId;

    // redo the filter since data structure is changed
    const selectedNote = this.props.notes.filter(note => {
      return note.id === noteId;
    });

    if (selectedNote.length !== 0) {
      return selectedNote[0]; // only 1 matched
    } else {
      return null;
    }
  };

  componentDidMount() {
    // console.log('Editor: componentDidMount()');
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

  componentDidUpdate(prevProps) {
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

Editor.propTypes = {
  classes: PropTypes.object.isRequired,
  onSetCurrentNote: PropTypes.func,
  onSaveCurrentNote: PropTypes.func,
  ifSaveCurrentNote: PropTypes.bool
};

export default withStyles(styles)(Editor);
