import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import SideBarContent from './SideBarContent';
import Avatar from '@material-ui/core/Avatar';
import UserMenu from '../UserMenu';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';

const drawerWidth = 300;

const styles = theme => ({
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      position: 'relative'
    }
  },
  topFixed: {
    padding: theme.spacing.unit * 2,
    position: 'fixed',
    backgroundColor: theme.palette.secondary.main,
    width: '300.6px', // fix the gap
    boxSizing: 'border-box',
    zIndex: 1
    // display: 'flex'
  },
  user: {
    display: 'flex',
    paddingTop: theme.spacing.unit * 2
  },
  avatar: {
    width: '60px',
    height: '60px',
    boxShadow: theme.shadows[2]
  },
  menu: {
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 4
  },
  appTitle: {
    color: theme.palette.primary.contrastText,
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.primary.dark,
      textDecoration: 'underline'
    },
    transition: 'all 0.2s linear'
  }
});

const SideBar = props => {
  const { classes } = props;

  // pass down again
  const notesList = (
    <div>
      <div style={{ height: '140px' }} />
      <SideBarContent notes={props.notes} />
    </div>
  );

  const userInfo = (
    <div className={classes.topFixed}>
      <Typography variant="headline" gutterBottom>
        <Link className={classes.appTitle} to="/notes">
          Cool Note
        </Link>
      </Typography>

      <Divider />

      <div className={classes.user}>
        <Avatar
          src={require('../../assets/boy.png')}
          className={classes.avatar}
        />
        <UserMenu onLogout={props.onLogout} className={classes.menu} />
      </div>
    </div>
  );

  return (
    <React.Fragment>
      <Hidden smUp>
        {/* for mobile drawer with a backdrop modal */}
        <Drawer
          variant="temporary"
          anchor="left"
          open={props.mobileOpen}
          onClose={props.handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {userInfo}
          {notesList}
        </Drawer>
      </Hidden>

      {/* hide size < 600px */}
      <Hidden xsDown implementation="css">
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
        >
          {userInfo}
          {notesList}
        </Drawer>
      </Hidden>
    </React.Fragment>
  );
};

SideBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SideBar);
