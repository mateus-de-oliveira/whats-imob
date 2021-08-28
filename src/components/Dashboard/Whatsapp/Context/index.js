import React, { useState, useEffect } from 'react'
import firebase from 'firebase/app'
import { database } from '../../../../../config/database/'

export const MyContext = React.createContext()
export const useWhatsappContext = () => React.useContext(MyContext)

export const WhatsappProvider = ({ children }) => {
  const [qrCode, setQrCode] = useState('')
  const [whatsUser, setWhatsUser] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingWhatsappInfo, setIsLoadingWhatsappInfo] = useState(false)

  console.log(whatsUser)

  useEffect(() => {
    let qrRef = database.ref('qr/dataImage')
    let whatsUser = database.ref('whatsapp/users/' + 1)
    let loadingWhatsappInfo = database.ref('whatsapp/qr/loading')

    qrRef.on('value', (snapshot) => {
      const data = snapshot.val()
      setQrCode(data)
    })

    whatsUser.on('value', (snapshot) => {
      const data = snapshot.val()
      setIsLoading(false)
      setWhatsUser(data)
    })

    loadingWhatsappInfo.on('value', (snapshot) => {
      const data = snapshot.val()

      if (data) {
        setIsLoadingWhatsappInfo(data.isLoading)
      }
    })
  }, [])

  return (
    <MyContext.Provider
      value={{
        qrCode,
        whatsUser,
        isLoading,
        setIsLoading,
        isLoadingWhatsappInfo,
      }}
    >
      {children}
    </MyContext.Provider>
  )
}
