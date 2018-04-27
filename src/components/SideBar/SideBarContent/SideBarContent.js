import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { Link } from 'react-router-dom';
import moment from 'moment';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    zIndex: 0 // hide below top
  }
});

class SideBarContent extends Component {
  componentDidMount() {
    console.log('SideBarContent: componentDidMount()');
  }

  componentDidUpdate() {
    console.log('SideBarContent: componentDidUpdate()');
  }

  shouldComponentUpdate(nextProps, nexState) {
    // do not re-render SideBar if notes are the same
    return nextProps.notes !== this.props.notes;
  }

  render() {
    const { classes } = this.props;
    let listItems = null;

    listItems = Object.keys(this.props.notes).map(i => {
      const note = this.props.notes[i];
      const CustomLink = props => <Link to={'/notes/' + note.id} {...props} />;
      return (
        <ListItem button key={note.id} component={CustomLink}>
          <ListItemText
            primary={note.title}
            secondary={moment(note.date).fromNow()}
          />
        </ListItem>
      );
    });

    // map notes lists
    // listItems = this.props.notes.map(note => {
    //   const CustomLink = props => <Link to={'/notes/' + note.id} {...props} />;
    //   return (
    //     <ListItem button key={note.id} component={CustomLink}>
    //       <ListItemText primary={note.title} secondary={note.date} />
    //     </ListItem>
    //   );
    // });

    return (
      <div className={classes.root}>
        <List component="nav" />
        {listItems}
        <Divider />
      </div>
    );
  }
}

SideBarContent.propTypes = {
  classes: PropTypes.object.isRequired
};

// keep withRouter here for now
export default withStyles(styles)(SideBarContent);
