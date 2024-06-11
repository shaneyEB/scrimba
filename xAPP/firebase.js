import firebase from 'firebase/compat/app';
import "firebase/compat/database"

var $firebaseConfig = {
    apiKey: "AIzaSyCZ4NaisepM2zYkkQhj-V5D2_TcIFwlfvU",
    authDomain: "recipez-eeb23.firebaseapp.com",
    databaseURL: "https://recipez-eeb23-default-rtdb.firebaseio.com",
    projectId: "recipez-eeb23",
    storageBucket: "recipez-eeb23.appspot.com",
    messagingSenderId: "837388285559",
    appId: "1:837388285559:web:e20ec2b1f1bdeb082db872"
};

firebase.initializeApp($firebaseConfig)

const databaseRef = firebase.database().ref()
export const recipezRefrecipezRef = databaseRef.child("stitchez")

export default firebase