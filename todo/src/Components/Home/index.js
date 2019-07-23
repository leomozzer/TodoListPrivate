import React, {useEffect, useState} from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CheckBoxOutlineBlank from '@material-ui/icons/CheckBoxOutlineBlank';
import {} from '@material-ui/core/'
import {cardStyles} from '../CSS/card';
import {textStyles} from '../CSS/inputText'
import axios from 'axios'

export default function Home() {
  const classes = cardStyles();
  const text = textStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [update, setUpdate] = useState(false)

  function handleExpandClick() {
    setExpanded(!expanded);
  }


  function btnFavoriteTodo(){
    fetch('http://localhost:5000/favoriteTodo',{
      method: 'POST',
      mode: 'no-cors',
      headers: {'Content-type' : 'application'},
      body: JSON.stringify({
        userId: 'lemozzer',
        todoId: 'jyena575',
      })
    })
  }
  async function favoriteTodo(){
    await fetch('http://localhost:5000/favoriteTodo',{
      method: 'POST',
      mode: 'no-cors',
      headers : {'Content-type' : 'application/json'},
      body: JSON.stringify({
        userId : 'leomozzer',
        todoId : ''
      })
    })
  }
  //add Todo via POST
  // async function newTodo(){
  //   await fetch('http://localhost:5000/newTodo', {
  //     method: 'POST',
  //     mode: 'no-cors',
  //     headers: {
  //       'Content-Type':'application/json'
  //     },
  //     body: JSON.stringify({
  //         userId: 'leomozzer',
  //         title : 'Todo via React'
  //     })
  //   })
  // }
  function showTodo(){
    fetch('/ola').
      then(res => {console.log(res)}).then(response => setUpdate(response))
  }

  useEffect(() => {
    //showTodo();
    console.log(update)
    axios.get('http://localhost:5000/showTodo?id=leomozzer', {
      method : 'GET'
    }).then(res => console.log(res))
  })
  fetch('/showTodo?id=leomozzer', {
    mode : 'no-cors',
    method : 'GET'
  }).then( res => res.json())
  fetch('http://localhost:5000/showTodo?id=leomozzer', {
    mode : 'no-cors',
    method : 'GET'
  }).then( res => console.log(res))
  fetch('http://localhost:5000/showTodo?id=leomozzer', {
    mode: 'no-cors',
    method : 'GET',
    headers : {
      "Accept"  : "application/json"
    }
  }).then(response => response.json())
    .then(response => {
      console.log(response.body)
    }).catch(erro => console.log('error'))
  return (
    <>
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
          <IconButton aria-label="Add to favorites" onClick={btnFavoriteTodo}>
            <FavoriteBorder />
          </IconButton>
          <IconButton aria-label="Add to archived notes">
            <CheckBoxOutlineBlank />
          </IconButton>
          <IconButton aria-label="Delete note">
            <DeleteOutline />
          </IconButton>
          {/* <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton> */}
        </CardActions>
        {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Method:</Typography>
            <Typography paragraph>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
              minutes.
            </Typography>
            <Typography paragraph>
              Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
              heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
              browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
              and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
              pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
              saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
            </Typography>
            <Typography paragraph>
              Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
              without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
              medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
              again without stirring, until mussels have opened and rice is just tender, 5 to 7
              minutes more. (Discard any mussels that don’t open.)
            </Typography>
            <Typography>
              Set aside off of the heat to let rest for 10 minutes, and then serve.
            </Typography>
          </CardContent>
        </Collapse> */}
      </Card>
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
    </Card>
    </>
  );
}