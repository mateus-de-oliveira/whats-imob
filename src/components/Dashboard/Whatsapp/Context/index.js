import React, { useState, useEffect } from 'react'

export const MyContext = React.createContext()
export const useWhatsappContext = () => React.useContext(MyContext)

export const WhatsappProvider = ({ children }) => {
  const [qrCode, setQrCode] = useState('')

  useEffect(() => {}, [])

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
