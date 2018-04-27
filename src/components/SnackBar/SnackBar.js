import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
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
          autoHideDuration={3000}
          onClose={this.props.closeSnack}
          message={<span>{this.props.message}</span>}
          action={[
            <Button
              className={classes.button}
              key="main-button"
              color="secondary"
              size="medium"
              onClick={this.props.mainAction}
            >
              CONFIRM
            </Button>,
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
  mainAction: PropTypes.func.isRequired, // main button
  closeSnack: PropTypes.func // close snack func
};

export default withStyles(styles)(SnackBar);
