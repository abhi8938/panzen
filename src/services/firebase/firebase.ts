
import app from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyAK8WH1DCIs_TEI5tQfU7eUaEu87ULQ4qY",
  authDomain: "panzen-1234.firebaseapp.com",
  databaseURL: "https://panzen-1234.firebaseio.com",
  projectId: "panzen-1234",
  storageBucket: "panzen-1234.appspot.com",
  messagingSenderId: "438339208845",
  appId: "1:438339208845:web:2d70db89f1387f0d8284c4",
  measurementId: "G-X99KHG7TM8"
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
  }
}
export default Firebase;
