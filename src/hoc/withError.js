import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog';
import { withStyles } from 'material-ui/styles';
import Error from '@material-ui/icons/ErrorOutline';

const styles = theme => ({
  root: {},
  icon: {
    paddingRight: theme.spacing.unit * 2
  }
});

// when wrapped component is connected (also wrapped) to redux
// WithError will have all props that wrapped component has
// it sounds interesting
const withError = WrappedComponent => {
  class WithError extends Component {
    state = {
      open: false
    };

    _handleClose = () => {
      this.setState({ open: false });
      // clear global error in redux
      this.props.onClearGlobalError();
    };

    render() {
      const { classes, error } = this.props;

      let dialog = null;

      if (error && !this.state.open) {
        this.setState({ open: true });
      }

      if (error) {
        const message = `${error.message}`;
        dialog = (
          <Dialog open={this.state.open} onClose={this._handleClose}>
            <DialogTitle>
              <Error className={classes.icon} color="error" />
              Hmm...Something didn't work...
            </DialogTitle>
            <DialogContent>
              <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this._handleClose} color="primary" autoFocus>
                CLOSE
              </Button>
            </DialogActions>
          </Dialog>
        );
      }

      return (
        <React.Fragment>
          {dialog}
          <WrappedComponent {...this.state} {...this.props} />
        </React.Fragment>
      );
    }
  }

  // return react component
  return withStyles(styles, { withTheme: true })(WithError);
};

export default withError;
