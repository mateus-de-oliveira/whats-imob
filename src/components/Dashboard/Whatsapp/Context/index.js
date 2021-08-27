import React, { useState, useEffect } from 'react'
import firebase from 'firebase/app'
import { database } from '../../../../../config/database/'

export const MyContext = React.createContext()
export const useWhatsappContext = () => React.useContext(MyContext)

export const WhatsappProvider = ({ children }) => {
  const [qrCode, setQrCode] = useState('')

  useEffect(() => {
    let qrRef = database.ref('qr/dataImage')

    qrRef.on('value', (snapshot) => {
      const data = snapshot.val()
      setQrCode(data)
    })
  }, [])

  return (
    <MyContext.Provider
      value={{
        qrCode,
      }}
    >
      {children}
    </MyContext.Provider>
  )
}
