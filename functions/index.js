const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
// const {ReadGroups} = require('./firebase/read')
admin.initializeApp();
const app = express();
//firebase serve --only functions,hosting
const firebase = require('firebase');
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

const data_base = firebase.database();
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
function newTodo(userId, idNotes){
    return firebase.database().ref(`${userId}/todo/${idNotes}`).update({
        title: 'First Todo',
        date: Date.now(),
        archived: false,
        deleted: false,
        favorite: false,
        open: true
    })
}

const idNotes = "abcs"
app.get('/new', (req, res) => {
    // res.json(ReadGroups().then(res=> console.log(res)))
    // ReadGroups().then(response => res.send(response))
    // return firebase.database().ref('new/teste').set({
    //     name: 'ola'
    // })
    // res.send('store')
    newTodo(userId, idNotes);
})

app.get('/open', (req, res) => {
    var userId = firebase.auth().currentUser.uid;
    return firebase.database().ref('teste').once('value').then(
        function(snapshot){
            var username = (snapshot.val() && snapshot.val().username || 'Anonymous')
        }
    )
    res.send('open')
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
