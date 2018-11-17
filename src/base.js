import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCqFfhEeTSPq0wJTJQjVXPxYKAzHJazjlw",
  authDomain: "react-sea-food-store.firebaseapp.com",
  databaseURL: "https://react-sea-food-store.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

// This is a names export
export { firebaseApp };

// This is a default export
export default base;
