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
    extended: false
}))
const router = express.Router();
app.use(bodyParses.json())

async function newTodo(user, inputTitle){
    const date = new Date()
    var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    var currentDate = date.getDate() +"/"+ (date.getMonth() + 1) +"/"+ date.getFullYear()
    return await firebaseCredentials.database().ref(`${user}/todo/open/${uniqid.time()}`).update({
        title: inputTitle,
        date: currentDate,
        time: time,
        archived: false,
        deleted: false,
        favorite: false,
        open: true
    },
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
    const data = await firebaseCredentials.database().ref(`${user}/todo/open`).once('value');
    const todos = data.val();
    console.log(todos);
    console.log(data)
    return data;
}

async function deleteTodo(user, id){
    //return await firebase.database().ref(`${user}/todo`)
    firebaseCredentials.database().ref(`${user}/todo/open/${id}`).remove()
    return await firebase.database().ref(`${user}/todo/deleted/${id}`).update({
        title: "First Todo",
        date: 'ola',
        time: 'ola',
        archived: false,
        deleted: true,
        favorite: false,
        open: false,
    })
}

async function archiveTodo(user, id){
    firebaseCredentials.database().ref(`${user}/todo/open/${id}`).remove();
    return await firebaseCredentials.database().ref(`${user}/todo/archived/${id}`).update({
        title: "First Todo",
        date: 'ola',
        time: 'ola',
        archived: true,
        deleted: false,
        favorite: false,
        open: false,
    })
}
async function favoriteTodo(user, id){
    firebaseCredentials.database().ref(`${user}/todo/open/${id}`).remove();
    return await firebaseCredentials.database().ref(`${user}/todo/favorites/${id}`).update({
        title: "First Todo",
        date: 'ola',
        time: 'ola',
        archived: false,
        deleted: false,
        favorite: true,
        open: false,
    })
}

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
    newTodo(info.userId, info.title).then(response => res.send('feito'))
})

app.get('/ola', (req, res, next) => {
    res.json([
        {id : 'ola'}
    ])
})


app.get('/showTodo', (req, res) => {
    const userId = req.query.id;
//    openTodos(userId).then(response => {
  //    res.status(200).json(JSON.stringify(response.body))
    //})
    //openTodos(userId).then(resposta => {res.json(resposta)})
    //res.send(response)
    openTodos(userId).then(response => res.send(JSON.stringify(response)))
})

app.get('/deleteTodo', (req, res)=> {
    deleteTodo(userId, 'jybu2f5h').then(response => res.send('feito'))
})
app.get('/archiveTodo', (req, res)=> {
    archiveTodo(userId, 'jyed73sm').then(response => res.send('feito'))
})
app.post('/favoriteTodo', (req, res) => {
    console.log(req.body)
    console.log(req.body.name)
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
exports.app = functions.https.onRequest(app)
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
