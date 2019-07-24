import axios from 'axios';

export function changeTodoState(e, path, route, origin){
    fetch(`http://localhost:5000/${route}`,{
      method: 'POST',
      mode: 'no-cors',
      headers: {'Content-type' : 'application'},
      body: JSON.stringify({
        userId: 'leomozzer',
        todoId: e,
        path: path,
        origin: origin
      })
    })
        .then(res => {console.log(res.data)})
        // .then(data => {console.log(data)})
}

export function newTodo(){
     fetch('http://localhost:5000/newTodo', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
          userId: 'leomozzer',
          title : 'Todo via React',
          text : 'lorem ipsum'
      })
    })
}

export async function showTodo(){
    const response = await axios('/showTodo?id=leomozzer');
    return response.data;
}