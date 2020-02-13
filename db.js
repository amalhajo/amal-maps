import firebase from "@firebase/app";
import "@firebase/firestore";

// Initialize Cloud Firestore through Firebase/ we got these from project setting in firebase
firebase.initializeApp({
  apiKey: "AIzaSyDGgtzrlim1Kl2yE_jHGnQLRBNebJ_Iof4",
    authDomain: "messages-851c3.firebaseapp.com",
    databaseURL: "https://messages-851c3.firebaseio.com",
    projectId: "messages-851c3",
    storageBucket: "messages-851c3.appspot.com",
    messagingSenderId: "1005906669400",
    appId: "1:1005906669400:web:10adb8c8c839cc104f3f2d",
    measurementId: "G-P04SXFMXD5"
});

export default firebase.firestore()




// apiKey: "AIzaSyCnyOweG7PDs84kiBpM1u5IgjWpuoxd8DA",
//     authDomain: "newproject-8730b.firebaseapp.com",
//     databaseURL: "https://newproject-8730b.firebaseio.com",
//     projectId: "newproject-8730b",
//     storageBucket: "newproject-8730b.appspot.com",
//     messagingSenderId: "831302545119",
//     appId: "1:831302545119:web:1899e5d665fec8ffa9c36a",
//     measurementId: "G-TSHL67F7PP"