import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Email from '@material-ui/icons/MailOutline';
import Lock from '@material-ui/icons/LockOutline';
import { InputAdornment } from 'material-ui/Input';

// background image path
import bg from '../../assets/bg.jpg';

// redux
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: '200px'
  },
  paper: {
    // padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  image: {
    position: 'fixed',
    top: 0,
    height: '300px',
    width: '100%',
    backgroundImage: `url(${bg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    zIndex: -1
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing.unit * 4
  },
  banner: {
    position: 'relative',
    height: '120px',
    backgroundColor: theme.palette.secondary.main
  },
  bannerTitle: {
    textAlign: 'left',
    position: 'absolute',
    bottom: 0,
    padding: theme.spacing.unit * 4,
    verticalAlign: 'bottom',
    color: theme.palette.secondary.light
  },
  signIn: {
    width: '100px',
    marginLeft: theme.spacing.unit * 2
  },
  signUp: {
    width: '100px'
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    marginTop: theme.spacing.unit * 2
  },
  error: {
    color: theme.palette.error.light
  }
});

class Auth extends Component {
  state = {
    ifSignInMode: true,
    loginForm: {
      email: null,
      password: null
    },
    error: false // fake
  };

  _handleSwitchMode = () => {
    this.setState({ ifSignInMode: !this.state.ifSignInMode });
  };

  _handleFormChange = (event, key) => {
    // console.log(key, event.target.value);
    this.setState({
      loginForm: {
        ...this.state.loginForm,
        [key]: event.target.value
      }
    });
  };

  _handleFormSubmit = event => {
    event.preventDefault();
    this.props.onSignIn(this.state.loginForm);
  };

  _checkFormValidation = () => {
    // validate form when clicking on a button
  };

  render() {
    const { classes } = this.props;

    let errorMsg = null;
    if (this.state.error) {
      errorMsg = <span className={classes.error}>Some error message here</span>;
    }

    let form = (
      <form className={classes.form} onSubmit={this._handleFormSubmit}>
        <TextField
          required
          label="Email"
          fullWidth
          margin="normal"
          type="email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email />
              </InputAdornment>
            )
          }}
          key="email"
          onChange={event => this._handleFormChange(event, 'email')}
        />
        <TextField
          required
          label="Password"
          fullWidth
          margin="normal"
          type="password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            )
          }}
          key="password"
          onChange={event => this._handleFormChange(event, 'password')}
        />
        <div className={classes.buttonGroup}>
          <Button
            className={classes.signUp}
            color="secondary"
            onClick={this._handleSwitchMode}
          >
            Register
          </Button>
          <Button
            className={classes.signIn}
            variant="raised"
            color="primary"
            type="submit"
          >
            Login
          </Button>
        </div>
      </form>
    );

    if (!this.state.ifSignInMode) {
    }

    return (
      <div className={classes.root}>
        <div className={classes.image} />

        <Grid container>
          <Grid item xs={1} sm={2} md={3} lg={4} />

          <Grid item xs={10} sm={8} md={6} lg={4}>
            <Paper className={classes.paper} elevation={1}>
              <div className={classes.banner}>
                <Typography className={classes.bannerTitle} variant="display1">
                  WELCOME!
                </Typography>
              </div>
              {errorMsg}
              {form}
            </Paper>
          </Grid>
          <Grid item xs={1} sm={2} md={3} lg={4} />
        </Grid>
      </div>
    );
  }
}

Auth.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    onSignIn: userData => dispatch(actions.signInAsync(userData))
  };
};

export default withStyles(styles, { withTheme: true })(
  connect(null, mapDispatchToProps)(Auth)
);
