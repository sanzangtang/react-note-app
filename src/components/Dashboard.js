import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Link } from 'react-router-dom';
import sanitize from '../utils/sanitize';

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
  },
  media: {
    height: 0,
    // paddingTop: '56.25%' // 16:9
    paddingTop: '35%'
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

      // match the first <img> tag
      const imgRex = note.content.match(/<img src="([\w\W]+?)"/);
      let imgLink = '';
      if (imgRex) {
        imgLink = imgRex[0].slice(9);
      }

      return (
        <Card className={classes.card} key={note.id} elevation={1}>
          {/* contionally render card media */}
          {imgLink !== '' ? (
            <CardMedia className={classes.media} image={imgLink} />
          ) : null}

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
              onClick={() => props.showConfirmDeleteNote(note.id)} // show snack bar and pass note id
            >
              Discard
            </Button>
          </CardActions>
        </Card>
      );
    });
  }

  return (
    <React.Fragment>
      <main className={classes.content}>
        <div style={{ height: '85px' }} />
        <div className={classes.cardContainer}>{cards}</div>
      </main>
    </React.Fragment>
  );
};

export default withStyles(styles)(Dashboard);
