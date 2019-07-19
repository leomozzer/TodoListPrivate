import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Favorite from '@material-ui/icons/Favorite';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CheckBoxOutlineBlank from '@material-ui/icons/CheckBoxOutlineBlank'
import {cardStyles} from '../CSS/card'

export default function Favorites() {
  const classes = cardStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="Recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="Settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="First Note"
        subheader="Julho 18, 2019"
      />
      <CardMedia
        className={classes.media}
        image="/static/images/cards/paella.jpg"
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          This impressive paella is a perfect party dish and a fun meal to cook together with your
          guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="Add to favorites">
          <Favorite />
        </IconButton>
        <IconButton aria-label="Add to archived notes">
          <CheckBoxOutlineBlank />
        </IconButton>
        <IconButton aria-label="Delete note">
          <DeleteOutline />
        </IconButton>
      </CardActions>
    </Card>
  );
}