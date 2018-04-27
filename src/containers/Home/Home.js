import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Tooltip from 'material-ui/Tooltip';
import ChevronRight from '@material-ui/icons/ChevronRight';
import SnackBar from '../../components/SnackBar/SnackBar';

// redux
import { connect } from 'react-redux';

const styles = theme => {
  return {
    root: {
      flexGrow: 1
    },
    image: {
      position: 'fixed',
      top: 0,
      height: '100%',
      width: '100%',
      background: theme.palette.primary.main,
      // background:
      //   'linear-gradient(201deg, rgba(42,230,232,1) 0%, rgba(137,190,250,1) 42%, rgba(45,156,253,1) 100%)',
      // backgroundImage: `url(${bg})`,
      // backgroundRepeat: 'no-repeat',
      // backgroundSize: 'cover',
      zIndex: -1,
      textAlign: 'center'
    },
    top: {
      textAlign: 'right',
      margin: theme.spacing.unit * 3
    },
    content: {
      textAlign: 'left',
      margin: '0 auto',
      marginTop: '180px',
      width: '50%',
      [theme.breakpoints.down('sm')]: {
        width: '80%'
      }
    },
    title: {
      color: '#FFFFFF',
      fontWeight: 500
    },
    subtitle: {
      color: '#FAFAFA'
    },
    button: {
      marginTop: theme.spacing.unit * 2,
      color: '#FAFAFA',
      backgroundColor: '#F06292',
      '&:hover': {
        backgroundColor: '#2196F3'
      },
      borderRadius: '20px'
    }
  };
};

class Home extends Component {
  state = {
    snackOpen: true
  };

  componentDidMount() {
    console.log('Home: componentDidMount()');
  }

  componentDidUpdate() {
    console.log('Home: componentDidUpdate()');
  }

  _handleCloseSnack = () => {
    this.setState({ snackOpen: false });
  };

  render() {
    const { classes } = this.props;

    let logoutMsg = null;
    if (this.props.ifLogout) {
      logoutMsg = (
        <SnackBar
          snackOpen={this.state.snackOpen}
          closeSnack={this._handleCloseSnack}
          message="You have logged out or user session expired"
        />
      );
    }

    let getStarted = null;
    if (this.props.isAuth) {
      getStarted = props => <Link to="/notes" {...props} />;
    } else {
      getStarted = props => <Link to="/account" {...props} />;
    }

    return (
      <div className={classes.root}>
        {logoutMsg}
        <div className={classes.image}>
          <div className={classes.top}>
            <Tooltip title="Github">
              <IconButton href="https://github.com/sanzangtang/react-note-app">
                <i className="fab fa-github" />
              </IconButton>
            </Tooltip>
          </div>
          <div className={classes.content}>
            <Typography variant="display3" className={classes.title}>
              Cool Note
            </Typography>

            <Typography variant="display1" className={classes.subtitle}>
              An elegant note app based on React, Material UI and Firebase.
            </Typography>

            <Button
              component={getStarted} // props => getStarted(props)
              variant="raised"
              size="large"
              className={classes.button}
            >
              <ChevronRight />
              Get Started
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ifLogout: state._auth.ifLogout,
    isAuth: state._auth.idToken !== null // actually redundant
  };
};

export default connect(mapStateToProps)(withStyles(styles)(Home));
