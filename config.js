import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyDkwEo4DPEx0bLQhLX169MQoZYx36oGQSQ",
  authDomain: "barter-system-645e5.firebaseapp.com",
  databaseURL: "https://barter-system-645e5.firebaseio.com",
  projectId: "barter-system-645e5",
  storageBucket: "barter-system-645e5.appspot.com",
  messagingSenderId: "661360705604",
  appId: "1:661360705604:web:f29b08f11e9b10b4563c11"
};
  // Initialize Firebase

  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();
