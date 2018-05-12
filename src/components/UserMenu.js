import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import Accountcircle from '@material-ui/icons/AccountCircle';
import Settings from '@material-ui/icons/Settings';
import ExitToApp from '@material-ui/icons/ExitToApp';
import { fade } from 'material-ui/styles/colorManipulator';
import { Link } from 'react-router-dom';

const styles = theme => ({
  button: {
    textTransform: 'capitalize',
    color: theme.palette.primary.contrastText,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    '&:hover': {
      backgroundColor: fade(
        theme.palette.action.hover,
        theme.palette.action.hoverOpacity
      )
    }
  },
  icon: {
    marginRight: theme.spacing.unit * 3
  },
  item: {
    paddingRight: theme.spacing.unit * 4
  }
});

class UserMenu extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const { classes } = this.props;

    return (
      <div className={this.props.className}>
        <Button
          // aria-owns={anchorEl ? 'simple-menu' : null}
          // aria-haspopup="true"
          className={classes.button}
          onClick={this.handleClick}
        >
          My Account
          <ArrowDropDown />
        </Button>

        <Menu
          // id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem
            component={props => <Link to="/profile" {...props} />}
            className={classes.item}
            // onClick={this.handleClose}
          >
            <Accountcircle className={classes.icon} />
            Profile
          </MenuItem>
          <MenuItem
            component={props => <Link to="/settings" {...props} />}
            className={classes.item}
            // onClick={this.handleClose}
          >
            <Settings className={classes.icon} />
            Setting
          </MenuItem>
          <MenuItem className={classes.item} onClick={this.props.onLogout}>
            <ExitToApp className={classes.icon} />
            Logout
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

UserMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired
};

export default withStyles(styles)(UserMenu);
