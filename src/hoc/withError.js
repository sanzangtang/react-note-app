import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogActions';
import { withStyles } from '@material-ui/core/styles';
import Error from '@material-ui/icons/ErrorOutline';

const mapErrorMsg = {
  EMAIL_NOT_FOUND: 'Email does not exist.',
  INVALID_PASSWORD: 'Password is invalid.'
};

// when wrapped component is connected (also wrapped) to redux
// WithError will have all props that wrapped component has
const withError = (WrappedComponent, styles, errorMessage = null) => {
  class WithError extends Component {
    state = {
      open: false
    };

    _handleClose = () => {
      this.setState({ open: false });
      // clear global error in redux
      this.props.onClearGlobalError();
    };

    componentDidUpdate() {
      if (this.props.error && !this.state.open) {
        this.setState({ open: true });
      }
    }

    render() {
      let dialog = null;

      if (this.props.error) {
        // check customized error message or set at default
        const message = errorMessage
          ? errorMessage
          : mapErrorMsg[this.props.error.response.data.error.message]; // firebase error.message

        dialog = (
          <Dialog open={this.state.open} onClose={this._handleClose}>
            <DialogTitle>
              <Error
                // inline styles here
                style={{
                  paddingRight: this.props.theme.spacing.unit * 2
                }}
                color="error"
              />
              {"Hmm...Something didn't work..."}
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

  WithError.propTypes = {
    error: PropTypes.object,
    onClearGlobalError: PropTypes.func.isRequired
  };

  // return react component
  return withStyles(styles, { withTheme: true })(WithError);
};

export default withError;
