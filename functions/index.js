const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const bodyParses = require('body-parser')
const app = express();
const uniqid = require('uniqid')
const {firebaseCredentials } = require('./credentials/credentials')
admin.initializeApp();
// const userId = "leomozzer"
// app.use(express.urlencoded());
// app.use(express.json())
app.use(bodyParses.urlencoded({
    extended: true
}))
const router = express.Router();
app.use(bodyParses.json())

async function newTodo(user, inputTitle, inputText){
    let todos;
    let addTodos;
    const date = new Date()
    var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    var currentDate = date.getDate() +"/"+ (date.getMonth() + 1) +"/"+ date.getFullYear()
    const newTodo = {
        date: currentDate,
        id: uniqid.time(),
        time: time,
        title: inputTitle,
        text: inputText
    }
    const data = await firebaseCredentials.database().ref(`projects/TodoList/${user}/todo/open`).once('value');
    todos = data.val()
    if(todos === null){
        addTodos = [newTodo]
    }
    else{
        addTodos = todos.concat(newTodo)
    }
    return await firebaseCredentials.database().ref(`projects/TodoList/${user}/todo/open`).set(addTodos,
        function(err){
            if (err){
                console.log("ERR")
            }
            else{
                console.log("OK")
            }
        }
    ) 
}

async function openTodos(user){
    const data = await firebaseCredentials.database().ref(`projects/TodoList/${user}/todo/open`).once('value');
    const todos = data.val();
    console.log(todos);
    // console.log(data)
    return JSON.stringify(todos);
}

async function deleteTodo(user, id){
    //return await firebase.database().ref(`projects/TodoList/${user}/todo`)
    firebaseCredentials.database().ref(`projects/TodoList/${user}/todo/open/${id}`).remove()
    return await firebase.database().ref(`projects/TodoList/${user}/todo/deleted/${id}`).update({
        title: "First Todo",
        date: 'ola',
        time: 'ola',
    })
}

async function archiveTodo(user, id){
    firebaseCredentials.database().ref(`projects/TodoList/${user}/todo/open/${id}`).remove();
    return await firebaseCredentials.database().ref(`projects/TodoList/${user}/todo/archived/${id}`).update({
        title: "First Todo",
        date: 'ola',
        time: 'ola',
    })
}
async function changeStateTodo(user, id, path){
    console.log(path)
    const readOpen = await firebaseCredentials.database().ref(`projects/TodoList/${user}/todo/open`).once('value');
    const storedPath = await firebaseCredentials.database().ref(`projects/TodoList/${user}/todo/${path}`).once('value');
    let openTodos = readOpen.val();
    // let favoriteTodos = readFavorites.val()
    let dataPath = storedPath.val();
    const size = openTodos.length;
    let newFavoriteTodo;
    let changedTodo;
    console.log(dataPath)
    console.log(openTodos)
    for(let i = 0; i < size; i++){
        if(id === openTodos[i].id){
            if(dataPath === null){
                console.log('null')
                changedTodo = [openTodos[i]];
                openTodos.splice(i, 1)
                console.log(newFavoriteTodo)
                console.log(openTodos)
                break;
            }
            else{
                console.log('!null')
                changedTodo = dataPath.concat(openTodos[i]);
                openTodos.splice(i, 1);
                console.log(changedTodo);
                console.log(openTodos)
            }
        }
    }
    // return openTodos;
    firebaseCredentials.database().ref(`projects/TodoList/${user}/todo/${path}`).set(changedTodo,
        function(err){
            if (err){
                console.log("ERR")
            }
            else{
                firebaseCredentials.database().ref(`projects/TodoList/${user}/todo/open`).set(openTodos,
                    function(err){
                        if (err){
                            console.log("ERR")
                        }
                        else{
                            console.log("OK")
                        }
                    }
                )  
            }
        }
    )
}
// async function favoriteTodo(user, id){
//     const readOpen = await firebaseCredentials.database().ref(`projects/TodoList/${user}/todo/open`).once('value');
//     const readFavorites = await firebaseCredentials.database().ref(`projects/TodoList/${user}/todo/favorites`).once('value');
//     let openTodos = readOpen.val();
//     let favoriteTodos = readFavorites.val()
//     const size = openTodos.length;
//     let newFavoriteTodo;
//     console.log(favoriteTodos)
//     console.log(openTodos)
//     for(let i = 0; i < size; i++){
//         if(id === openTodos[i].id){
//             if(favoriteTodos === null){
//                 console.log('null')
//                 newFavoriteTodo = [openTodos[i]];
//                 openTodos.splice(i, 1)
//                 console.log(newFavoriteTodo)
//                 console.log(openTodos)
//                 break;
//             }
//             else{
//                 console.log('!null')
//                 newFavoriteTodo = favoriteTodos.concat(openTodos[i]);
//                 openTodos.splice(i, 1);
//                 console.log(favoriteTodos);
//                 console.log(openTodos)
//             }
//         }
//     }
//     firebaseCredentials.database().ref(`projects/TodoList/${user}/todo/favorites`).set(newFavoriteTodo,
//         function(err){
//             if (err){
//                 console.log("ERR")
//             }
//             else{
//                 firebaseCredentials.database().ref(`projects/TodoList/${user}/todo/open`).set(openTodos,
//                     function(err){
//                         if (err){
//                             console.log("ERR")
//                         }
//                         else{
//                             console.log("OK")
//                         }
//                     }
//                 )  
//             }
//         }
//     )
// }

// async function teste(){
//     await fetch('/favoriteTodo', {
//         method: 'POST',
//         headers : {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             userId: 'leomozzer',
//             todoId: 'jyeebxgj',
//         })
//     })
// }
// app.get('/newTodo', (req, res) => {
//     // res.json(ReadGroups().then(res=> console.log(res)))
//     // ReadGroups().then(response => res.send(response))
//     // return firebase.database().ref('new/teste').set({
//     //     name: 'ola'
//     // })
//     // res.send('store')
//     //const newTeste = async () => { await newTodo(userId, idNotes)};
//     //newTodo(userId, idNotes)
//     console.log(req.body)
//     newTodo(userId).then(response => {res.send(response)})
//     //res.send('ola')
// })
app.post('/newTodo', (req, res)=> {
    console.log(req.body)
    console.log(req.body.userId)
    var info = JSON.parse(req.body)
    console.log(info)
    newTodo(info.userId, info.title, info.text).then(response => res.send('feito'))
})

app.get('/ola', (req, res, next) => {
    res.json([
        {id : 'ola'}
    ])
})


app.get('/showTodo', async (req, res) => {
    const userId = req.query.id;
    const data = await firebaseCredentials.database().ref(`projects/TodoList/${userId}/todo/open`).once('value');
    const todos = data.val();
    if(todos=== null){
        res.json([{}])
    }
    else{
        res.json(data.val());
    }
})

app.get('/deleteTodo', (req, res)=> {
    deleteTodo(userId, 'jybu2f5h').then(response => res.send('feito'))
})
app.get('/archiveTodo', (req, res)=> {
    archiveTodo(userId, 'jyed73sm').then(response => res.send('feito'))
})
app.post('/archiveTodo', (req, res) => {
    var info = JSON.parse(req.body)
    changeStateTodo(info.userId, info.todoId, info.path)
})
app.post('/favoriteTodo', (req, res) => {
    console.log(req.body)
    console.log(req.body.name)
    var info = JSON.parse(req.body)
    // favoriteTodo(info.userId, info.todoId)
    changeStateTodo(info.userId, info.todoId, info.path)
    // res.send('feito')
    // favoriteTodo(req.body.userId, req.body.todoId).then(response => res.send('feito'))
})
app.get('/favoriteTodo', (req, res) => {
    console.log(req.body)
    favoriteTodo(userId, '').then(response => res.render('index', {body : response}))
})

app.get('/new-cached', (req, res) => {
    res.set('Cache-Control', 'public', 'max-age=300', 's-maxage=600');
    res.send('OK!')
})

// app.get('/teste', (req, res)=>{
//     teste().then(response => res.send('feito'))
// })

//app.use(require('./src/routes'))

//module.exports = router;
// app.listen('5000')
exports.app = functions.https.onRequest(app)
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
