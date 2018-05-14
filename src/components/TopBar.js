import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import TextField from '@material-ui/core/TextField';
import Save from '@material-ui/icons/Save';
import Delete from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';
import Check from '@material-ui/icons/Check';

const drawerWidth = 300;

const styles = theme => ({
  appBar: {
    position: 'fixed',
    top: 0,
    height: '64px',
    marginLeft: drawerWidth,
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)` // width based on side drawer
    }
  },
  iconButton: {
    marginRight: '10px',
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  toolbar: {
    height: '64px',
    paddingLeft: '24px'
  },
  input: {
    color: 'white',
    fontSize: theme.typography.title.fontSize
  },
  underline: {
    '&:after': {
      borderBottom: '2px solid theme.palette.primary.contrastText'
    },
    '&:before': {
      borderBottom: '1px solid transparent'
    },
    '&:hover:not(.foo):not(.foo):not(.foo):before': {
      borderBottom: '1px solid white'
    }
  },
  fullWidth: {
    width: '90%',
    maxWidth: '500px'
  },
  saveButton: {
    color: theme.palette.secondary.light,
    transition: 'all 0.35s ease-in-out'
  },
  deleteButton: {
    color: theme.palette.secondary.light
  },
  recentNotes: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.secondary.contrastText
  },
  // button animation
  buttonSuccess: {
    backgroundColor: green[300],
    '&:hover': {
      backgroundColor: green[500]
    },
    transform: 'rotateY(180deg)'
  },
  checkIcon: {
    transform: 'rotateY(-180deg)'
  },
  fabProgress: {
    color: theme.palette.secondary.light,
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1
  }
});

class TopBar extends Component {
  render() {
    // console.log('TopBar: render()');
    const { classes } = this.props;

    // topbar will render first so it does not receive currentNote
    // which is handled in Editor
    const title = this.props.currentNote ? this.props.currentNote.title : null;

    let titleElm = null;
    let actionButtons = null;

    if (title !== null) {
      titleElm = (
        <TextField
          onChange={event => {
            this.props.onChangeTitleHandler(event);
          }}
          fullWidth
          placeholder="Enter Title"
          value={title} // add two way data binding to update the value simultaneously
          margin="dense"
          InputProps={{
            classes: {
              input: classes.input,
              underline: classes.underline,
              fullWidth: classes.fullWidth
            }
          }}
        />
      );

      // change button class based on state
      const { loading, success } = this.props.saveNoteState;
      const buttonClassname = classNames([classes.saveButton], {
        [classes.buttonSuccess]: success
      });

      actionButtons = (
        <React.Fragment>
          {/* delete button */}
          <Tooltip title="Delete">
            <IconButton
              onClick={
                () =>
                  this.props.showConfirmDeleteNote(this.props.currentNote.id) // pass current note id
              }
              className={classes.deleteButton}
            >
              <Delete />
            </IconButton>
          </Tooltip>

          {/* save button */}
          <Tooltip title="Save">
            <IconButton
              onClick={this.props.handleSaveCurrentNote}
              className={buttonClassname}
            >
              {success ? <Check className={classes.checkIcon} /> : <Save />}
              {loading && (
                <CircularProgress
                  size={59}
                  thickness={2.5}
                  className={classes.fabProgress}
                />
              )}
            </IconButton>
          </Tooltip>
        </React.Fragment>
      );
    }

    if (this.props.location.pathname === '/notes') {
      titleElm = (
        <Typography variant="headline" className={classes.recentNotes}>
          Recent Notes
        </Typography>
      );
    }

    // console.log(this.props.location.pathname);

    return (
      <React.Fragment>
        <AppBar className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.props.handleDrawerToggle} // toggle open and close side drawer
              className={classes.iconButton}
            >
              <MenuIcon />
            </IconButton>
            {titleElm}
            {actionButtons}
          </Toolbar>
        </AppBar>
      </React.Fragment>
    );
  }
}

TopBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TopBar);
