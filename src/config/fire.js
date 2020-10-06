import firebase from 'firebase'

let firebaseConfig = {
  apiKey: "AIzaSyASW8E_1llzmlj1rS6cDsbkpBLgim7Zw20",
  authDomain: "chat-app-4f9f4.firebaseapp.com",
  databaseURL: "https://chat-app-4f9f4.firebaseio.com",
  projectId: "chat-app-4f9f4",
  storageBucket: "chat-app-4f9f4.appspot.com",
  messagingSenderId: "1035654927646",
  appId: "1:1035654927646:web:6e08e1c9e37823f07c250f"
};

  // Initialize Firebase
  const fire =firebase.initializeApp(firebaseConfig);

 export default fire