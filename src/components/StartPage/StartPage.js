import React from 'react';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
    position: 'relative',
    height: '100vh'
  }
});

const StartPage = props => {
  const { classes } = props;

  return (
    <main className={classes.content}>
      <div style={{ height: '85px' }} />
      <h3>Start Page!</h3>
    </main>
  );
};

export default withStyles(styles)(StartPage);
