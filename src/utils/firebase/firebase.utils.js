import { initializeApp } from 'firebase/app';
import { getAuth,
     signInWithRedirect,
      signInWithPopup,
       GoogleAuthProvider,
        createUserWithEmailAndPassword,
    signInWithEmailAndPassword, 
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch,query, getDocs } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDuTeJ7rPIjhTVbiff-mkhrlD84IT7bAVU",
    authDomain: "clothing-site-db-3caf4.firebaseapp.com",
    projectId: "clothing-site-db-3caf4",
    storageBucket: "clothing-site-db-3caf4.appspot.com",
    messagingSenderId: "660896097369",
    appId: "1:660896097369:web:60a7c261109a0f64373d48"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
      prompt: "select_account"
  });

  export const auth = getAuth();
  export const SignInWithGooglePopup = () => signInWithPopup(auth, googleProvider); 
  export const signInWithGoogleRedirect = () =>signInWithRedirect(auth, googleProvider);

  export const db = getFirestore();

  export const addCollectionsAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);
    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase())
        batch.set(docRef, object);
    });
    await batch.commit();
    console.log('done');
  }

  export const getCategoriesAndDocuments = async () =>{
    const collectionRef=collection(db, 'categories');
    const q=query(collectionRef);
    const quearySnapshot=await getDocs(q);
    const categoryMap=quearySnapshot.docs.reduce((acc, docSnapshot)=>{
      const {title,items}=docSnapshot.data();
      acc[title.toLowerCase()]=items;
      return acc;
    },{})
    return categoryMap;
  }  


  export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {
      if (!userAuth) return;

      const userDocRef = doc(db, 'users', userAuth.uid );
      console.log(userDocRef);

      const userSnapshot = await getDoc(userDocRef);
      console.log(userSnapshot.exists());

      if (!userSnapshot.exists()){
          const { displayName, email } = userAuth;
          const createAt = new Date();
            try{
                await setDoc(userDocRef,{
                    displayName,
                    email,
                    createAt,
                    ...additionalInformation,
                });
            }catch(error){
                console.log("error creating the user: ", error.message);

            }

      }
      return userDocRef;


  };

  export const CreateAuthUserWithEmailAndPassword = async (email, passowrd) =>{
      if (!email || !passowrd) return;

    return await createUserWithEmailAndPassword(auth, email, passowrd);
  };

  export const SignInAuthUserWithEmailAndPassword = async (email, passowrd) =>{
    if (!email || !passowrd) return;

  return await signInWithEmailAndPassword(auth, email, passowrd);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListner = (callback) => onAuthStateChanged(auth, callback);