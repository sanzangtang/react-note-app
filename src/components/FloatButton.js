import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AddIcon from '@material-ui/icons/Add';
import Button from 'material-ui/Button';
import Tooltip from 'material-ui/Tooltip';

const styles = theme => ({
  button: {
    zIndex: 1500,
    position: 'fixed',
    bottom: theme.spacing.unit * 3,
    right: theme.spacing.unit * 3
    // backgroundColor: theme.palette.secondary.main
  },
  icon: {
    color: theme.palette.secondary.contrastText
  }
});

function AddButton(props) {
  const { classes } = props;
  return (
    <Tooltip title="Add new note" placement="top">
      <Button
        variant="fab"
        className={classes.button}
        onClick={props.handleAddNewNote}
        color="primary"
      >
        <AddIcon className={classes.icon} />
      </Button>
    </Tooltip>
  );
}

AddButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddButton);
