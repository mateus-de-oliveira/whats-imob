import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
  apiKey: 'AIzaSyBS_NTs-E6AO_GMSKdr9SOEzQuBn9xWE0Y',
  authDomain: 'whats-imob.firebaseapp.com',
  projectId: 'whats-imob',
  storageBucket: 'whats-imob.appspot.com',
  messagingSenderId: '855126635028',
  appId: '1:855126635028:web:c442074a86b38d0a43ed01',
  measurementId: 'G-EJH3XFJNNE',
}

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

export const db = firebase.firestore()
