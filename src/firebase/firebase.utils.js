import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyA-rtm3WH80Vtf4vX1-ZLcttJIZAAqWFQo",
    authDomain: "crwn-db-82b2c.firebaseapp.com",
    databaseURL: "https://crwn-db-82b2c.firebaseio.com",
    projectId: "crwn-db-82b2c",
    storageBucket: "crwn-db-82b2c.appspot.com",
    messagingSenderId: "835634229978",
    appId: "1:835634229978:web:51eb3891e727e856cdabe3",
    measurementId: "G-VTQ0MZCZML"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return; 
    
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if(!snapShot.exists) {
      const {displayName, email} = userAuth;
      const createdAt =  new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })

      }catch(error) {
        console.log('Error creating user:' , error.message)
      }

    }
    return userRef
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth()
  export const firestore = firebase.firestore()

  const provider = new firebase.auth.GoogleAuthProvider()
  provider.setCustomParameters({prompt: 'select_account'})
  export const signInWithGoogle = () => auth.signInWithPopup(provider);


  export default firebase; 