import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';

const styles = theme => ({
  container: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    zIndex: '9999',
    textAlign: 'center',
    backgroundColor: theme.palette.background.default,
    transition: 'all 0.8s ease-in-out'
  },
  close: {
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  progress: {
    margin: 'calc(50vh - 50px) auto'
  }
});

class Loading extends Component {
  state = {
    exit: false
  };

  // be careful!
  _onExit = () => {
    setTimeout(() => {
      this.setState({ exit: true });
    }, 800);
  };

  render() {
    const { classes } = this.props;

    console.log('loading loading', this.props.loading);

    // if loading finished (false) and exit is false
    if (!this.props.loading && !this.state.exit) {
      this._onExit();
    }

    let loading = (
      <div
        className={[
          classes.container,
          !this.props.loading && classes.close // if not loading then css transition
        ].join(' ')}
      >
        {this.props.loading ? (
          <CircularProgress
            className={classes.progress}
            thickness={4.5}
            size={50}
            color="primary"
          />
        ) : null}
      </div>
    );

    if (this.state.exit) {
      loading = null;
    }

    return loading;
  }
}

Loading.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default withStyles(styles)(Loading);
