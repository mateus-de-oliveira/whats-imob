import axios from 'axios'

const propertiesApi = axios.create({
  baseURL: 'http://localhost:3000/api/properties',
})

export default propertiesApi
