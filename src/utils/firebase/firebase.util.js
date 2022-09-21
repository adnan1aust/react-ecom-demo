// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, 
        signInWithPopup, 
        GoogleAuthProvider, 
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signOut,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeHZxTsHkH1QImmKWNDuevi97pDHM8jXg",
  authDomain: "react-ecom-demo-db-8c36f.firebaseapp.com",
  projectId: "react-ecom-demo-db-8c36f",
  storageBucket: "react-ecom-demo-db-8c36f.appspot.com",
  messagingSenderId: "965078386984",
  appId: "1:965078386984:web:241604e53352e0bca7e81d"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider(firebaseApp);
provider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const singInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();

//Import data from js file to firebase
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd ) => {
	const collectionRef = collection(db, collectionKey);
	const batch = writeBatch(db);

	objectsToAdd.forEach((object) => {
		const docRef = doc(collectionRef, object.title.toLowerCase());
		batch.set(docRef, object);
	});

	await batch.commit();
	console.log('data imported!')
}

//retrive data from firebase categories document
export const getCategoriesAndDocuments = async () => {
	const collectionRef = collection(db, 'categories');
	const q = query(collectionRef);

	const querySnapshot = await getDocs(q);
	const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot)=> {
		const {title, items} = docSnapshot.data();
		acc[title.toLowerCase()] = items;
		return acc;
	},{})
	return categoryMap;
}

//Create new user during authentication
export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
  
    const userSnapshot = await getDoc(userDocRef);
  
    if (!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
  
      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
		  ...additionalInformation
        });
      } catch (error) {
        console.log('error creating the user', error.message);
      }
    }
  
    return userDocRef;
};

//create user with with email and password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if(!email || !password){
		console.log('Émail or password is not defined');
		return;
	}
	return await createUserWithEmailAndPassword(auth, email, password);
}

//Sign in user with email and password
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
	if(!email || !password){
		console.log('Émail or password is not defined');
		return;
	}
	return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () =>  await signOut(auth);