import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Hidden from 'material-ui/Hidden';
import SideBarContent from './SideBarContent/SideBarContent';
import Avatar from 'material-ui/Avatar';

const drawerWidth = 300;

const styles = theme => ({
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      position: 'relative'
    }
  },
  topFixed: {
    padding: theme.spacing.unit * 3,
    position: 'fixed',
    backgroundColor: theme.palette.secondary.main,
    width: '300px',
    boxSizing: 'border-box',
    zIndex: 1
  },
  avatar: {
    width: '60px',
    height: '60px'
  }
});

const SideBar = props => {
  const { classes, theme } = props;

  // pass down again
  const notesList = (
    <div>
      <div style={{ height: '100px' }} />
      <SideBarContent notes={props.notes} />
    </div>
  );

  const userInfo = (
    <div className={classes.topFixed}>
      <Avatar
        src={require('../../assets/boy.png')}
        className={classes.avatar}
      />
    </div>
  );

  return (
    <React.Fragment>
      <Hidden smUp>
        {/* for mobile drawer with a backdrop modal */}
        <Drawer
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
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
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(SideBar);
