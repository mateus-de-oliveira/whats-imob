import axios from 'axios'

const propertiesApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/properties`,
})

export default propertiesApi
