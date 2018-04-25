import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import { Link } from 'react-router-dom';
import sanitize from '../../utils/sanitize';

const styles = theme => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    paddingLeft: theme.spacing.unit * 4,
    paddingRight: theme.spacing.unit * 4,
    position: 'relative',
    height: '100vh',
    overflow: 'auto',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2
    }
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start'
  },
  card: {
    width: '100%',
    position: 'relative',
    margin: theme.spacing.unit,
    boxSizing: 'border-box',
    // [theme.breakpoints.up('sm')]: {
    //   width: '100%'
    // },
    [theme.breakpoints.up('md')]: {
      width: 'calc(50% - 16px)'
    },
    [theme.breakpoints.up('lg')]: {
      width: 'calc(33.33% - 16px)'
    }
  },
  noteContent: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 4
  },
  editButton: {
    position: 'absolute',
    bottom: '10px',
    right: '10px'
  },
  deleteButton: {
    position: 'absolute',
    bottom: '10px',
    right: '100px'
  }
});

const Dashboard = props => {
  const { classes } = props;

  let cards = null;

  // render when notes are fetched
  if (props.notes) {
    cards = Object.keys(props.notes).map(i => {
      const note = props.notes[i];
      const CustomLink = props => <Link to={'/notes/' + note.id} {...props} />;
      return (
        <Card className={classes.card} key={note.id} elevation={1}>
          <CardContent>
            <Typography variant="headline">{note.title}</Typography>
            <Typography className={classes.noteContent}>
              {note.content.length > 250
                ? sanitize(note.content).slice(0, 250) + '...'
                : sanitize(note.content).slice(0, 250)}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="medium"
              color="primary"
              className={classes.editButton}
              component={CustomLink}
            >
              Edit
            </Button>
            <Button
              size="medium"
              color="secondary"
              className={classes.deleteButton}
            >
              Discard
            </Button>
          </CardActions>
        </Card>
      );
    });
  }

  return (
    <main className={classes.content}>
      <div style={{ height: '85px' }} />
      <div className={classes.cardContainer}>{cards}</div>
    </main>
  );
};

export default withStyles(styles)(Dashboard);
