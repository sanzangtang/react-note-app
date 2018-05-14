import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
    color: theme.palette.secondary.contrastText
  },
  button: {
    color: theme.palette.primary.contrastText
  }
});

// could be stateless
class SnackBar extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          open={this.props.snackOpen}
          autoHideDuration={this.props.ifAutoHide ? 4000 : null} // if auto hide is true
          onClose={this.props.closeSnack}
          message={<span>{this.props.message}</span>}
          action={[
            // if main action is passed
            this.props.mainAction && (
              <Button
                className={classes.button}
                key="main-button"
                color="secondary"
                size="medium"
                onClick={this.props.mainAction}
              >
                CONFIRM
              </Button>
            ),
            <IconButton
              key="close-button"
              className={classes.close}
              onClick={this.props.closeSnack}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    );
  }
}

SnackBar.propTypes = {
  classes: PropTypes.object.isRequired,
  snackOpen: PropTypes.bool, // if open or not
  message: PropTypes.string, // message for display
  mainAction: PropTypes.func, // main button
  closeSnack: PropTypes.func.isRequired, // close snack func
  ifAutoHide: PropTypes.bool
};

export default withStyles(styles)(SnackBar);
