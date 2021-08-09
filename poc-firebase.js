import { db } from '../../../config/database'
import firebase from 'firebase/app'

export default function handler(req, res) {
  if (req.method === 'GET') {
    db.collection('users')
      .get()
      .then((snapshot) => {
        res.status(200).json(
          snapshot.docs.map((doc) => {
            let { created_at, ...data } = doc.data()

            return { id: doc.id, created_at: created_at.toDate(), ...data }
          }),
        )
      })
  }

  if (req.method === 'POST') {
    const { name } = req.body

    db.collection('users')
      .add({
        name,
        created_at: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((docRef) => {
        docRef.get().then((doc) => {
          res.status(200).json({ id: doc.id, ...doc.data() })
        })
      })
      .catch((error) => {
        console.error('Error adding document: ', error)
      })
  }

  if (req.method === 'PUT') {
    const { id, ...data } = req.body
    console.log(data)
    db.collection('users')
      .doc(id)
      .update(data)
      .then(() => {
        console.log('Document successfully updated!')
      })
  }

  if (req.method === 'DELETE') {
    const { id } = req.body

    db.collection('users')
      .doc(id)
      .delete()
      .then(() => {
        console.log('Document successfully deleted!')
      })
      .catch((error) => {
        console.error('Error removing document: ', error)
      })
  }
}
