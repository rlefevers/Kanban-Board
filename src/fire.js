import firebase from 'firebase';
const config = {
    apiKey: "AIzaSyDjYNqrFUFoqr7FhF6pbQQP9oqWxHfdZ4k",
    authDomain: "kanbanprocrastinationfinal.firebaseapp.com",
    databaseURL: "https://kanbanprocrastinationfinal.firebaseio.com",
    projectId: "kanbanprocrastinationfinal",
    storageBucket: "kanbanprocrastinationfinal.appspot.com",
    messagingSenderId: "551913193639"
};


var fire = firebase.initializeApp(config);


export default fire;
