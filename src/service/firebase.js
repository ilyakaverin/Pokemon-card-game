import firebase from 'firebase/compat/app';
import "firebase/compat/database"

const firebaseConfig = {
    apiKey: "AIzaSyCvP_1qO7amCQplRNx1M2kgZPk37Wo99LA",
    authDomain: "pokemon-game-ca189.firebaseapp.com",
    databaseURL: "https://pokemon-game-ca189-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "pokemon-game-ca189",
    storageBucket: "pokemon-game-ca189.appspot.com",
    messagingSenderId: "455420233317",
    appId: "1:455420233317:web:67ff08f0c41d4f8e35a88c"
  };
  firebase.initializeApp(firebaseConfig);

  class Firebase {
    constructor() {
      this.fire = firebase;
      this.database = this.fire.database()
    }
  }

  export const fire = firebase;

export const database = fire.database();

export default database;
