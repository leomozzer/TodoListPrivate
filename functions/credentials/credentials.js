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
const firebaseCredentials = firebase.initializeApp(firebaseConfig);

module.exports = { firebaseCredentials }