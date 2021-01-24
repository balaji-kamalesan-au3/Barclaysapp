import React from 'react';
import { Theme, createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { RowModel } from '@material-ui/data-grid';
import { Button } from '@material-ui/core';
import { cartBook } from '../App';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 2',
    },
    cover: {
      width : 300    
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    playIcon: {
      height: 38,
      width: 38,
    },
  }),
);


interface BookCardProps {
  book : RowModel | cartBook,
  removefromcart : (book : RowModel) => void;
  addtocart : (book : RowModel) => void
} 

export default function BookCard(props : BookCardProps) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className="cartlistcard">
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {props.book.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {props.book.authors}
          </Typography>
        </CardContent>
        <div className={classes.controls}>
            <Button onClick = {() => props.addtocart(props.book)}>
              Add to Cart
            </Button>
            <Button onClick = {() => props.removefromcart(props.book)}>
              Remove Item
            </Button>
        </div>
      </div>
      <CardMedia
        className={classes.cover}
        image={props.book.Image}
        title="Live from space album cover"
      />
    </Card>
    </div>
  );
}
