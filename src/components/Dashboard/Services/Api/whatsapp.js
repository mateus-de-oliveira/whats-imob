import axios from 'axios'

const whatsappApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/whatsapp`,
})

export default whatsappApi
