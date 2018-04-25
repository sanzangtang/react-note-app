import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import TextField from 'material-ui/TextField';
import Save from '@material-ui/icons/Save';
import Delete from '@material-ui/icons/Delete';
import Tooltip from 'material-ui/Tooltip';
import Typography from 'material-ui/Typography';
import { CircularProgress } from 'material-ui/Progress';
import green from 'material-ui/colors/green';
import Check from '@material-ui/icons/Check';
import classNames from 'classnames';

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
      backgroundColor: theme.palette.primary.contrastText
    },
    '&:before': {
      backgroundColor: 'transparent'
    }
    // hover seems broken
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
    color: theme.palette.secondary.light
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
    color: green[300],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1
  }
});

class TopBar extends Component {
  // fake
  // state = {
  //   loading: false,
  //   success: false
  // };

  componentDidUpdate() {
    // console.log('Topbar: componentDidUpdate() ');
    // console.log(this.props.location.pathname);
  }

  // handleButtonClick = () => {
  //   if (!this.state.loading) {
  //     this.setState(
  //       {
  //         success: false,
  //         loading: true
  //       },
  //       () => {
  //         setTimeout(() => {
  //           this.setState(
  //             {
  //               loading: false,
  //               success: true
  //             },
  //             () => {
  //               setTimeout(() => {
  //                 this.setState({
  //                   loading: false,
  //                   success: false
  //                 });
  //               }, 2000);
  //             }
  //           );
  //         }, 1000);
  //       }
  //     );
  //   }
  // };

  render() {
    console.log('TopBar: render()');
    const { classes } = this.props;

    // change button class based on state
    const { loading, success } = this.props.saveNoteState;
    const buttonClassname = classNames([classes.saveButton], {
      [classes.buttonSuccess]: success
    });

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

      actionButtons = (
        <React.Fragment>
          <Tooltip title="Delete">
            <IconButton className={classes.deleteButton}>
              <Delete />
            </IconButton>
          </Tooltip>
          <Tooltip title="Save">
            <IconButton
              onClick={this.props.handleSaveCurrentNote}
              // onClick={this.handleButtonClick}
              className={buttonClassname}
            >
              {success ? <Check className={classes.checkIcon} /> : <Save />}
              {loading && (
                <CircularProgress size={59} className={classes.fabProgress} />
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

    console.log(this.props.location.pathname);

    return (
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
    );
  }
}

TopBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(TopBar);
