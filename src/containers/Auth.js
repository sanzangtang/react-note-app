import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Email from '@material-ui/icons/MailOutline';
import Lock from '@material-ui/icons/LockOutline';
import { InputAdornment } from 'material-ui/Input';

// background image path
import bg from '../assets/bg.jpg';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../store/actions/index';

// hoc
import withError from '../hoc/withError';

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
    height: '40%',
    width: '100%',
    minHeight: '400px',
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
    color: theme.palette.secondary.contrastText
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
  }
});

class Auth extends Component {
  state = {
    ifSignInMode: true,
    form: {
      email: null,
      password: null
    }
  };

  componentDidMount() {
    this.props.boundActions.setGlobalLoading();
  }

  _handleSwitchMode = () => {
    this.setState({ ifSignInMode: !this.state.ifSignInMode });
  };

  _handleFormChange = (event, key) => {
    this.setState({
      form: {
        ...this.state.form,
        [key]: event.target.value
      }
    });
  };

  _handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.ifSignInMode) {
      this.props.boundActions.signInAsync(this.state.form, this.props); // pass props for redirecting
    } else {
      // sign up
      this.props.boundActions.signUpAsync(this.state.form, this.props);
    }
  };

  render() {
    const { classes } = this.props;

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
            {this.state.ifSignInMode ? 'Register' : 'Back'}
          </Button>
          <Button
            className={classes.signIn}
            variant="raised"
            color="primary"
            type="submit"
          >
            {this.state.ifSignInMode ? 'Login' : 'Register'}
          </Button>
        </div>
      </form>
    );

    let signUpSuccess = <p>Your account is: </p>;

    return (
      <div className={classes.root}>
        <div className={classes.image} />

        <Grid container>
          <Grid item xs={1} sm={2} md={3} lg={4} />
          <Grid item xs={10} sm={8} md={6} lg={4}>
            <Paper className={classes.paper} elevation={1}>
              <div className={classes.banner}>
                <Typography className={classes.bannerTitle} variant="display1">
                  {this.state.ifSignInMode ? 'WELCOME!' : 'REGISTER'}
                </Typography>
              </div>
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

const mapStateToProps = state => {
  return {
    error: state._global.gError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // just an example of using bindActionCreators for reducing some codes
    // call this.props.boundActions
    boundActions: bindActionCreators(actions, dispatch),
    onClearGlobalError: () => dispatch(actions.clearGlobalError())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withError(Auth, styles)
);
