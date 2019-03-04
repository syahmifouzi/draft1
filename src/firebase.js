// import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

// const settings = {timestampsInSnapshots: true};

// const config = {
//   apiKey: "AIzaSyBUka3hb0uvBl61hRyeKxzTGPKeYRwz2gs",
//     authDomain: "avalon-66691.firebaseapp.com",
//     databaseURL: "https://avalon-66691.firebaseio.com",
//     projectId: "avalon-66691",
//     storageBucket: "avalon-66691.appspot.com",
//     messagingSenderId: "431113418878"
// };
// firebase.initializeApp(config);

// firebase.firestore().settings(settings);

// export default firebase;

const settings = {};

const config = {
  apiKey: "AIzaSyBUka3hb0uvBl61hRyeKxzTGPKeYRwz2gs",
  authDomain: "avalon-66691.firebaseapp.com",
  databaseURL: "https://avalon-66691.firebaseio.com",
  projectId: "avalon-66691",
  storageBucket: "avalon-66691.appspot.com",
  messagingSenderId: "431113418878"
}

let firebaseCache

export const getUiConfig = firebase => ({
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
})

const getFirebase = firebase => {
  if (firebaseCache) {
    return firebaseCache
  }

  firebase.initializeApp(config)
  firebase.firestore().settings(settings);
  firebaseCache = firebase
  return firebase
}

export default getFirebase
