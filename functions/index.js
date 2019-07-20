const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
// const {ReadGroups} = require('./firebase/read')
admin.initializeApp();
const app = express();
//firebase serve --only functions,hosting
const firebase = require('firebase');
const uniqid = require('uniqid')
var firebaseConfig = {
    apiKey: "AIzaSyAoFRwF51VYyXmxE1vbSwdv0IJ4JvNIZCE",
    authDomain: "portfolio-leo.firebaseapp.com",
    databaseURL: "https://portfolio-leo.firebaseio.com",
    projectId: "portfolio-leo",
    storageBucket: "portfolio-leo.appspot.com",
    messagingSenderId: "1043255584057",
    appId: "1:1043255584057:web:33b9216d69c91a8d"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const ARCHIVED = data_base.collection('TODOS').doc('ARCHIVED');
// const DELETED = data_base.collection('TODOS').doc('DELETED');
// const FAVORITES = data_base.collection('TODOS').doc('FAVORITES');
// const NEW = data_base.collection('TODOS').doc('NEW');
// const ALL = data_base.collection('TODOS').doc('ALL');
// let store;
// function ReadGroups(){
//     return ALL.get().then(response => {
//         store = response;
//         return store
//         // let i = 0;
//         // let size = response.data().CURRENT.length
//         // let groupArray = [];
//         // for(i = 0; i < size; i++){
//         //     groupArray = groupArray.concat([response.data().CURRENT[i]])
//         // }
//         // return groupArray
//     })
// }
const userId = "leomozzer"

async function newTodo(user){
    const date = new Date()
    var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    var currentDate = date.getDate() +"/"+ (date.getMonth() + 1) +"/"+ date.getFullYear()
    return await firebase.database().ref(`${user}/todo/open/${uniqid.time()}`).update({
        title: 'First Todo',
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
    return await firebase.database().ref(`${user}/todo/open`).once('value').then(function(data){
        console.log(data.val())
        return data.val()
    })
}

async function deleteTodo(user, id){
    //return await firebase.database().ref(`${user}/todo`)
    firebase.database().ref(`${user}/todo/open/${id}`).remove()
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
app.get('/new', (req, res) => {
    // res.json(ReadGroups().then(res=> console.log(res)))
    // ReadGroups().then(response => res.send(response))
    // return firebase.database().ref('new/teste').set({
    //     name: 'ola'
    // })
    // res.send('store')
    //const newTeste = async () => { await newTodo(userId, idNotes)};
    //newTodo(userId, idNotes)
    console.log(req.body)
    newTodo(userId).then(response => {res.send(response)})
    //res.send('ola')
})

app.get('/open', (req, res) => {
    openTodos(userId).then(response => {res.json(response)})
})

app.get('/delete', (req, res)=> {
    deleteTodo(userId, 'jybu2f5h').then(response => res.send('feito'))
})

app.get('/new-cached', (req, res) => {
    res.set('Cache-Control', 'public', 'max-age=300', 's-maxage=600');
    res.send('OK!')
})


exports.app = functions.https.onRequest(app)
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
