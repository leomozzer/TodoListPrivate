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
// import {} from '@material-ui/core/'
import {cardStyles} from '../CSS/card';
import {textStyles} from '../CSS/inputText'
import axios from 'axios'
import {changeTodoState, newTodo, showTodo} from '../../Functions/firestore'

export default function Home() {
  const classes = cardStyles();
  // const text = textStyles();
  const [todos, setTodos] = useState([]);
  const [update, setUpdate] = useState(false);

  // function changeTodoState(e, path){
  //   fetch('http://localhost:5000/favoriteTodo',{
  //     method: 'POST',
  //     mode: 'no-cors',
  //     headers: {'Content-type' : 'application'},
  //     body: JSON.stringify({
  //       userId: 'leomozzer',
  //       todoId: e,
  //       path: path
  //     })
  //   })
  //   // setUpdate(true);
  // }
  // async function favoriteTodo(){
  //   await fetch('http://localhost:5000/favoriteTodo',{
  //     method: 'POST',
  //     mode: 'no-cors',
  //     headers : {'Content-type' : 'application/json'},
  //     body: JSON.stringify({
  //       userId : 'leomozzer',
  //       todoId : ''
  //     })
  //   })
  // }
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
  //         title : 'Todo via React',
  //         text : 'lorem ipsum'
  //     })
  //   })
  // }
  // async function showTodo(){
  //   const response = await axios('/showTodo?id=leomozzer');
  //   console.log(response.data)
  //   setTodos(response.data);
  // }

  useEffect( () => {
    showTodo().then(res => {setTodos(res)})
    // newTodo()
  },[update])
  
  return (
    <div>
      {todos.map((res, i) => {
        return(
          <Card key={i} className={classes.card}>
            <CardHeader title={res.title} subheader={res.date}/>
            <CardContent>
              <Typography variant='body2' color='textSecondary' component='p'>
                {res.text}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="Add to favorites" onClick={() => changeTodoState(res.id, 'favorites', 'favoriteTodo', 'home')} >
                <FavoriteBorder/>
              </IconButton>
              <IconButton aria-label="Add to archived notes" onClick={() => changeTodoState(res.id, 'archived', 'archiveTodo', 'home')}>
                <CheckBoxOutlineBlank />
              </IconButton>
              <IconButton aria-label="Delete note">
                <DeleteOutline />
              </IconButton>
            </CardActions>
          </Card>
        )
      })}
    </div>
  );
}