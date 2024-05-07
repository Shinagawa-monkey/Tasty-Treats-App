import { initializeApp } from 'firebase/app'
import { getFirestore, Timestamp } from 'firebase/firestore'
import { getAuth, fetchSignInMethodsForEmail } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyAmk2fY8Th-MVnH0DVlj7RSlrX_fxUzPao',
  authDomain: 'tasty-treats-site.firebaseapp.com',
  projectId: 'tasty-treats-site',
  storageBucket: 'tasty-treats-site.appspot.com',
  messagingSenderId: '983341025423',
  appId: '1:983341025423:web:e08a284754a288dc8f48fa',
}

// initialize Firebase
const app = initializeApp(firebaseConfig)

// initialize Firestore services
const db = getFirestore(app)

// initialize Firebase Auth
const auth = getAuth(app)

const checkEmailAvailability = async (email) => {
  try {
    const userCredential = await fetchSignInMethodsForEmail(auth, email)
    // If length > 0, email is taken
    return userCredential.length > 0
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Error checking email availability:', error)
    }

    return false
  }
}

// initialize Cloud Storage and get a reference to the service
const storage = getStorage(app)

// get server timestamp
const timestamp = Timestamp

export { app, db, auth, storage, timestamp, checkEmailAvailability }
