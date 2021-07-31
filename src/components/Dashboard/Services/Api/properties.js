import axios from 'axios'

const propertiesApi = axios.create({
  baseURL: `${process.env.API_URL}/api/properties`,
})

export default propertiesApi
