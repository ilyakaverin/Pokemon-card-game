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
      this.database = this.fire.database();
    }
    getPokemonSoket = (cb) => {
      this.database.ref('pokemons').on('value', (snapshot) => {
        cb(snapshot.val())
      })
    }
    offPokemonSoket = (cb) => {
      this.database.ref('pokemons').off('value', (snapshot) => {
        cb(snapshot.val())
      })
    }
    getPokemonOnce = async () => {
      return await this.database.ref('pokemons').once('value').then(snapshot => snapshot.val());
    }
    postPokemon = (key, pokemon) => {
      this.database.ref(`pokemons/${key}`).set(pokemon);
    }
    addPokemon = (data, cb) => {
    const newKey = this.database.ref().child('pokemons').push().key;
    this.database.ref('pokemons/' + newKey).set(data).then(() => cb);
    }
  }

  const FirebaseClass = new Firebase();

  
export default FirebaseClass;
